<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Student extends Model
{
    use SoftDeletes;
    
    protected $table = 'student';

    protected $fillable = [
        'firstname',
        'lastname',
        'middlename',
        'student_enrollment_number',
        'course_id',
        'college_id',
        'school_year_id',
        'semester_id',
        'expires_at',
        'current_step',
        'current_step_id',
        'expires_at',
        'is_transfer_student',
        'is_enrollment_withrawn',
        'withraw_reason',
        'year_level_id',
    ];

    protected $casts = [
        'expires_at' => 'date:Y-m-d',
        'is_transfer_student'  => 'boolean',
        'is_enrollment_withrawn' => 'boolean',
    ];

    public const COMPOSITE_ATTRIBUTE = [
        'lastname' ,
        'firstname',
        'middlename',
        'college_id',
        'course_id',
        'semester_id',
        'school_year_id',
        'year_level_id',
        'is_transfer_student',
    ];

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function college(): BelongsTo
    {
        return $this->belongsTo(College::class);
    }

    public function yearLevel(): BelongsTo
    {
        return $this->belongsTo(YearLevel::class);
    }

    public function semester(): BelongsTo
    {
        return $this->belongsTo(Semester::class);
    }

    public function schoolYear(): BelongsTo
    {
        return $this->belongsTo(SchoolYear::class);
    }

    public function scopeFilter(Builder $query, array $filter): Builder
    {
        return $query;
    }

    // to be called after saving of student
    public function assignEnrollmentNumber(): Student
    {
        $this->loadMissing([
            'college',
            'course',
            'semester',
            'schoolYear',
        ]);

        $this->student_enrollment_number = $this->generateEnrollmentNumber(
            $this->college?->college_code,
            $this->course?->course_code,
            str_pad($this->semester?->semester, 3, '0', STR_PAD_LEFT),
            $this->schoolyear?->school_year_from,
            str_pad($this->yearLevel?->year_level, 3, '0', STR_PAD_LEFT),
        );

        return $this;
    }

    public function currentStep(int $step, int $currentStepId): Student
    {
        $this->current_step = $step;
        $this->current_step_id = $currentStepId;

        return $this;
    }

    private function generateEnrollmentNumber(
        string $collegeCode,
        string $courseCode,
        int $semester,
        int $schoolYear,
        int $yearLevel,
    )
    {
        return sprintf('%s-%s-%03d-%03d-%04d-%s', 
            $collegeCode,
            $courseCode,
            $yearLevel,
            $semester,
            $schoolYear,
            str_pad($this->id, 6, '0', STR_PAD_LEFT)
        );
    }
}
 