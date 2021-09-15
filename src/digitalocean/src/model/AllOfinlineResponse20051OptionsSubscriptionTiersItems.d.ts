/**
 * The AllOfinlineResponse20051OptionsSubscriptionTiersItems model module.
 * @module model/AllOfinlineResponse20051OptionsSubscriptionTiersItems
 * @version 2.0
 */
export class AllOfinlineResponse20051OptionsSubscriptionTiersItems extends SubscriptionTierBase {
    /**
     * A boolean indicating whether your account it eligible to use a certain subscription tier.
     * @member {Boolean} eligible
     */
    eligible: any;
    /**
     * If your account is not eligible to use a certain subscription tier, this will include a list of reasons that prevent you from using the tier.
     * @member {Array.<module:model/AllOfinlineResponse20051OptionsSubscriptionTiersItems.EligibilityReasonsEnum>} eligibilityReasons
     */
    eligibilityReasons: any;
}
export namespace AllOfinlineResponse20051OptionsSubscriptionTiersItems {
    namespace EligibilityReasonsEnum {
        const overRepositoryLimit: string;
        const overStorageLimit: string;
    }
    /**
     * *
     */
    type EligibilityReasonsEnum = string;
}
import { SubscriptionTierBase } from "./SubscriptionTierBase";
