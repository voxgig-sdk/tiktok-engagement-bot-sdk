<?php
declare(strict_types=1);

// TiktokEngagementBot SDK base feature

class TiktokEngagementBotBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(TiktokEngagementBotContext $ctx, array $options): void {}
    public function PostConstruct(TiktokEngagementBotContext $ctx): void {}
    public function PostConstructEntity(TiktokEngagementBotContext $ctx): void {}
    public function SetData(TiktokEngagementBotContext $ctx): void {}
    public function GetData(TiktokEngagementBotContext $ctx): void {}
    public function GetMatch(TiktokEngagementBotContext $ctx): void {}
    public function SetMatch(TiktokEngagementBotContext $ctx): void {}
    public function PrePoint(TiktokEngagementBotContext $ctx): void {}
    public function PreSpec(TiktokEngagementBotContext $ctx): void {}
    public function PreRequest(TiktokEngagementBotContext $ctx): void {}
    public function PreResponse(TiktokEngagementBotContext $ctx): void {}
    public function PreResult(TiktokEngagementBotContext $ctx): void {}
    public function PreDone(TiktokEngagementBotContext $ctx): void {}
    public function PreUnexpected(TiktokEngagementBotContext $ctx): void {}
}
