/**
 * The SubscriptionTierBase model module.
 * @module model/SubscriptionTierBase
 * @version 2.0
 */
export class SubscriptionTierBase {
    /**
     * Constructs a <code>SubscriptionTierBase</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SubscriptionTierBase} obj Optional instance to populate.
     * @return {module:model/SubscriptionTierBase} The populated <code>SubscriptionTierBase</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * The name of the subscription tier.
     * @member {String} name
     */
    name: any;
    /**
     * The slug identifier of the subscription tier.
     * @member {String} slug
     */
    slug: any;
    /**
     * The number of repositories included in the subscription tier. `0` indicates that the subscription tier includes unlimited repositories.
     * @member {Number} includedRepositories
     */
    includedRepositories: any;
    /**
     * The amount of storage included in the subscription tier in bytes.
     * @member {Number} includedStorageBytes
     */
    includedStorageBytes: any;
    /**
     * A boolean indicating whether the subscription tier supports additional storage above what is included in the base plan at an additional cost per GiB used.
     * @member {Boolean} allowStorageOverage
     */
    allowStorageOverage: any;
    /**
     * The amount of outbound data transfer included in the subscription tier in bytes.
     * @member {Number} includedBandwidthBytes
     */
    includedBandwidthBytes: any;
    /**
     * The monthly cost of the subscription tier in cents.
     * @member {Number} monthlyPriceInCents
     */
    monthlyPriceInCents: any;
}
