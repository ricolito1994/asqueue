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
            [
                'name' => 'Consultation',
                'description' => 'For patient consultation.',
                'company_id' => 1,
                'department_id' => 1,
            ],
            [
                'name' => 'Follow Up Consultation',
                'description' => 'For patients requested to follow-up consult.',
                'company_id' => 1,
                'department_id' => 1,
            ],
            [
                'name' => 'Animal Bite Injection',
                'description' => 'For animal bite concerns.',
                'company_id' => 1,
                'department_id' => 1,
            ],
            [
                'name' => 'Pre Natal Consultation',
                'description' => 'And other pregnancy consultation.',
                'company_id' => 1,
                'department_id' => 1,
            ],

            // janb
            [
                'name' => 'Checking Grades',
                'description' => 'Checking grades.',
                'company_id' => 2,
                'department_id' => 2,
            ],
            [
                'name' => 'Certificate of good moral.',
                'description' => 'Application for Certificate of good moral.',
                'company_id' => 2,
                'department_id' => 2,
            ],
            [
                'name' => 'Enrolment',
                'description' => 'Various enrolment services.',
                'company_id' => 2,
                'department_id' => 2,
            ],
            [
                'name' => 'Transcript of Records',
                'description' => 'Transcript of records request.',
                'company_id' => 2,
                'department_id' => 2,
            ],
            [
                'name' => 'Special case MAR-E',
                'description' => 'For special cases for MAR-E course',
                'company_id' => 2,
                'department_id' => 2,
            ],
            [
                'name' => 'Special case HRM',
                'description' => 'For special cases for HRM course',
                'company_id' => 2,
                'department_id' => 2,
            ],
            [
                'name' => 'Special case Nautical',
                'description' => 'For special cases for Nautical course',
                'company_id' => 2,
                'department_id' => 2,
            ]
        ];

        foreach ($concernData as $concern):
            Concern::create($concern);
        endforeach;
    }
}
