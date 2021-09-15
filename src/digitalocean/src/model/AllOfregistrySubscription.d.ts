/**
 * The AllOfregistrySubscription model module.
 * @module model/AllOfregistrySubscription
 * @version 2.0
 */
export class AllOfregistrySubscription {
    /**
     * Constructs a <code>AllOfregistrySubscription</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AllOfregistrySubscription} obj Optional instance to populate.
     * @return {module:model/AllOfregistrySubscription} The populated <code>AllOfregistrySubscription</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {module:model/SubscriptionTierBase} tier
     */
    tier: any;
    /**
     * The time at which the subscription was created.
     * @member {Date} createdAt
     */
    createdAt: any;
    /**
     * The time at which the subscription was last updated.
     * @member {Date} updatedAt
     */
    updatedAt: any;
}
