<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'Alice Johnson',
                'email' => 'alice@example.com',
                'phone_number' => '081234567890',
                'profile_url' => 'https://example.com/profiles/alice.jpg',
                'password' => Hash::make('password123'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Bob Smith',
                'email' => 'bob@example.com',
                'phone_number' => '089876543210',
                'profile_url' => 'https://example.com/profiles/bob.jpg',
                'password' => Hash::make('securepass'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
