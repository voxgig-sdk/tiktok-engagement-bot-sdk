<?php
declare(strict_types=1);

// TiktokEngagementBot SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class TiktokEngagementBotFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new TiktokEngagementBotBaseFeature();
            case "test":
                return new TiktokEngagementBotTestFeature();
            default:
                return new TiktokEngagementBotBaseFeature();
        }
    }
}
