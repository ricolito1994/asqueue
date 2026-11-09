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
        Schema::create('enrollment_steps', function (Blueprint $table) {
            $table->id();
            $table->unsignedSmallInteger('step');
            $table->text("description");
            $table->longText("long_description")->nullable();
            $table->boolean("is_also_for_transfer_students")->nullable();
            $table->foreignId('course_id')->references('id')->on('courses');
            $table->foreignId('year_level_id')->references('id')->on('year_level');
            $table->unsignedSmallInteger('year_level');
            $table->year('school_year');
            $table->unsignedSmallInteger('semester')->nullable();
            $table->foreignId('school_year_id')->nullable()->references('id')->on('school_year');
            $table->foreignId('semester_id')->nullable()->references('id')->on('semester');
            $table->unsignedBigInteger('department_id');
            $table->unsignedBigInteger('specific_window_id')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->unique(
                [
                    'step',
                    'course_id',
                    'year_level_id',
                    'school_year_id',
                ],
                'enrollment_steps_unique'
            );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enrollment_steps');
    }
};
