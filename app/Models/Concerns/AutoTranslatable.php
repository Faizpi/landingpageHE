<?php

declare(strict_types=1);

namespace App\Models\Concerns;

use App\Services\Translator;

/**
 * Mengisi kolom `*_en` secara otomatis dari padanan Bahasa Indonesia-nya
 * setiap kali record disimpan.
 *
 * Model yang memakai trait ini cukup mendeklarasikan properti:
 *
 *     protected array $translatable = ['title' => 'title_en'];
 *
 * Aturan:
 * - Kolom EN yang sudah diisi manual tidak akan ditimpa.
 * - Bila teks Indonesia diubah, terjemahan lama ikut diperbarui — kecuali admin
 *   telah menyunting kolom EN pada penyimpanan yang sama.
 * - Bila layanan terjemahan gagal, kolom EN dibiarkan kosong dan frontend
 *   otomatis memakai teks Bahasa Indonesia.
 */
trait AutoTranslatable
{
    public static function bootAutoTranslatable(): void
    {
        static::saving(function (self $model): void {
            $model->fillEnglishColumns();
        });
    }

    /** @return array<string, string> */
    public function translatableColumns(): array
    {
        /** @var array<string, string> */
        return property_exists($this, 'translatable') ? $this->translatable : [];
    }

    protected function fillEnglishColumns(): void
    {
        $pending = [];

        foreach ($this->translatableColumns() as $source => $target) {
            $sourceValue = $this->getAttribute($source);

            if (! is_string($sourceValue) || trim($sourceValue) === '') {
                continue;
            }

            if (! $this->shouldTranslateColumn($source, $target)) {
                continue;
            }

            $pending[$target] = $sourceValue;
        }

        if ($pending === []) {
            return;
        }

        foreach (app(Translator::class)->translateMany($pending) as $target => $value) {
            $this->setAttribute($target, $value);
        }
    }

    /**
     * Terjemahkan hanya bila kolom EN masih kosong, atau bila teks Indonesia
     * berubah tanpa disertai suntingan manual pada kolom EN.
     */
    private function shouldTranslateColumn(string $source, string $target): bool
    {
        $targetValue = $this->getAttribute($target);

        if (! is_string($targetValue) || trim($targetValue) === '') {
            return true;
        }

        if ($this->isDirty($target)) {
            return false;
        }

        return $this->isDirty($source);
    }
}
