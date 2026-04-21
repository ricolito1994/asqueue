<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class RecallQueueNumberEvent implements ShouldBroadcast
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

    public function broadcastOn(): Channel
    {
        return new Channel("window.update.department.{$this->params['department_id']}.company.{$this->params['company_id']}");
    }

    public function broadcastAs () : string
    {
        return 'window.recall-queue-number';
    }

    public function broadcastWith () : array 
    {
        return [
            'message' => "Customer number {$this->params['queue_number']} please proceed to {$this->params['window']['name']}",
            'data' => $this->params
        ];
    }
}
