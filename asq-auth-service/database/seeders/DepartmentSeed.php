<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Department;

class DepartmentSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    const DEPARTMENT_DATA = [
        [
            'name' => 'Consultation Department',
            'company_id' => 1
        ],
        [
            'name' => 'Registrar',
            'company_id' => 2
        ],
    ];


    public function run(): void
    {
        //
        foreach (self::DEPARTMENT_DATA as $department):
            Department::create($department);
        endforeach;
    }
}
