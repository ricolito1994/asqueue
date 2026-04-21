<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Company;

class CompanySeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    const COMPANY_DATA = [
        [
            'name' => 'CITY HEALTH OF BAGO CITY'
        ],
        [
            'name' => 'JBLFMU'
        ],
    ];


    public function run(): void
    {
        //
        foreach (self::COMPANY_DATA as $company):
            Company::create($company);
        endforeach;
    }
}
