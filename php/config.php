<?php
declare(strict_types=1);

// TiktokEngagementBot SDK configuration

class TiktokEngagementBotConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "TiktokEngagementBot",
                "slug" => "tiktok-engagement-bot",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://zefoy.com",
                "auth" => [
                    "prefix" => "",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "engagement" => [],
                ],
            ],
            "entity" => [
        'engagement' => [
          'fields' => [
            [
              'name' => 'action',
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$STRING`',
                ],
              ],
              'short' => 'Type of engagement requested',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'estimated_completion',
              'short' => 'Estimated time to complete the request',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'quantity',
              'short' => 'Number of engagements being processed',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'request_id',
              'short' => 'Unique identifier for tracking the request',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'url',
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$STRING`',
                ],
              ],
              'short' => 'Target TikTok URL',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'engagement',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/api/engagement',
                  'parts' => [
                    'api',
                    'engagement',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return TiktokEngagementBotFeatures::make_feature($name);
    }
}
