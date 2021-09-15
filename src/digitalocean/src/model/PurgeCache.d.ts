/**
 * The PurgeCache model module.
 * @module model/PurgeCache
 * @version 2.0
 */
export class PurgeCache {
    /**
     * Constructs a <code>PurgeCache</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/PurgeCache} obj Optional instance to populate.
     * @return {module:model/PurgeCache} The populated <code>PurgeCache</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>PurgeCache</code>.
     * @alias module:model/PurgeCache
     * @class
     * @param files {Array.<String>} An array of strings containing the path to the content to be purged from the CDN cache.
     */
    constructor(files: Array<string>);
    files: string[];
}
