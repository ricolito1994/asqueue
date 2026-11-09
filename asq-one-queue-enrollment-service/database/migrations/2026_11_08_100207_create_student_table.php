<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('student', function (Blueprint $table) {
            $table->id();

            $table->string('firstname');
            $table->string('lastname');
            $table->string('middlename')->nullable();

            $table->string('student_enrollment_number', 255)->unique();

            $table->boolean('is_transfer_student')->nullable();

            $table->foreignId('course_id')->constrained('courses');

            $table->date('birthday')->nullable();

            $table->foreignId('semester_id')->constrained('semester');

            $table->foreignId('school_year_id')->constrained('school_year');

            $table->year('school_year');
            $table->unsignedSmallInteger('semester');

            $table->unsignedSmallInteger('current_step');

            $table->foreignId('current_step_id')
                ->nullable()
                ->constrained('enrollment_steps');

            $table->date('expires_at');
            
            $table->boolean('is_enrollment_withrawn')->nullable();

            $table->string('withraw_reason')->nullable();

            $table->timestamps();
            $table->softDeletes();
            
            // Composite indexes
            $table->index(
                ['school_year_id', 'semester_id'],
                'student_school_year_semester_idx'
            );

            $table->index(
                ['course_id', 'school_year_id', 'semester_id'],
                'student_course_period_idx'
            );

            $table->index(
                ['lastname', 'firstname', 'middlename'],
                'student_name_idx'
            );

            $table->index('student_enrollment_number');

            $table->index('expires_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student');
    }
};
