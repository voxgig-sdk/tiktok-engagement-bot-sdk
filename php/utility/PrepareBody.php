<?php
declare(strict_types=1);

// TiktokEngagementBot SDK utility: prepare_body

class TiktokEngagementBotPrepareBody
{
    public static function call(TiktokEngagementBotContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
