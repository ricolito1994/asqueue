<?php

namespace Database\Seeders;

use App\Models\YearLevel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class YearLevelSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'year_level' => 1,
                'course_id' => 1,
                'description' => 'First Year',
            ],
            [
                'year_level' => 2,
                'course_id' => 1,
                'description' => 'Second Year',
            ],
            [
                'year_level' => 3,
                'course_id' => 1,
                'description' => 'Third Year',
            ],

            [
                'year_level' => 1,
                'course_id' => 2,
                'description' => 'First Year',
            ],
            [
                'year_level' => 2,
                'course_id' => 2,
                'description' => 'Second Year',
            ],
            [
                'year_level' => 3,
                'course_id' => 2,
                'description' => 'Third Year',
            ],

           
        ];

        foreach ($data as $row):
            YearLevel::updateOrCreate([
                'year_level' => $row['year_level'],
                'course_id' => $row['course_id'],
            ], $row);
        endforeach;
    }
}
