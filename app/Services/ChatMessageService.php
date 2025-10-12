<?php

namespace App\Services;

use App\Models\ChatMessage;
use App\Models\User;

class ChatMessageService
{
    public function get_users(): array
    {
        $users = User::all();

        // Transform each user into the desired structure
        return $users->map(function ($user) {
            // Generate initials from the name (e.g. "Alice Johnson" → "AJ")
            $initials = collect(explode(' ', $user->name))
                ->map(fn($part) => strtoupper(substr($part, 0, 1)))
                ->join('');

            return [
                'id' => $user->id,
                'name' => $user->name,
                'avatar' => '/default.jpg',
                'initials' => $initials,
                // Optionally, mark the first one as active
                'active' => $user->id === 1,
            ];
        })->toArray();
    }

    public function store_message($content,$receiver_id,$sender_id,$conversation_id) {
        $chat = new ChatMessage;
        // dd($content,$receiver_id,$sender_id,$conversation_id);
        $enc_id = hash('sha256', $conversation_id);
        $chat->sender_id = $sender_id;
        $chat->receiver_id = $receiver_id;
        $chat->message = $content;
        $chat->conversation_id = $enc_id;
        // dd($enc_id);
        $chat->save();
        // dd($chat);
        return $chat;
    }

    public function get_messages($conversation_id)
    {
        $currentUserId = auth()->user()->id;

        $messages = ChatMessage::with(['sender', 'receiver'])
            ->where('conversation_id', hash('sha256', $conversation_id))
            ->orderBy('created_at', 'asc')
            ->get();

        // dd($messages);
        return $messages->map(function ($message) use ($currentUserId) {
            $isOwn = $message->sender_id === $currentUserId;
            // dd($currentUserId);

            if ($isOwn) {
                return [
                    'id' => $message->id,
                    'sender' => 'You',
                    'content' => $message->message,
                    'timestamp' => $message->created_at->format('h:i A'),
                    'isOwn' => true,
                ];
            }

            $name = $message->sender->name ?? 'Unknown';
            $initials = collect(explode(' ', $name))
                ->map(fn($part) => strtoupper(substr($part, 0, 1)))
                ->join('');

            return [
                'id' => $message->id,
                'sender' => $name,
                'content' => $message->message,
                'timestamp' => $message->created_at->format('h:i A'),
                'avatar' => '/default.jpg',
                'initials' => $initials,
                'isOwn' => false,
            ];
        });
    }


}
