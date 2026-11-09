<?php

namespace Database\Seeders;

use App\Models\Semester;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SemesterSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'semester'  => 2,
                'school_year_id' => 1,
                'school_year' => 2026,
                'enrollment_start_at' => '2026-11-01',
                'enrollment_end_at'  => '2026-11-30',
                'semester_start_at'  => '2026-11-01',
                'semester_end_at'  => '2027-04-30',
            ]
        ];

        foreach ($data as $row):
            Semester::updateOrCreate([
                'semester_start_at' => $row['semester_start_at'],
                'semester_end_at'   => $row['semester_end_at'],
            ], $row);
        endforeach;
    }
}
