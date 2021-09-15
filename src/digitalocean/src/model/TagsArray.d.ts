/**
 * The TagsArray model module.
 * @module model/TagsArray
 * @version 2.0
 */
export class TagsArray extends Array<any> {
    /**
     * Constructs a <code>TagsArray</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TagsArray} obj Optional instance to populate.
     * @return {module:model/TagsArray} The populated <code>TagsArray</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>TagsArray</code>.
     * A flat array of tag names as strings to be applied to the resource. Tag names may be for either existing or new tags.
     * @alias module:model/TagsArray
     * @class
     * @extends Array
     */
    constructor();
}
