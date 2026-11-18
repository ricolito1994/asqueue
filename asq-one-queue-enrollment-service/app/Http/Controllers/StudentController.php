<?php

namespace App\Http\Controllers;

use App\Models\College;
use App\Models\Course;
use App\Models\EnrollmentStep;
use App\Models\SchoolYear;
use App\Models\Semester;
use App\Models\Student;
use App\Http\Resources\StudentResource;
use App\Http\Requests\StudentEnrollmentNumberRequest;
use App\Http\Requests\StudentRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Arr;
use Throwable;

class StudentController extends Controller
{
    public function index(StudentRequest $request): AnonymousResourceCollection|JsonResponse
    {
        try {
            $students = Student::filter($request->validated())
                ->paginate(10);
            return StudentResource::collection($students);
        } catch (Throwable $e) {
            return $this->processException($e);
        }
    }

    public function create(StudentRequest $request): StudentResource|JsonResponse
    {
        try {
            $existingStudent = Student::query()
                ->where(Arr::only($request->validated(), Student::COMPOSITE_ATTRIBUTE))
                ->exists();

            if ($existingStudent) {
                return response()->json([
                    "message" => "This student already exists. Are you sure you want to add this student?"
                ]);
            }

            return new StudentResource(
                $this->createStudent($request->validated())
            );
        } catch (Throwable $e) {
            return $this->processException($e);
        }
    }

    public function findStudent(StudentRequest $request): StudentResource|JsonResponse
    {
        try {
            $request = $request->validated();

            $condition = Arr::only($request, Student::COMPOSITE_ATTRIBUTE);

            $student = $this->queryStudent($condition);

            return new StudentResource($student);
        } catch (Throwable $e) {
            return $this->processException($e);
        }
    }

    public function findByEnrollmentNumber(StudentEnrollmentNumberRequest $request): StudentResource|JsonResponse
    {
        try {
            $request = $request->validated();

            $condition = [
                'student_enrollment_number' => $request['student_enrollment_number']
            ];

            $student = $this->queryStudent($condition);

            return new StudentResource($student);
        } catch (Throwable $e) {
            return $this->processException($e);
        }
    }

    public function createConfirm(StudentRequest $request): StudentResource|JsonResponse
    {
        try {
            return new StudentResource(
                $this->createStudent($request->validated())
            );
        } catch (Throwable $e) {
            return $this->processException($e);
        }
    }

    private function queryStudent(array $condition): Student
    {
        return Student::query()
            ->with([
                'course', 
                'college', 
                'yearLevel', 
                'schoolYear', 
                'semester'
            ])
            ->where($condition)
            ->firstOrFail();
    }

    private function createStudent(array $request): Student
    {
        return DB::transaction(function() use ($request) {
            $attributes = Student::COMPOSITE_ATTRIBUTE;
            
            $identity = Arr::only($request, $attributes);

            $student = Student::where($identity)->lockForUpdate()->first() ?? 
                new Student($request);

            if (! $student->exists) {
                $student->loadMissing('yearLevel');

                $enrollmentStepCondition = [
                    'college_id'    => $student['college_id'],
                    'course_id'     => $student['course_id'],
                    'year_level_id' => $student['year_level_id'],
                ];

                /** enrollment step for transferees */
                if ($student->is_transfer_student && $student->yearLevel?->year_level > 1) {
                    $enrollmentStepCondition[] = [
                        'is_also_for_tansfer_students' => $student->is_transfer_student
                    ];
                }

                $enrollmentStep = EnrollmentStep::query()
                    ->select('step', 'id')
                    ->where($enrollmentStepCondition)
                    ->first();

                $student->expires_at = now();

                abort_if(! $enrollmentStep, 422, 'No enrollment step configured for this college, course and year level.');

                $student->currentStep($enrollmentStep->step, $enrollmentStep->id)->save();
            }

            if (! $student->student_enrollment_number) {
                $student->assignEnrollmentNumber()->save();
            }

            return $student;
        });
    }
}
