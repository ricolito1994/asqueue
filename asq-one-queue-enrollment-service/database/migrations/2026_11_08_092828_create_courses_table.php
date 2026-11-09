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
        Schema::create('school_year', function (Blueprint $table) {
            $table->id();
            $table->year('school_year_from');
            $table->year('school_year_to');
            $table->date('school_year_start_at')->nullable();
            $table->date('school_year_end_at')->nullable();
            $table->unsignedBigInteger('company_id');
            $table->timestamps();
            $table->softDeletes();

            $table->index(
                ['company_id', 'school_year_from', 'school_year_to'],
                'school_year_company_period_idx'
            );
        });

        Schema::create('semester', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_year_id')
                ->constrained('school_year');

            $table->unsignedBigInteger('school_year');
            $table->unsignedSmallInteger('semester');
            $table->date('enrollment_start_at')->nullable();
            $table->date('enrollment_end_at')->nullable();
            $table->date('semester_start_at')->nullable();
            $table->date('semester_end_at')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index(
                ['school_year_id', 'semester'],
                'semester_school_year_semester_idx'
            );

            $table->index('semester_start_at');
            $table->index('semester_end_at');
            $table->index('enrollment_start_at');
            $table->index('enrollment_end_at');
        });

        Schema::create('colleges', function (Blueprint $table) {
            $table->id();
            $table->string('college_name');
            $table->unsignedBigInteger('company_id');
            $table->timestamps();
            $table->softDeletes();

            $table->index(
                ['company_id', 'college_name'],
                'college_company_idx'
            );
        });

        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('course');
            $table->string('course_code')->nullable();

            $table->unsignedBigInteger('company_id');

            $table->foreignId('college_id')
                ->constrained('colleges');

            $table->timestamps();
            $table->softDeletes();

            $table->index(
                ['college_id', 'course_code'],
                'courses_college_code_idx'
            );

            $table->index(
                ['company_id', 'course'],
                'courses_company_course_idx'
            );
        });

        Schema::create('year_level', function (Blueprint $table) {
            $table->id();

            $table->unsignedSmallInteger('year_level');

            $table->foreignId('course_id')
                ->constrained('courses');

            $table->string('description')->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->unique(
                ['course_id', 'year_level'],
                'year_level_course_level_unique'
            );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('year_level');
        Schema::dropIfExists('courses');
        Schema::dropIfExists('departments');
        Schema::dropIfExists('semester');
        Schema::dropIfExists('school_year');
    }
};
