<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class EventClient implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $queue = 'asq-notif-service-high';

    public function __construct(
        protected array $params
    ) 
    {
    }

    public function broadcastOn(): Channel
    {
        return new Channel('event-channel.'.$this->params['dept']); // public channel
    }

    public function broadcastAs(): string
    {
        return 'channel.event';
    }

    public function broadcastWith()
    {
        return [
            'message' => 'this works',
            'test' => $this->params
        ];
    }
}