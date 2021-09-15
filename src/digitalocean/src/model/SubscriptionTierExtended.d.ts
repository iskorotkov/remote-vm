/**
 * The SubscriptionTierExtended model module.
 * @module model/SubscriptionTierExtended
 * @version 2.0
 */
export class SubscriptionTierExtended {
    /**
     * Constructs a <code>SubscriptionTierExtended</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SubscriptionTierExtended} obj Optional instance to populate.
     * @return {module:model/SubscriptionTierExtended} The populated <code>SubscriptionTierExtended</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * A boolean indicating whether your account it eligible to use a certain subscription tier.
     * @member {Boolean} eligible
     */
    eligible: any;
    /**
     * If your account is not eligible to use a certain subscription tier, this will include a list of reasons that prevent you from using the tier.
     * @member {Array.<module:model/SubscriptionTierExtended.EligibilityReasonsEnum>} eligibilityReasons
     */
    eligibilityReasons: any;
}
export namespace SubscriptionTierExtended {
    namespace EligibilityReasonsEnum {
        const overRepositoryLimit: string;
        const overStorageLimit: string;
    }
    /**
     * *
     */
    type EligibilityReasonsEnum = string;
}
