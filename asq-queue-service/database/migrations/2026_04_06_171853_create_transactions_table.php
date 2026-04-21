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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('description', 255);
            $table->string('status', 255);
            $table->unsignedBigInteger('queue_number');
            $table->unsignedBigInteger('processed_by');
            $table->unsignedBigInteger('created_by');
            $table->unsignedBigInteger('company_id');
            $table->unsignedBigInteger('department_id');
            $table->unsignedBigInteger('queue_session_id');
            $table->foreignId('window_id')->constrained('windows')->cascadeOnDelete();
            $table->foreignId('concern_id')->constrained('concerns')->cascadeOnDelete();
            $table->text('pre_process_log')->nullable();
            $table->text('post_process_log')->nullable();
            $table->timestamp('process_start_at')->nullable();
            $table->timestamp('process_end_at')->nullable();
            $table->boolean('is_priority')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
