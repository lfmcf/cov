<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use App\Message;
use App\Conversation;
use App\ConversationReply;

class SendMessage implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets;

    public $conversationrep;
    public $conversation;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(ConversationReply $conversationrep,Conversation $conversation )
    {
        $this->conversationrep = $conversationrep;
        $this->conversation = $conversation;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('chat');

        // if($this->conversationrep->user_id === $this->conversation->user_one) {
        //     return new PrivateChannel('to.' . $this->conversation->user_two);
        // }
        // else {
        //     return new PrivateChannel('to.' . $this->conversation->user_one);
        // }
        
    }

    public function ShouldBroadcast()
    {
        return [ 'conversation' => $this->conversation ];
    }
}
