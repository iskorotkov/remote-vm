/**
 * The RegionsArray model module.
 * @module model/RegionsArray
 * @version 2.0
 */
export class RegionsArray extends Array<any> {
    /**
     * Constructs a <code>RegionsArray</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/RegionsArray} obj Optional instance to populate.
     * @return {module:model/RegionsArray} The populated <code>RegionsArray</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>RegionsArray</code>.
     * This attribute is an array of the regions that the image is available in. The regions are represented by their identifying slug values.
     * @alias module:model/RegionsArray
     * @class
     * @extends Array
     */
    constructor();
}
