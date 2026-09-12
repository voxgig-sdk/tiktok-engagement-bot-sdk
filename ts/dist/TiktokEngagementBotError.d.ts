import { Context } from './Context';
declare class TiktokEngagementBotError extends Error {
    isTiktokEngagementBotError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { TiktokEngagementBotError };
