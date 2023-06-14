<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $email = "admin@email.com";
        $user = User::where('email', $email)->first();
        if (!$user) {
            $user = new User();
        }
        $user->name = "Admin";
        $user->email = $email;
        $user->password = Hash::make("admin");
        $user->email_verified_at = Carbon::now();
        $user->save();
    }
}
