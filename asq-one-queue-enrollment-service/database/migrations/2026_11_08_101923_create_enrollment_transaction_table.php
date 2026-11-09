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
        Schema::create('enrollment_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->references('id')->on('student');
            $table->unsignedSmallInteger('step');
            $table->text('description')->nullable();
            $table->foreignId('step_id')
                ->nullable()
                ->references('id')
                ->on('enrollment_steps');
            $table->foreignId('school_year_id')
                ->nullable()
                ->references('id')
                ->on('school_year');
            $table->foreignId('semester_id')
                ->nullable()
                ->references('id')
                ->on('semester');
            $table->unsignedSmallInteger('school_year');
            $table->unsignedSmallInteger('semester');
            $table->dateTime('transaction_start_at');
            $table->dateTime('transaction_end_at');
            $table->timestamps();
            $table->softDeletes();

            $table->index(['student_id', 'school_year_id', 'semester_id'], "student_steps_idx");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enrollment_transactions');
    }
};
