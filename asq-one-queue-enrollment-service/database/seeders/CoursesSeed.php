<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CoursesSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'course' => 'BS Marine Transportation',
                'course_code' => 'BSMT',
                'company_id' => 1,
                'college_id' => 1,
            ],
            [
                'course' => 'BS Marine Engineering',
                'course_code' => 'BS MAR-E',
                'company_id' => 1,
                'college_id' => 1,
            ]
        ];

        foreach($data as $row):
            Course::updateOrCreate([
                'course_code' => $row['course_code'],
                'college_id' => $row['college_id'], 
            ], $row);
        endforeach;
    }
}
