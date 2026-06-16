<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contact_contents', function (Blueprint $table) {
            $table->id();
            $table->string('section_label')->nullable();
            $table->string('title');
            $table->string('title_highlight')->nullable();
            $table->text('description')->nullable();
            $table->json('contact_info');
            $table->json('social_links');
            $table->text('map_embed')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contact_contents');
    }
};
