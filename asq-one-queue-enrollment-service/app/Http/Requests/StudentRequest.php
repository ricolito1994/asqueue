<?php

namespace App\Http\Requests;

use Closure;
use App\Models\Course;
use App\Models\College;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StudentRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'firstname' => [
                'required',
                'string',
                'max:100'
            ],
            'lastname' => [
                'required',
                'string',
                'max:100'
            ],
            'middlename' => [
                'required',
                'string',
                'max:100'
            ],
            'course_id' => [
                'bail',
                'required',
                'integer',
                Rule::exists('courses', 'id')
                    ->where('deleted_at', null),
                /** a course should belong to a right college */
                function (string $attribute, mixed $value, Closure $fail) {
                    $college = Course::whereKey($value)
                        ->where('college_id', $this->input('college_id'))
                        ->exists();

                    if (! $college) {
                        $fail("This course does not belong to this college.");
                    }
                }
            ],
            'college_id' => [
                'bail',
                'required',
                'integer',
                Rule::exists('colleges', 'id')
                    ->where('deleted_at', null),
                /** the selected college should have the right selected course also */
                function (string $attribute, mixed $value, Closure $fail) {
                    $course = College::find($value)
                        ->courses()
                        ->whereKey($this->input('course_id'))
                        ->exists();
                        
                    if (! $course) {
                        $fail("This college does not offer this course.");
                    }
                }
            ],
            'school_year_id' => [
                'bail',
                'required',
                'integer',
                Rule::exists('school_year', 'id')
                    ->where('deleted_at', null)
            ],
            'semester_id' => [
                'bail',
                'required',
                'integer',
                'max:1',
                Rule::exists('courses', 'id')
                    ->where('deleted_at', null)
            ],
            'year_level_id' => [
                'bail',
                'required',
                'integer',
                'max:1',
                Rule::exists('year_level', 'id')
                    ->where('deleted_at', null)
            ],
            'expires_at' => [
                'nullable',
                'date',
                'date_format:Y-m-d'
            ],
            'current_step' => [
                'nullable',
                'integer',
            ],
            'current_step_id' => [
                'nullable',
                'integer',
                Rule::exists('enrollment_steps', 'id')
                    ->where('deleted_at', null)
            ],
            'expires_at' => [
                'nullable',
                'date',
                'date_format:Y-m-d'
            ],
            'is_transfer_student' => [
                'nullable',
                'boolean'
            ],
            'is_enrollment_withrawn' => [
                'nullable',
                'boolean'
            ],
            'withraw_reason' => [
                'nullable',
                'string',
                'max:255',
            ],
            ...StudentEnrollmentNumberRequest::studentNumberRule()
        ];
    }
}
