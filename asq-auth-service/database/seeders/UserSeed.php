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
            'firstname' => 'Registrar',
            'lastname' => 'Window 1',
            'password' => 'registrar1',
            'email' => 'registrar1@jblfmu.edu.ph',
            'username' => 'registrar1',
            'designation' => 'clerk',
            'title' => 'registrar officer',
            'company_id' => 1,
            'department_id' => 1
        ],
        [
            'firstname' => 'Registrar',
            'lastname' => 'Window 2',
            'password' => 'registrar2',
            'email' => 'registrar2@jblfmu.edu.ph',
            'username' => 'registrar2',
            'designation' => 'clerk',
            'title' => 'registrar officer',
            'company_id' => 1,
            'department_id' => 1
        ],
        [
            'firstname' => 'Registrar',
            'lastname' => 'Window 3',
            'password' => 'registrar3',
            'email' => 'registrar3@jblfmu.edu.ph',
            'username' => 'registrar3',
            'designation' => 'clerk',
            'title' => 'registrar officer',
            'company_id' => 1,
            'department_id' => 1
        ],
        [
            'firstname' => 'Registrar',
            'lastname' => 'Department Head',
            'password' => 'registrardepthead',
            'email' => 'registrar3@jblfmu.edu.ph',
            'username' => 'registrar3',
            'designation' => 'dept_head',
            'title' => 'Department Head',
            'company_id' => 1,
            'department_id' => 1
        ],


        [
            'firstname' => 'Deans',
            'lastname' => 'Clerk 1',
            'password' => 'deans1',
            'email' => 'deans1@jblfmu.edu.ph',
            'username' => 'deans1',
            'designation' => 'clerk',
            'title' => 'deans office clerk',
            'company_id' => 1,
            'department_id' => 2
        ],
        [
            'firstname' => 'Deans',
            'lastname' => 'Clerk 2',
            'password' => 'deans2',
            'email' => 'deans2@jblfmu.edu.ph',
            'username' => 'deans2',
            'designation' => 'clerk',
            'title' => 'deans office clerk',
            'company_id' => 1,
            'department_id' => 2
        ],
        [
            'firstname' => 'Deans',
            'lastname' => 'Clerk 3',
            'password' => 'deans1',
            'email' => 'deans1@jblfmu.edu.ph',
            'username' => 'deans1',
            'designation' => 'clerk',
            'title' => 'deans office clerk',
            'company_id' => 1,
            'department_id' => 2
        ],
        [
            'firstname' => 'Deans',
            'lastname' => 'Head',
            'password' => 'deanshead',
            'email' => 'deanshead@jblfmu.edu.ph',
            'username' => 'deans',
            'designation' => 'dept_head',
            'title' => 'Department Head',
            'company_id' => 1,
            'department_id' => 2
        ],


        [
            'firstname' => 'Accounting',
            'lastname' => 'Clerk 1',
            'password' => 'accounting1',
            'email' => 'accounting1@jblfmu.edu.ph',
            'username' => 'accounting1',
            'designation' => 'clerk',
            'title' => 'accounting clerk',
            'company_id' => 1,
            'department_id' => 3
        ],
        [
            'firstname' => 'Accounting',
            'lastname' => 'Clerk 2',
            'password' => 'accounting1',
            'email' => 'accounting1@jblfmu.edu.ph',
            'username' => 'accounting1',
            'designation' => 'clerk',
            'title' => 'accounting clerk',
            'company_id' => 1,
            'department_id' => 3
        ],
         [
            'firstname' => 'Accounting',
            'lastname' => 'Clerk 3',
            'password' => 'accounting3',
            'email' => 'accounting3@jblfmu.edu.ph',
            'username' => 'accounting3',
            'designation' => 'clerk',
            'title' => 'accounting clerk',
            'company_id' => 1,
            'department_id' => 3
        ],
        [
            'firstname' => 'Accounting',
            'lastname' => 'Head',
            'password' => 'accountinghead',
            'email' => 'accountinghead@jblfmu.edu.ph',
            'username' => 'accountinghead',
            'designation' => 'dept_head',
            'title' => 'Department Head',
            'company_id' => 1,
            'department_id' => 3
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
