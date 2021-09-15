/**
 * The RegistrySubscriptionBody model module.
 * @module model/RegistrySubscriptionBody
 * @version 2.0
 */
export class RegistrySubscriptionBody {
    /**
     * Constructs a <code>RegistrySubscriptionBody</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/RegistrySubscriptionBody} obj Optional instance to populate.
     * @return {module:model/RegistrySubscriptionBody} The populated <code>RegistrySubscriptionBody</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * The slug of the subscription tier to sign up for.
     * @member {module:model/RegistrySubscriptionBody.TierSlugEnum} tierSlug
     */
    tierSlug: any;
}
export namespace RegistrySubscriptionBody {
    namespace TierSlugEnum {
        const starter: string;
        const basic: string;
        const professional: string;
    }
    /**
     * *
     */
    type TierSlugEnum = string;
}
