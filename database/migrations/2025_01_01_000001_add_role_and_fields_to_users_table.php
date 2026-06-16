<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['super_admin', 'admin', 'editor'])->default('editor')->after('email');
            $table->string('full_name')->nullable()->after('role');
            $table->string('avatar')->nullable()->after('full_name');
            $table->boolean('is_active')->default(true)->after('avatar');
            $table->timestamp('last_login')->nullable()->after('is_active');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'full_name', 'avatar', 'is_active', 'last_login']);
        });
    }
};
