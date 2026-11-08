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
            $table->foreignId('course_id')->references('id')->on('courses');
            $table->unsignedSmallInteger('year_level');
            $table->unsignedSmallInteger('school_year');
            $table->foreignId('school_year_id')->references('id')->on('school_year');
            $table->unsignedBigInteger('department_id');
            $table->timestamps();
            $table->softDeletes();
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
