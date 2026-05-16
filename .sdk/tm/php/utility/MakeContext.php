<?php
declare(strict_types=1);

// TiktokEngagementBot SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class TiktokEngagementBotMakeContext
{
    public static function call(array $ctxmap, ?TiktokEngagementBotContext $basectx): TiktokEngagementBotContext
    {
        return new TiktokEngagementBotContext($ctxmap, $basectx);
    }
}
