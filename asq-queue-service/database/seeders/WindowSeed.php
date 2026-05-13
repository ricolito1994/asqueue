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
            //registrar
            [
                'name' => 'Registrar MAR-E Window',
                'description' => 'For Maritime Engineering Students',
                'company_id' => 1,
                'department_id' => 1,
                'assigned_to' => 1
            ],
            [
                'name' => 'Registrar HRM Window',
                'description' => 'For Hotel Restaurant Management Students.',
                'company_id' => 1,
                'department_id' => 1,
                'assigned_to' => 2
            ],
            [
                'name' => 'Registrar Nautical Window',
                'description' => 'For Nautical Engineering Students.',
                'company_id' => 1,
                'department_id' => 1,
                'assigned_to' => 3
            ],
            // deans
            [
                'name' => 'Deans MAR-E Window',
                'description' => 'For Maritime Engineering Students',
                'company_id' => 1,
                'department_id' => 2,
                'assigned_to' => 5
            ],
            [
                'name' => 'Deans HRM Window',
                'description' => 'For Hotel Restaurant Management Students.',
                'company_id' => 1,
                'department_id' => 2,
                'assigned_to' => 6
            ],
            [
                'name' => 'Deans Nautical Window',
                'description' => 'For Nautical Engineering Students.',
                'company_id' => 1,
                'department_id' => 2,
                'assigned_to' => 7
            ],
            // accounting
            [
                'name' => 'Accounting Window 1',
                'description' => 'Accounting Concerns',
                'company_id' => 1,
                'department_id' => 3,
                'assigned_to' => 9
            ],
            [
                'name' => 'Accounting Window 2',
                'description' => 'Accounting Concerns',
                'company_id' => 1,
                'department_id' => 3,
                'assigned_to' => 10
            ],
            [
                'name' => 'Accounting Window 3',
                'description' => 'Accounting Concerns',
                'company_id' => 1,
                'department_id' => 3,
                'assigned_to' => 11
            ],
        ];

        foreach ($windowData as $window):
            Window::create($window);
        endforeach;
    }
}
