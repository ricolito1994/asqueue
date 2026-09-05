<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('designation')->nullable()->change();
            $table->mediumInteger('company_id')->nullable()->change();
            $table->mediumInteger('department_id')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('designation')->nullable(false)->change();
            $table->mediumInteger('company_id')->nullable(false)->change();
            $table->mediumInteger('department_id')->nullable(false)->change();
        });
    }
};