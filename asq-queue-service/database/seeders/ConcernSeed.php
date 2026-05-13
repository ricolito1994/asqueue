<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Concern;

class ConcernSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $concernData = [
            // registrar
            [
                'name' => 'Checking Grades',
                'description' => 'Checking grades.',
                'company_id' => 1,
                'department_id' => 1,
            ],
            [
                'name' => 'Certificate of good moral.',
                'description' => 'Application for Certificate of good moral.',
                'company_id' => 1,
                'department_id' => 1,
            ],
            [
                'name' => 'Enrolment',
                'description' => 'Various enrolment services.',
                'company_id' => 1,
                'department_id' => 1,
            ],
            [
                'name' => 'Transcript of Records',
                'description' => 'Transcript of records request.',
                'company_id' => 1,
                'department_id' => 1,
            ],
            [
                'name' => 'Special case MAR-E',
                'description' => 'For special cases for MAR-E course',
                'company_id' => 1,
                'department_id' => 1,
            ],
            [
                'name' => 'Special case HRM',
                'description' => 'For special cases for HRM course',
                'company_id' => 1,
                'department_id' => 1,
            ],
            [
                'name' => 'Special case Nautical',
                'description' => 'For special cases for Nautical course',
                'company_id' => 1,
                'department_id' => 1,
            ],

            // deans
            [
                'name' => 'Checking Grades',
                'description' => 'Checking grades.',
                'company_id' => 1,
                'department_id' => 2,
            ],
            [
                'name' => 'Enrolment',
                'description' => 'Various enrolment services.',
                'company_id' => 1,
                'department_id' => 2,
            ],
            [
                'name' => 'Special case MAR-E',
                'description' => 'For special cases for MAR-E course',
                'company_id' => 1,
                'department_id' => 2,
            ],
            [
                'name' => 'Special case HRM',
                'description' => 'For special cases for HRM course',
                'company_id' => 1,
                'department_id' => 2,
            ],
            [
                'name' => 'Special case Nautical',
                'description' => 'For special cases for Nautical course',
                'company_id' => 1,
                'department_id' => 2,
            ],

            // accounting
            [
                'name' => 'Payment',
                'description' => 'Various enrolment services.',
                'company_id' => 1,
                'department_id' => 3,
            ],
            [
                'name' => 'Statement Of Accounts',
                'description' => 'Various enrolment services.',
                'company_id' => 1,
                'department_id' => 3,
            ],
            [
                'name' => 'Enrolment',
                'description' => 'Various enrolment services.',
                'company_id' => 1,
                'department_id' => 3,
            ],
            [
                'name' => 'Other Payments',
                'description' => 'Various enrolment services.',
                'company_id' => 1,
                'department_id' => 3,
            ],
            [
                'name' => 'Clearance',
                'description' => 'Various enrolment services.',
                'company_id' => 1,
                'department_id' => 3,
            ],
        ];

        foreach ($concernData as $concern):
            Concern::create($concern);
        endforeach;
    }
}
