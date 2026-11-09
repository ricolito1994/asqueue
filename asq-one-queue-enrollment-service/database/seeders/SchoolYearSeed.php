<?php

namespace Database\Seeders;

use App\Models\SchoolYear;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class SchoolYearSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'school_year_from' => 2026,
                'school_year_to' => 2027,
                'school_year_start_at' => "2026-01-01",
                'school_year_end_at' => "2027-04-21",
                'company_id' => 1,
            ]
        ];

        foreach ($data as $row):
            SchoolYear::updateOrCreate([
                'school_year_from' => $row['school_year_from'],
                'school_year_to'   => $row['school_year_to'],
                'company_id'       => $row['company_id'],
            ], $row);
        endforeach;
    }
}
