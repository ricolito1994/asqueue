<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    const USER_DATA = [
        [
            'firstname' => 'Kevin',
            'lastname' => 'Valdez',
            'password' => 'kevinvaldez01',
            'email' => 'kevinvaldez@gmail.com',
            'username' => 'kevinvaldez',
            'designation' => 'clerk',
            'title' => 'doctor',
            'company_id' => 1,
            'department_id' => 1
        ],
        [
            'firstname' => 'Doctor',
            'lastname' => 'Bimbao',
            'password' => 'bimbao01',
            'email' => 'bimbao01@gmail.com',
            'username' => 'bimbao01',
            'designation' => 'clerk',
            'title' => 'doctor',
            'company_id' => 1,
            'department_id' => 1
        ],
        [
            'firstname' => 'Doctor',
            'lastname' => 'Abelarde',
            'password' => 'abelarde01',
            'email' => 'abelarde01@gmail.com',
            'username' => 'abelarde01',
            'designation' => 'clerk',
            'title' => 'doctor',
            'company_id' => 1,
            'department_id' => 1
        ],
        [ //4
            'firstname' => 'Registrar',
            'lastname' => 'Window 1',
            'password' => 'registrar1',
            'email' => 'registrar1@jblfmu.edu.ph',
            'username' => 'registrar1',
            'designation' => 'clerk',
            'title' => 'registrar officer',
            'company_id' => 2,
            'department_id' => 2
        ],
        [ //5
            'firstname' => 'Registrar',
            'lastname' => 'Window 2',
            'password' => 'registrar2',
            'email' => 'registrar2@jblfmu.edu.ph',
            'username' => 'registrar2',
            'designation' => 'registrar officer',
            'title' => 'doctor',
            'company_id' => 2,
            'department_id' => 2
        ],
        [ //6
            'firstname' => 'Registrar',
            'lastname' => 'Window 3',
            'password' => 'registrar3',
            'email' => 'registrar3@jblfmu.edu.ph',
            'username' => 'registrar3',
            'designation' => 'clerk',
            'title' => 'registrar officer',
            'company_id' => 2,
            'department_id' => 2
        ],
        [ //7
            'firstname' => 'Registrar',
            'lastname' => 'Department Head',
            'password' => 'registrardepthead',
            'email' => 'registrar3@jblfmu.edu.ph',
            'username' => 'registrar3',
            'designation' => 'dept_head',
            'title' => 'Department Head',
            'company_id' => 2,
            'department_id' => 2
        ],


    ];


    public function run(): void
    {
        //
        foreach (self::USER_DATA as $user):
            if (isset ($user['password']))
                $user['password'] = Hash::make($user['password']);
            User::firstOrCreate(
                ['email' => $user['email']],
                $user
            );
        endforeach;
    }
}
