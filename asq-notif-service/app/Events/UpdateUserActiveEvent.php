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

class UpdateUserActiveEvent implements ShouldBroadcast, ShouldQueue
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
                "update-user-active-{$this->params['company_id']}:{$this->params['department_id']}"
            ))
            ->releaseAfter(1)
            ->expireAfter(10)
        ];
    }

    public function broadcastOn(): Channel
    {
        return new Channel("update.user.active.department.{$this->params['department_id']}.company.{$this->params['company_id']}");
    }

    public function broadcastAs () : string
    {
        return 'user.active-event';
    }

    public function broadcastWith () : array 
    {
        return [
            'data' => $this->params
        ];
    }

    public function failed(\Throwable $exception): void
    {
        \Log::error('UpdateQueueNumber failed', [
            'params' => $this->params,
            'error' => $exception->getMessage(),
            'trace' => $exception->getTraceAsString(),
        ]);
    }
}
