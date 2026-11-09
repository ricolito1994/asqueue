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
            'email' => 'registrarhead@jblfmu.edu.ph',
            'username' => 'registrarhead',
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
            'password' => 'deans3',
            'email' => 'deans3@jblfmu.edu.ph',
            'username' => 'deans3',
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
            'password' => 'accounting2',
            'email' => 'accounting2@jblfmu.edu.ph',
            'username' => 'accounting2',
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

        [
            'firstname' => 'Guidance',
            'lastname' => 'Guidance Clerk 1',
            'password' => 'guidance1',
            'email' => 'guidance1@jblfmu.edu.ph',
            'username' => 'guidance1',
            'designation' => 'clerk',
            'title' => 'guidance clerk',
            'company_id' => 1,
            'department_id' => 4
        ],
        [
            'firstname' => 'Guidance',
            'lastname' => 'Guidance Clerk 2',
            'password' => 'guidance2',
            'email' => 'guidance1@jblfmu.edu.ph',
            'username' => 'guidance2',
            'designation' => 'clerk',
            'title' => 'guidance clerk',
            'company_id' => 1,
            'department_id' => 4
        ],
        [
            'firstname' => 'Guidance',
            'lastname' => 'Head',
            'password' => 'guidancehead',
            'email' => 'guidancehead@jblfmu.edu.ph',
            'username' => 'guidancehead',
            'designation' => 'dept_head',
            'title' => 'Department Head',
            'company_id' => 1,
            'department_id' => 4
        ],

        [
            'firstname' => 'Clinic',
            'lastname' => 'Clinic 1',
            'password' => 'clinic1',
            'email' => 'clinic1@jblfmu.edu.ph',
            'username' => 'clinic1',
            'designation' => 'clerk',
            'title' => 'clinic clerk',
            'company_id' => 1,
            'department_id' => 5
        ],
        [
            'firstname' => 'Clinic',
            'lastname' => 'Clinic 2',
            'password' => 'clinic1',
            'email' => 'clinic2@jblfmu.edu.ph',
            'username' => 'clinic2',
            'designation' => 'clerk',
            'title' => 'clinic clerk',
            'company_id' => 1,
            'department_id' => 5
        ],
        [
            'firstname' => 'Clinic',
            'lastname' => 'Head',
            'password' => 'clinichead',
            'email' => 'clinichead@jblfmu.edu.ph',
            'username' => 'clinichead',
            'designation' => 'dept_head',
            'title' => 'Department Head',
            'company_id' => 1,
            'department_id' => 5
        ],

        [
            'firstname' => 'NROTC',
            'lastname' => 'NROTC 1',
            'password' => 'nrotc1',
            'email' => 'nrotc1@jblfmu.edu.ph',
            'username' => 'nrotc1',
            'designation' => 'clerk',
            'title' => 'nrotc clerk',
            'company_id' => 1,
            'department_id' => 6
        ],
        [
            'firstname' => 'NROTC',
            'lastname' => 'NROTC 2',
            'password' => 'nrotc2',
            'email' => 'nrotc2@jblfmu.edu.ph',
            'username' => 'nrotc2',
            'designation' => 'clerk',
            'title' => 'nrotc clerk',
            'company_id' => 1,
            'department_id' => 6
        ],
        [
            'firstname' => 'NROTC',
            'lastname' => 'Head',
            'password' => 'nrotchead',
            'email' => 'nrotchead@jblfmu.edu.ph',
            'username' => 'nrotchead',
            'designation' => 'dept_head',
            'title' => 'Department Head',
            'company_id' => 1,
            'department_id' => 6
        ],

        [
            'firstname' => 'MIS',
            'lastname' => 'CLERK 1',
            'password' => 'misclerk1',
            'email' => 'misclerk1@jblfmu.edu.ph',
            'username' => 'misclerk1',
            'designation' => 'clerk',
            'title' => 'mis clerk',
            'company_id' => 1,
            'department_id' => 7
        ],
        [
            'firstname' => 'John Paul',
            'lastname' => 'Castello',
            'password' => 'misclerk2',
            'email' => 'misclerk2@jblfmu.edu.ph',
            'username' => 'misclerk2',
            'designation' => 'clerk',
            'title' => 'mis clerk',
            'company_id' => 1,
            'department_id' => 7
        ],
        [
            'firstname' => 'Jun',
            'lastname' => 'Goba',
            'password' => 'mishead',
            'email' => 'mishead@jblfmu.edu.ph',
            'username' => 'mishead',
            'designation' => 'dept_head',
            'title' => 'Department Head',
            'company_id' => 1,
            'department_id' => 7
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
