<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\Middleware\WithoutOverlapping;

class UpdateQueueListEvent implements ShouldBroadcast, ShouldQueue
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $queue = 'asq-notif-service-high';

    /**
     * Create a new event instance.
     */
    public function __construct(
        protected array $params
    )
    {
    }

    public function middleware(): array 
    {
        return [
            (new WithoutOverlapping(
                "update-queue-list-lock-{$this->params['company_id']}:{$this->params['department_id']}"
            ))
            ->releaseAfter(1)
            ->expireAfter(10)
        ];
    }

    public function broadcastOn(): array
    {
        return [
            new Channel("window.update.department.{$this->params['department_id']}.company.{$this->params['company_id']}"),
            new Channel("dashboard.update.department.{$this->params['department_id']}.company.{$this->params['company_id']}"),
        ];
    }

    /*public function broadcastAs () : string
    {
        return 'window.update-queue-list';
    }*/

    public function broadcastWith () : array 
    {
        return [
            'message' => "Sent update queue list event for department {$this->params['department_id']} and company {$this->params['company_id']}",
            'data' => $this->params
        ];
    }

    public function failed(\Throwable $exception): void
    {
        \Log::error('UpdateQueueList failed', [
            'params' => $this->params,
            'error' => $exception->getMessage(),
            'trace' => $exception->getTraceAsString(),
        ]);
    }
}
