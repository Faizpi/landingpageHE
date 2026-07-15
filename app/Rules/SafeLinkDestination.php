<?php

declare(strict_types=1);

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class SafeLinkDestination implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (! is_string($value) || ! $this->isSafeDestination($value)) {
            $fail('The :attribute must be an internal path or fragment, or an HTTP(S) URL.');
        }
    }

    private function isSafeDestination(string $destination): bool
    {
        if (preg_match('/^\/[A-Za-z0-9\-._~!$&\'()*+,;=:@\/%?]*$/', $destination) === 1) {
            return ! str_starts_with($destination, '//');
        }

        if (preg_match('/^#[A-Za-z][A-Za-z0-9\-_:]*$/', $destination) === 1) {
            return true;
        }

        $scheme = parse_url($destination, PHP_URL_SCHEME);

        return in_array($scheme, ['http', 'https'], true)
            && filter_var($destination, FILTER_VALIDATE_URL) !== false;
    }
}
