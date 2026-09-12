import { TiktokEngagementBotEntityBase } from '../TiktokEngagementBotEntityBase';
import type { TiktokEngagementBotSDK } from '../TiktokEngagementBotSDK';
import type { Control } from '../types';
import type { Engagement, EngagementCreateData } from '../TiktokEngagementBotTypes';
declare class EngagementEntity extends TiktokEngagementBotEntityBase<Engagement> {
    constructor(client: TiktokEngagementBotSDK, entopts: any);
    make(this: EngagementEntity): EngagementEntity;
    create(this: any, reqdata?: EngagementCreateData, ctrl?: Control): Promise<EngagementEntity>;
}
export { EngagementEntity };
