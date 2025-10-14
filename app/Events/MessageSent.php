<?php

namespace App\Events;

use App\Models\ChatMessage;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(public ChatMessage $message, public $messages)
    {
        //
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel("App.Models.User.{$this->message->receiver->id}"),
            new PrivateChannel("App.Models.User.{$this->message->sender->id}"),
        ];
    }

    public function broadcastAs(): string
    {
        return 'MessageSent';
    }

    public function broadcastWith(): array
    {
        return [
            'sender_id' => $this->message->sender->id,
            'receiver' => [
                'id' => $this->message->id,
                'sender' => $this->message->sender->name,
                'content' => $this->message->message,
                'timestamp' => $this->message->created_at->format('h:i A'),
                'avatar' => '/default.jpg',
                'initials' => collect(explode(' ', $this->message->sender->name))
                ->map(fn($part) => strtoupper(substr($part, 0, 1)))
                ->join(''),
                'isOwn' => false,
            ],
            'sender' => [
                'id' => $this->message->id,
                'sender' => 'You',
                'content' => $this->message->message,
                'timestamp' => $this->message->created_at->format('h:i A'),
                'isOwn' => true,
            ]
    ];
    }
}
