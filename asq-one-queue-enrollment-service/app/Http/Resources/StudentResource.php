<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'firstname' => $this->firstname,
            'lastname' => $this->lastname,
            'middlename' => $this->middlename,
            'is_transfer_student' => $this->is_transfer_student,
            'student_enrollment_number' => $this->student_enrollment_number,
            'course' => $this->whenLoaded('course', fn() => [
                'course' => $this->course->course,
                'code'  => $this->course->course_code,
            ]),
            'college' => $this->whenLoaded('college', fn() => [
                'college' => $this->college->college_name,
                'code'  => $this->college->college_code,
            ]),
            'school_year' => $this->whenLoaded('schoolYear', fn() => $this->schoolYear->school_year_from),
            'semester' => $this->whenLoaded('semester', fn() => $this->semester->semester),
            'year_level' => $this->whenLoaded('yearLevel', fn() => $this->yearLevel->year_level),
        ];
    }
}
