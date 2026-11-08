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
        Schema::table('windows', function (Blueprint $table) {
            $table->boolean("enable_enrollment")->nullable();
        });
        Schema::table('transactions', function (Blueprint $table) {
            $table->boolean("is_enrollment")->nullable();
            $table->boolean('skipped')->nullable();
            $table->string('student_enrollment_number', 255)->nullable();
            $table->unsignedBigInteger('student_enrollment_id')->nullable();
            $table->unsignedBigInteger('enrollment_transaction_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('windows', function (Blueprint $table) {
            $table->dropColumnIfExists("is_enrollment");
            $table->dropColumnIfExists("skipped");
            $table->dropColumnIfExists("enrollment_transaction_id");
            $table->dropColumnIfExists("student_enrollment_id");
            $table->dropColumnIfExists("student_enrollment_number");
        });
        Schema::table('windows', function (Blueprint $table) {
            $table->dropColumnIfExists("enable_enrollment");
        });
    }
};
