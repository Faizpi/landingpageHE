<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('hero_contents', function (Blueprint $table) {
            $table->string('badge_text_en')->nullable()->after('badge_text');
            $table->string('title_en')->nullable()->after('title');
            $table->string('title_highlight_en')->nullable()->after('title_highlight');
            $table->string('subtitle_en')->nullable()->after('subtitle');
            $table->text('description_en')->nullable()->after('description');
            $table->string('button_primary_text_en')->nullable()->after('button_primary_text');
            $table->string('button_secondary_text_en')->nullable()->after('button_secondary_text');
            $table->string('stat_1_label_en')->nullable()->after('stat_1_label');
            $table->string('stat_2_label_en')->nullable()->after('stat_2_label');
            $table->string('stat_3_label_en')->nullable()->after('stat_3_label');
        });

        Schema::table('about_contents', function (Blueprint $table) {
            $table->string('section_label_en')->nullable()->after('section_label');
            $table->string('title_en')->nullable()->after('title');
            $table->string('title_highlight_en')->nullable()->after('title_highlight');
            $table->text('description_en')->nullable()->after('description');
        });

        Schema::table('contact_contents', function (Blueprint $table) {
            $table->string('section_label_en')->nullable()->after('section_label');
            $table->string('title_en')->nullable()->after('title');
            $table->string('title_highlight_en')->nullable()->after('title_highlight');
            $table->text('description_en')->nullable()->after('description');
        });

        Schema::table('footer_contents', function (Blueprint $table) {
            $table->string('tagline_en')->nullable()->after('tagline');
            $table->text('description_en')->nullable()->after('description');
            $table->string('copyright_text_en')->nullable()->after('copyright_text');
        });

        Schema::table('service_categories', function (Blueprint $table) {
            $table->string('title_en')->nullable()->after('title');
        });

        Schema::table('services', function (Blueprint $table) {
            $table->string('name_en')->nullable()->after('name');
            $table->text('description_en')->nullable()->after('description');
        });
    }

    public function down(): void
    {
        Schema::table('hero_contents', function (Blueprint $table) {
            $table->dropColumn([
                'badge_text_en',
                'title_en',
                'title_highlight_en',
                'subtitle_en',
                'description_en',
                'button_primary_text_en',
                'button_secondary_text_en',
                'stat_1_label_en',
                'stat_2_label_en',
                'stat_3_label_en',
            ]);
        });

        Schema::table('about_contents', function (Blueprint $table) {
            $table->dropColumn(['section_label_en', 'title_en', 'title_highlight_en', 'description_en']);
        });

        Schema::table('contact_contents', function (Blueprint $table) {
            $table->dropColumn(['section_label_en', 'title_en', 'title_highlight_en', 'description_en']);
        });

        Schema::table('footer_contents', function (Blueprint $table) {
            $table->dropColumn(['tagline_en', 'description_en', 'copyright_text_en']);
        });

        Schema::table('service_categories', function (Blueprint $table) {
            $table->dropColumn('title_en');
        });

        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn(['name_en', 'description_en']);
        });
    }
};
