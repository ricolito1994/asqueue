<?php

namespace Database\Seeders;

use App\Models\EnrollmentStep;
use Illuminate\Database\Seeder;

class EnrollmentStepsSeed extends Seeder
{
    public function run(): void
    {
        $data = [

            // ===== BSMT (course 1) - 1ST YEAR =====
            $this->step(course: 1, year: 1, step: 1, office: 'Guidance Office', dept: 1, title: 'Guidance Requirements', items: ['8 pcs 2x2 Color Picture', 'Photocopy PSA', 'Original Copy of Senior Highschool Card.', 'TOR with transfer credentials (transferees).']),
            $this->step(course: 1, year: 1, step: 2, office: 'Clinic', dept: 5, title: 'Clinic Requirements', items: ['Medical Examination']),
            $this->step(course: 1, year: 1, step: 3, office: 'Accounting', dept: 3, title: 'Accounting Requirements', items: ['Down Payment P 3,500.00.']),
            $this->step(course: 1, year: 1, step: 4, office: 'NROTC', dept: 6),
            $this->step(course: 1, year: 1, step: 5, office: "Dean's Office", dept: 2, title: 'Window 3', items: ['Encoding and Evaluation of Subjects'], window: 6),
            $this->step(course: 1, year: 1, step: 6, office: "Registrar's Office", dept: 1, title: 'Registrar Requirements', items: ['High School Card (SFP)', 'Photocopy PSA', 'Certificate of Live Birth', '2x2 Picture', 'TOR with transfer credentials (transferees).']),
            $this->step(course: 1, year: 1, step: 7, office: 'MIS Office', dept: 1, title: 'For New Students', items: ['365 Account Creation', 'SIAS Account Finalization', 'School ID']),

            // ===== BSMT (course 1) - 2ND YEAR =====
            $this->step(course: 1, year: 2, step: 1, office: 'Guidance Office', dept: 1, title: 'Guidance Requirements', items: ['Complete Grades']),
            $this->step(course: 1, year: 2, step: 2, office: 'Clinic', dept: 5, title: 'Clinic Requirements', items: ['Medical Examination']),
            $this->step(course: 1, year: 2, step: 3, office: 'Accounting', dept: 3, title: 'Accounting Requirements', items: ['Down Payment P 3,500.00.']),
            $this->step(course: 1, year: 2, step: 4, office: 'NROTC', dept: 6),
            $this->step(course: 1, year: 2, step: 5, office: "Dean's Office", dept: 2, title: 'Window 3', items: ['Encoding and Evaluation of Subjects'], window: 6),
            $this->step(course: 1, year: 2, step: 6, office: "Registrar's Office", dept: 1, title: 'Registrar Requirements', items: ['Evaluation of Requirements.']),

            // ===== BSMT (course 1) - 3RD YEAR =====
            $this->step(course: 1, year: 3, step: 1, office: 'Guidance Office', dept: 1, title: 'Guidance Requirements', items: ['Complete Grades']),
            $this->step(course: 1, year: 3, step: 2, office: 'Clinic', dept: 5, title: 'Clinic Requirements', items: ['Medical Examination']),
            $this->step(course: 1, year: 3, step: 3, office: 'Accounting', dept: 3, title: 'Accounting Requirements', items: ['Down Payment P 3,500.00.']),
            $this->step(course: 1, year: 3, step: 4, office: 'NROTC', dept: 6),
            $this->step(course: 1, year: 3, step: 5, office: "Dean's Office", dept: 2, title: 'Window 3', items: ['Encoding and Evaluation of Subjects'], window: 6),
            $this->step(course: 1, year: 3, step: 6, office: "Registrar's Office", dept: 1, title: 'Registrar Requirements', items: ['Evaluation of Requirements.']),

            // ===== BS MAR-E (course 2) - 1ST YEAR =====
            $this->step(course: 2, year: 1, step: 1, office: 'Guidance Office', dept: 1, title: 'Guidance Requirements', items: ['8 pcs 2x2 Color Picture', 'Photocopy PSA', 'Original Copy of Senior Highschool Card.', 'TOR with transfer credentials (transferees).']),
            $this->step(course: 2, year: 1, step: 2, office: 'Clinic', dept: 5, title: 'Clinic Requirements', items: ['Medical Examination']),
            $this->step(course: 2, year: 1, step: 3, office: 'Accounting', dept: 3, title: 'Accounting Requirements', items: ['Down Payment P 3,500.00.']),
            $this->step(course: 2, year: 1, step: 4, office: 'NROTC', dept: 6),
            $this->step(course: 2, year: 1, step: 5, office: "Dean's Office", dept: 2, title: 'Window 3', items: ['Encoding and Evaluation of Subjects'], window: 6),
            $this->step(course: 2, year: 1, step: 6, office: "Registrar's Office", dept: 1, title: 'Registrar Requirements', items: ['High School Card (SFP)', 'Photocopy PSA', 'Certificate of Live Birth', '2x2 Picture', 'TOR with transfer credentials (transferees).']),
            $this->step(course: 2, year: 1, step: 7, office: 'MIS Office', dept: 1, title: 'For New Students', items: ['365 Account Creation', 'SIAS Account Finalization', 'School ID']),

            // ===== BS MAR-E (course 2) - 2ND YEAR =====
            $this->step(course: 2, year: 2, step: 1, office: 'Guidance Office', dept: 1, title: 'Guidance Requirements', items: ['Complete Grades']),
            $this->step(course: 2, year: 2, step: 2, office: 'Clinic', dept: 5, title: 'Clinic Requirements', items: ['Medical Examination']),
            $this->step(course: 2, year: 2, step: 3, office: 'Accounting', dept: 3, title: 'Accounting Requirements', items: ['Down Payment P 3,500.00.']),
            $this->step(course: 2, year: 2, step: 4, office: 'NROTC', dept: 6),
            $this->step(course: 2, year: 2, step: 5, office: "Dean's Office", dept: 2, title: 'Window 3', items: ['Encoding and Evaluation of Subjects'], window: 6),
            $this->step(course: 2, year: 2, step: 6, office: "Registrar's Office", dept: 1, title: 'Registrar Requirements', items: ['Evaluation of Requirements.']),

            // ===== BS MAR-E (course 2) - 3RD YEAR =====
            $this->step(course: 2, year: 3, step: 1, office: 'Guidance Office', dept: 1, title: 'Guidance Requirements', items: ['Complete Grades']),
            $this->step(course: 2, year: 3, step: 2, office: 'Clinic', dept: 5, title: 'Clinic Requirements', items: ['Medical Examination']),
            $this->step(course: 2, year: 3, step: 3, office: 'Accounting', dept: 3, title: 'Accounting Requirements', items: ['Down Payment P 3,500.00.']),
            $this->step(course: 2, year: 3, step: 4, office: 'NROTC', dept: 6),
            $this->step(course: 2, year: 3, step: 5, office: "Dean's Office", dept: 2, title: 'Window 3', items: ['Encoding and Evaluation of Subjects'], window: 6),
            $this->step(course: 2, year: 3, step: 6, office: "Registrar's Office", dept: 1, title: 'Registrar Requirements', items: ['Evaluation of Requirements.']),

        ];

        EnrollmentStep::upsert(
            $data,
            ['step', 'course_id', 'year_level_id', 'school_year_id'],
            ['description', 'long_description', 'is_also_for_transfer_students', 'school_year', 'department_id', 'specific_window_id', 'updated_at']
        );
    }

    // ---------------------------------------------------------------
    // You don't need to touch anything below this line.
    // It turns one step() call into a full database row.
    // ---------------------------------------------------------------
    private function step(
        int $course,
        int $year,
        int $step,
        string $office,
        int $dept,
        ?string $title = null,
        array $items = [],
        ?int $window = null,
    ): array {
        $html = null;
        if ($title) {
            $list = implode('', array_map(fn ($i) => "<li>{$i}</li>", $items));
            $html = "<div>{$title}</div><div><ul>{$list}</ul></div>";
        }

        return [
            'step'                          => $step,
            'description'                   => "Step {$step}: {$office}",
            'long_description'              => $html,
            'is_also_for_transfer_students' => $year === 1,   // only 1st year accepts transferees
            'course_id'                     => $course,
            'year_level'                    => $year,
            'year_level_id'                 => $year,
            'school_year'                   => 2026,
            'school_year_id'                => 1,
            'department_id'                 => $dept,
            'specific_window_id'            => $window,
        ];
    }
}