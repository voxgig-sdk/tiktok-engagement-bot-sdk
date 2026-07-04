<?php
declare(strict_types=1);

// TiktokEngagementBot SDK utility: make_error

require_once __DIR__ . '/../core/Operation.php';
require_once __DIR__ . '/../core/Result.php';
require_once __DIR__ . '/../core/Error.php';

class TiktokEngagementBotMakeError
{
    public static function call(?TiktokEngagementBotContext $ctx, mixed $err): mixed
    {
        if ($ctx === null) {
            require_once __DIR__ . '/../core/Context.php';
            $ctx = new TiktokEngagementBotContext([], null);
        }
        $op = $ctx->op ?? new TiktokEngagementBotOperation([]);
        $opname = $op->name;
        if ($opname === '' || $opname === '_') {
            $opname = 'unknown operation';
        }

        $result = $ctx->result ?? new TiktokEngagementBotResult([]);
        $result->ok = false;

        if ($err === null) {
            $err = $result->err;
        }
        if ($err === null) {
            $err = $ctx->make_error('unknown', 'unknown error');
        }

        $errmsg = ($err instanceof TiktokEngagementBotError) ? $err->msg : (string)$err;
        $msg = "TiktokEngagementBotSDK: {$opname}: {$errmsg}";
        $msg = ($ctx->utility->clean)($ctx, $msg);

        $result->err = null;
        $spec = $ctx->spec;

        if ($ctx->ctrl->explain) {
            $ctx->ctrl->explain['err'] = ['message' => $msg];
        }

        $sdk_err = new TiktokEngagementBotError('', $msg, $ctx);
        $sdk_err->result = ($ctx->utility->clean)($ctx, $result);
        $sdk_err->spec = ($ctx->utility->clean)($ctx, $spec);
        if ($err instanceof TiktokEngagementBotError) {
            $sdk_err->sdk_code = $err->sdk_code;
        }

        $ctx->ctrl->err = $sdk_err;

        if ($ctx->ctrl->throw_err === false) {
            return $result->resdata;
        }
        throw $sdk_err;
    }
}
