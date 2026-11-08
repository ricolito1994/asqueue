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
            $table->string('student_enrollment_number', 255);
            $table->foreignId('course_id')->references('id')->on('courses');
            $table->date('birthday')->nullable();
            $table->unsignedSmallInteger('school_year');
            $table->unsignedSmallInteger('current_step');
            $table->foreignId('current_step_id')->references('id')->on('enrollment_steps')->nullable();
            $table->date('expires_at');
            $table->timestamps();
            $table->softDeletes();
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
