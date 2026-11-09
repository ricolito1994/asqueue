<?php

namespace Database\Seeders;

use App\Models\College;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CollegeSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'college_name' => 'School of Maritime',
                'company_id' => 1
            ],
        ];

        foreach ($data as $row):
            College::updateOrCreate([
                'college_name'    => $row['college_name'],
                'company_id'    => $row['company_id'],
            ], $row);
        endforeach;
    }
}
