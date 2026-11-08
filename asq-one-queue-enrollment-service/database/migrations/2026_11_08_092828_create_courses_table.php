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
            $table->unsignedBigInteger('school_year_from');
            $table->unsignedBigInteger('school_year_to');
            $table->date('enrolment_start_date');
            $table->date('enrolment_end_date');
            $table->date('school_year_start_at')->nullable();
            $table->date('school_year_end_at')->nullable();
            $table->unsignedBigInteger('company_id');
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('colleges', function (Blueprint $table) {
            $table->id();
            $table->string('college');
            $table->unsignedBigInteger('company_id');
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('course');
            $table->unsignedBigInteger('company_id');
            $table->foreignId('college_id')->references('id')->on('colleges');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('school_year');
        Schema::dropIfExists('colleges');
        Schema::dropIfExists('courses');
    }
};
