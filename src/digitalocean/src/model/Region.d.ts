/**
 * The Region model module.
 * @module model/Region
 * @version 2.0
 */
export class Region {
    /**
     * Constructs a <code>Region</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Region} obj Optional instance to populate.
     * @return {module:model/Region} The populated <code>Region</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>Region</code>.
     * @alias module:model/Region
     * @class
     * @param name {String} The display name of the region.  This will be a full name that is used in the control panel and other interfaces.
     * @param slug {String} A human-readable string that is used as a unique identifier for each region.
     * @param features {Array.<String>} This attribute is set to an array which contains features available in this region
     * @param available {Boolean} This is a boolean value that represents whether new Droplets can be created in this region.
     * @param sizes {Array.<String>} This attribute is set to an array which contains the identifying slugs for the sizes available in this region.
     */
    constructor(name: string, slug: string, features: Array<string>, available: boolean, sizes: Array<string>);
    name: string;
    slug: string;
    features: string[];
    available: boolean;
    sizes: string[];
}
