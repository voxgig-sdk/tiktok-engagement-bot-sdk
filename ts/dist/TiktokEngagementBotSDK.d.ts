import { EngagementEntity } from './entity/EngagementEntity';
export type * from './TiktokEngagementBotTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { TiktokEngagementBotEntityBase } from './TiktokEngagementBotEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class TiktokEngagementBotSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Engagement(entopts?: Record<string, any>): EngagementEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): TiktokEngagementBotSDK;
    tester(testopts?: any, sdkopts?: any): TiktokEngagementBotSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof TiktokEngagementBotSDK;
export { stdutil, config, BaseFeature, TiktokEngagementBotEntityBase, TiktokEngagementBotSDK, SDK, };
