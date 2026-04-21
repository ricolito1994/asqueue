<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ConcernWindow;

class ConcernWindowSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $concernWindowData = [
            // ct health bago
            [
                'window_id' => 1,
                'concern_id' => 1,
            ],
            [
                'window_id' => 1,
                'concern_id' => 2,
            ],
            [
                'window_id' => 2,
                'concern_id' => 1,
            ],
            [
                'window_id' => 2,
                'concern_id' => 2,
            ],
            [
                'window_id' => 2,
                'concern_id' => 3,
            ],
            [
                'window_id' => 3,
                'concern_id' => 1,
            ],
            [
                'window_id' => 3,
                'concern_id' => 2,
            ],
            [
                'window_id' => 3,
                'concern_id' => 4,
            ],

            // jb mar e
            [
                'window_id' => 4,
                'concern_id' => 5,
            ],
            [
                'window_id' => 4,
                'concern_id' => 6,
            ],
            [
                'window_id' => 4,
                'concern_id' => 7,
            ],
            [
                'window_id' => 4,
                'concern_id' => 8,
            ],
            [
                'window_id' => 4,
                'concern_id' => 9,
            ],
            // jb hrm
            [
                'window_id' => 5,
                'concern_id' => 5,
            ],
            [
                'window_id' => 5,
                'concern_id' => 6,
            ],
            [
                'window_id' => 5,
                'concern_id' => 7,
            ],
            [
                'window_id' => 5,
                'concern_id' => 8,
            ],
            [
                'window_id' => 5,
                'concern_id' => 10,
            ],
            // jb nautical
            [
                'window_id' => 6,
                'concern_id' => 5,
            ],
            [
                'window_id' => 6,
                'concern_id' => 6,
            ],
            [
                'window_id' => 6,
                'concern_id' => 7,
            ],
            [
                'window_id' => 6,
                'concern_id' => 8,
            ],
            [
                'window_id' => 6,
                'concern_id' => 11,
            ],
        ];

        foreach ($concernWindowData as $concernWindow):
            ConcernWindow::create($concernWindow);
        endforeach;
    }
}
