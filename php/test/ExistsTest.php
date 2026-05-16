<?php
declare(strict_types=1);

// TiktokEngagementBot SDK exists test

require_once __DIR__ . '/../tiktokengagementbot_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = TiktokEngagementBotSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
