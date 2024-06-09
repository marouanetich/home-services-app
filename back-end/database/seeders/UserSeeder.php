<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'username' => 'marouanetich',
            'email' => 'marouanetich@gmail.com',
            'password' => Hash::make('marouanetich'),
            'phone_number' => '0612345678',
            'address' => 'Khouribga',
            'role' => 'Service Provider',
            'image' => 'images/1717865036.png',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('users')->insert([
            'username' => 'aboukartich',
            'email' => 'aboukartich@gmail.com',
            'password' => Hash::make('aboukartich'),
            'phone_number' => '0698765432',
            'address' => 'Khouribga',
            'role' => 'Service Provider',
            'image' => 'images/1717862035.png',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
