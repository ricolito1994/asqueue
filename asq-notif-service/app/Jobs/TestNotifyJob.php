<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue; // <- important
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Events\EventClient; // your event
use Illuminate\Support\Facades\Log;

class TestNotifyJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected string $message;
    /**
     * Create a new job instance.
     */
    public function __construct(string $message)
    {
        //
        $this->message = $message;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Log::info('TestNotifyJob message: ' . $this->message);
    }
}
