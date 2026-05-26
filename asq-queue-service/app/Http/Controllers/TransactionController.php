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
                'window_id',
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
                ->paginate($request->input('per_page', 10));
                
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

    public function create(Request $request): JsonResponse
    {
        try {
            $only = $request->only([
                'concern_id',
                'company_id', 
                'window_id', 
                'department_id',
                'is_priority',
                'processed_by'
            ]);

            $queueTransaction = DB::transaction(function () use ($only, $request) {

                $latestTransaction = Transaction::filterByIds($only)
                    ->whereDate ('created_at', Carbon::today())
                    ->orderByDesc('queue_number')
                    ->lockForUpdate()
                    ->first();
                
                $queueNumber = ($latestTransaction?->queue_number ?? 0) + 1;
                
                $insertData = [
                    'description' => 'Queue log',
                    'status' => 'queue',
                    'queue_number' => $queueNumber,
                    'created_by' => 0,
                    'queue_session_id' => 0,
                    'pre_process_log' => 'Queued successfully',
                ];

                $this->notifService->updateQueList($request, $only['window_id'], $only['company_id']);

                return Transaction::create(array_merge($insertData, $only));
            });

            return response()->json($queueTransaction, 200);

        } catch (\Exception $e) {
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
        try {
            $payload = $request->only([
                'company_id',
                'department_id'
            ]);

            $now = Carbon::today();

            $currentQueue = Transaction::query()
                ->filterByIds($payload)
                ->whereDate('created_at', $now)
                ->where('process_end_at', null)
                ->window($request->input('window_id'))
                ->where('status', 'processed')
                ->lockForUpdate()
                ->orderBy('queue_number', 'asc')
                ->first();
            
            if ($currentQueue) {
                $currentQueue->update([
                    'process_end_at' => $now,
                ]);
            }

            $processed = DB::transaction (function () use ($payload, $request, $now) {

                $nextQueue = Transaction::query()
                    ->filterByIds($payload)
                    ->whereDate('created_at', $now)
                    ->isPriority($request->boolean('is_priority'))
                    ->window($request->input('window_id'))
                    ->where('status', 'queue')
                    ->with(['window', 'concern'])
                    ->lockForUpdate()
                    ->orderBy('queue_number')
                    ->first();

                if (! $nextQueue) {
                    throw new \Exception('There are no queue transactions to process.');
                }
                
                $nextQueue->update([
                    'status' => 'processed',
                    'process_start_at' => Carbon::today()
                ]);

                $request->merge([
                    'queue_number' => $nextQueue->queue_number,
                    'window'       => $nextQueue->window?->toArray(),
                    'concern'      => $nextQueue->concern?->toArray()
                ]);
                
                $this->notifService->updateQueueListV2($request, $nextQueue->window_id, $nextQueue->company_id);

                return $nextQueue->fresh([
                    'window', 
                    'concern'
                ]);
            });

            return response()->json($processed, 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong.',
                'reason'  => $e->getMessage()
            ],500);
        }
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
                ->whereDate ('created_at', Carbon::today())
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
