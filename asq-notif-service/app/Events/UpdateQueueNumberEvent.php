<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UpdateQueueNumberEvent implements ShouldBroadcast
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
        return 'window.update-queue-number';
    }

    public function broadcastWith () : array 
    {
        $clientNumber = $this->params['queue_number'];
        $window = $this->params['window']['name'];

        return [
            'message' => "Customer number {$clientNumber} please proceed to {$window}",
            'data' => $this->params
        ];
    }
}
