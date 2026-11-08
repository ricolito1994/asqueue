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
            $table->foreignId('student_id')->references('id')->on('students');
            $table->unsignedSmallInteger('step');
            $table->text('description');
            $table->foreignId('step_id')->references('id')->on('enrollment_steps')->nullable();
            $table->unsignedSmallInteger('school_year');
            $table->dateTime('transaction_start_at');
            $table->dateTime('transaction_end_at');
            $table->timestamps();
            $table->softDeletes();
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
