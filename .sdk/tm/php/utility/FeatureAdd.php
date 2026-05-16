<?php
declare(strict_types=1);

// TiktokEngagementBot SDK utility: feature_add

class TiktokEngagementBotFeatureAdd
{
    public static function call(TiktokEngagementBotContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
