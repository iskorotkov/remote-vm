/**
 * The RegistryCreate model module.
 * @module model/RegistryCreate
 * @version 2.0
 */
export class RegistryCreate {
    /**
     * Constructs a <code>RegistryCreate</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/RegistryCreate} obj Optional instance to populate.
     * @return {module:model/RegistryCreate} The populated <code>RegistryCreate</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>RegistryCreate</code>.
     * @alias module:model/RegistryCreate
     * @class
     * @param name {String} A globally unique name for the container registry. Must be lowercase and be composed only of numbers, letters and `-`, up to a limit of 63 characters.
     * @param subscriptionTierSlug {module:model/RegistryCreate.SubscriptionTierSlugEnum} The slug of the subscription tier to sign up for. Valid values can be retrieved using the options endpoint.
     */
    constructor(name: string, subscriptionTierSlug: any);
    name: string;
    subscriptionTierSlug: any;
}
export namespace RegistryCreate {
    namespace SubscriptionTierSlugEnum {
        const starter: string;
        const basic: string;
        const professional: string;
    }
    /**
     * *
     */
    type SubscriptionTierSlugEnum = string;
}
