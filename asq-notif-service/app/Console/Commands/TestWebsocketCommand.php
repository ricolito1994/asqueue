<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Events\EventClient;
use App\Events\UpdateQueueNumberEvent;
use App\Jobs\TestNotifyJob;


class TestWebsocketCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'asq:test-websocket';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
        try {
            broadcast(new EventClient(params: [
                'test' => 'test you',
                'dept' => 1
            ]));
            /*event (new UpdateQueueNumberEvent (params: [
                'dept' => 1
            ]));*/
            //TestNotifyJob::dispatch('testing 123')->onQueue('asq-notif-service-high');
            //$this->info('broadcast sent via job');
        } catch (\Exception $e) {
            dd ($e);
        }
    }
}
