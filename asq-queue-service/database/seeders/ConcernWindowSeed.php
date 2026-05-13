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
            // jb mar e reg
            [
                'window_id' => 1,
                'concern_id' => 1,
            ],
            [
                'window_id' => 1,
                'concern_id' => 2,
            ],
            [
                'window_id' => 1,
                'concern_id' => 3,
            ],
            [
                'window_id' => 1,
                'concern_id' => 4,
            ],
            [
                'window_id' => 1,
                'concern_id' => 5,
            ],
            // jb hrm reg
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
                'window_id' => 2,
                'concern_id' => 4,
            ],
            [
                'window_id' => 2,
                'concern_id' => 6,
            ],
            // jb nautical reg
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
                'concern_id' => 3,
            ],
            [
                'window_id' => 3,
                'concern_id' => 4,
            ],
            [
                'window_id' => 3,
                'concern_id' => 7,
            ],
            // deans w1
            [
                'window_id' => 4,
                'concern_id' => 8,
            ],
            [
                'window_id' => 4,
                'concern_id' => 9,
            ],
            [
                'window_id' => 4,
                'concern_id' => 10,
            ],
            // deans w2
            [
                'window_id' => 5,
                'concern_id' => 8,
            ],
            [
                'window_id' => 5,
                'concern_id' => 9,
            ],
            [
                'window_id' => 5,
                'concern_id' => 11,
            ],
            // deans w3
            [
                'window_id' => 6,
                'concern_id' => 8,
            ],
            [
                'window_id' => 6,
                'concern_id' => 9,
            ],
            [
                'window_id' => 6,
                'concern_id' => 12,
            ],
            // accounting w1
            [
                'window_id' => 7,
                'concern_id' => 13,
            ],
            [
                'window_id' => 7,
                'concern_id' => 14,
            ],
            [
                'window_id' => 7,
                'concern_id' => 15,
            ],
            // accounting w2
            [
                'window_id' => 8,
                'concern_id' => 13,
            ],
            [
                'window_id' => 8,
                'concern_id' => 14,
            ],
            [
                'window_id' => 8,
                'concern_id' => 16,
            ],
            // accounting w3
            [
                'window_id' => 9,
                'concern_id' => 13,
            ],
            [
                'window_id' => 9,
                'concern_id' => 14,
            ],
            [
                'window_id' => 9,
                'concern_id' => 17,
            ],
        ];

        foreach ($concernWindowData as $concernWindow):
            ConcernWindow::create($concernWindow);
        endforeach;
    }
}
