<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Rules\SafeLinkDestination;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;

class SafeLinkDestinationTest extends TestCase
{
    #[DataProvider('safeDestinations')]
    public function test_it_accepts_internal_and_http_destinations(string $destination): void
    {
        $failed = false;

        (new SafeLinkDestination)->validate('url', $destination, function () use (&$failed): void {
            $failed = true;
        });

        $this->assertFalse($failed);
    }

    #[DataProvider('unsafeDestinations')]
    public function test_it_rejects_unsafe_or_invalid_destinations(string $destination): void
    {
        $failed = false;

        (new SafeLinkDestination)->validate('url', $destination, function () use (&$failed): void {
            $failed = true;
        });

        $this->assertTrue($failed);
    }

    /** @return array<string, array{string}> */
    public static function safeDestinations(): array
    {
        return [
            'root' => ['/'],
            'relative path' => ['/services'],
            'fragment' => ['#contact'],
            'https' => ['https://example.com/page'],
            'http' => ['http://example.com/page'],
        ];
    }

    /** @return array<string, array{string}> */
    public static function unsafeDestinations(): array
    {
        return [
            'javascript' => ['javascript:alert(1)'],
            'data' => ['data:text/html,bad'],
            'protocol relative' => ['//evil.example'],
            'bare relative' => ['services'],
            'empty fragment' => ['#'],
        ];
    }
}
