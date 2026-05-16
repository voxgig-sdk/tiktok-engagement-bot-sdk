<?php
declare(strict_types=1);

// TiktokEngagementBot SDK utility: result_body

class TiktokEngagementBotResultBody
{
    public static function call(TiktokEngagementBotContext $ctx): ?TiktokEngagementBotResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
