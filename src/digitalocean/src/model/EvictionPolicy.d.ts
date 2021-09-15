/**
 * The EvictionPolicy model module.
 * @module model/EvictionPolicy
 * @version 2.0
 */
export class EvictionPolicy {
    /**
     * Constructs a <code>EvictionPolicy</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/EvictionPolicy} obj Optional instance to populate.
     * @return {module:model/EvictionPolicy} The populated <code>EvictionPolicy</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>EvictionPolicy</code>.
     * @alias module:model/EvictionPolicy
     * @class
     * @param evictionPolicy {module:model/EvictionPolicy.EvictionPolicyEnum} A string specifying the desired eviction policy for the Redis cluster.
     */
    constructor(evictionPolicy: any);
    evictionPolicy: any;
}
export namespace EvictionPolicy {
    namespace EvictionPolicyEnum {
        const noeviction: string;
        const allkeysLru: string;
        const allkeysRandom: string;
        const volatileLru: string;
        const volatileRandom: string;
        const volatileTtl: string;
    }
    /**
     * *
     */
    type EvictionPolicyEnum = string;
}
