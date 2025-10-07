<?php

namespace App\Services;

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
}
