<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\QueueSession;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use App\Http\Services\NotifService;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function __construct (
        protected readonly NotifService $notifService
    ) {
    }

    public function index(Request $request): JsonResponse
    {
        try {
            
            $only = $request->only([
                'company_id', 
                'department_id', 
                'window_id'
            ]);

            $createdDates = $request->only([
                'from_date',
                'to_date'
            ]);

            $isPriority = $request->input('is_priority') ? $request->boolean('is_priority') : null;
            
            $transactions = Transaction::filterByIds($only)
                ->window($request->input('window_id'))
                ->isPriority($isPriority)
                ->createdDate($request->input('created_at'))
                ->isDone($request->input('is_done'))
                //->where('status', 'queue')
                ->status($request->input('status'), $request->input('is_done'))
                ->dateBetweenCreated($createdDates)
                ->with('concern')
                ->orderBy('process_end_at', 'ASC')
                ->paginate(10);
                
            return response()->json ($transactions, 200);
        } catch (\Exception $e) {
            \DB::rollback();
            return response()
                ->json ([
                    'success' => false,
                    'message' => 'Something went wrong',
                    'reason'  => $e->getMessage()
                ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): JsonResponse
    {
        //
        try {
            \DB::beginTransaction();

            $only = $request->only([
                'concern_id',
                'company_id', 
                'window_id', 
                'department_id',
                'is_priority',
                'processed_by'
            ]);

            $latestTransaction = Transaction::filterByIds($only)
                ->lockForUpdate()
                ->whereDate ('created_at', Carbon::now())
                //->latest()
                ->orderBy('queue_number', 'DESC')
                ->first();
            
            $queueNumber = $latestTransaction ? $latestTransaction->queue_number + 1 : 1;
            
            $insertData = [
                'description' => 'Queue log',
                'status' => 'queue',
                'queue_number' => $queueNumber,
                'created_by' => 0,
                'queue_session_id' => 0,
                'pre_process_log' => 'Queued successfully',
                #'process_start_at' => Carbon::now()
            ];

            $qt = Transaction::create(array_merge($insertData, $only));

            \DB::commit();

            return response ()
                -> json ($qt, 200);

        } catch (\Exception $e) {
            \DB::rollback();
            return response()
                ->json ([
                    'success' => false,
                    'message' => 'Something went wrong',
                    'reason'  => $e->getMessage()
                ], 500);
        }
    }

    public function processQueueNumber (Request $request): JsonResponse
    {
        return DB::transaction (function () use ($request) {
            try {
                $only = $request->only([
                    'company_id', 
                    'department_id',
                ]);

                $latestTransaction = Transaction::filterByIds($only)
                    ->lockForUpdate()
                    ->whereDate ('created_at', Carbon::now())
                    ->isPriority($request->boolean('is_priority'))
                    ->window($request->input('window_id'))
                    ->with('window')
                    ->with('concern')
                    ->where('status', 'queue')
                    ->orderBy('queue_number', 'ASC')
                    ->first();

                $transactionBefore = Transaction::filterByIds($only)
                    ->lockForUpdate()
                    ->whereDate ('created_at', Carbon::now())
                    ->window($request->input('window_id'))
                    ->where('status', 'processed')
                    ->orderBy('process_start_at', 'desc')
                    //->orderBy('queue_number', 'desc')
                    ->first();

                if ($transactionBefore) {
                    $transactionBefore->update([
                        'process_end_at' => Carbon::now()
                    ]);
                }

                if ($latestTransaction) {
                    $latestTransaction->update([
                        'status' => 'processed',
                        'process_start_at' => Carbon::now()
                    ]);
                    
                    $request->merge([
                        'queue_number' => $latestTransaction->queue_number,
                        'window' => $latestTransaction->window?->toArray(),
                        'concern' => $latestTransaction->concern?->toArray()
                    ]);

                    $this->notifService->processNextQueueNumber($request);
                } else {
                    return response () -> json ([
                        'success' => false,
                        'message' => 'Queue Transaction',
                        'reason' => 'There are no queue transactions to process.'
                    ], 422);
                }

                return response()
                    -> json ($latestTransaction, 200);
            } catch (\Exception $e) {
                return response() 
                    ->json ([
                        'success' => false,
                        'message' => 'Something went wrong.',
                        'reason' => $e->getMessage()
                    ], 500);
            }
        });
    }

    public function recallQueueNumber (Request $request, int $queueNumber): JsonResponse
    {
        try {
            $only = $request->only([
                'company_id', 
                'window_id', 
                'department_id',
            ]);
            $transaction = Transaction::filterByIds($only)
                ->whereDate ('created_at', Carbon::now())
                ->where ('queue_number', $queueNumber)
                ->with('window')
                ->first();

            if ($transaction) {
                $request->merge([
                    'window' => $transaction->window?->toArray(),
                    'queue_number' => $queueNumber
                ]);
            }
            $this->notifService->recallQueueNumber($request, $queueNumber);
            
            return response() 
                ->json ([
                    'success' => true,
                    'message' => 'Ok.',
                    'reason' => 'Recalled successfully.'
                ], 200);
        } catch (\Exception $e) {
            return response() 
                ->json ([
                    'success' => false,
                    'message' => 'Something went wrong.',
                    'reason' => $e->getMessage()
                ], 500);
        }
    }

    public function update(Request $request, Transaction $transaction): JsonResponse 
    {
        return null;
    }
}
