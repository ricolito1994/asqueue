<?php

namespace App\Http\Requests;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StudentEnrollmentNumberRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return self::studentNumberRule(true);
    }

    public static function studentNumberRule(bool $isRequired = false): array
    {
        return [
            'student_enrollment_number' => [
                'bail',
                $isRequired ? 'required' : 'nullable',
                'string',
                'max:28',
                function(string $attribute, mixed $value, Closure $fail) {
                    if (! preg_match('/^[A-Z0-9]{2,10}-[A-Z0-9]{2,15}-\d{3}-\d{3}-\d{4}-\d{6}$/', $value)) {
                        $fail("Invalid student code.");
                    }
                }
            ],
        ];
    }
}
