<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Window;

class WindowSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $windowData = [
            [
                'name' => 'Doc Kevin',
                'description' => 'For patient Consultation and Followup check up.',
                'company_id' => 1,
                'department_id' => 1,
                'assigned_to' => 1
            ],
            [
                'name' => 'Doc Bimbao',
                'description' => 'For patient Consultation and Followup check up and pre-natal services.',
                'company_id' => 1,
                'department_id' => 1,
                'assigned_to' => 2
            ],
            [
                'name' => 'Doc Abelarde',
                'description' => 'For patient Consultation, Followup check up and animal bite.',
                'company_id' => 1,
                'department_id' => 1,
                'assigned_to' => 3
            ],
            [
                'name' => 'MAR-E Window',
                'description' => 'For Maritime Engineering Students',
                'company_id' => 2,
                'department_id' => 2,
                'assigned_to' => 4
            ],
            [
                'name' => 'HRM Window',
                'description' => 'For Hotel Restaurant Management Students.',
                'company_id' => 2,
                'department_id' => 2,
                'assigned_to' => 5
            ],
            [
                'name' => 'Nautical',
                'description' => 'For Nautical Engineering Students.',
                'company_id' => 2,
                'department_id' => 2,
                'assigned_to' => 6
            ],
        ];

        foreach ($windowData as $window):
            Window::create($window);
        endforeach;
    }
}
