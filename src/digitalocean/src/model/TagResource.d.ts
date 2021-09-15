/**
 * The TagResource model module.
 * @module model/TagResource
 * @version 2.0
 */
export class TagResource {
    /**
     * Constructs a <code>TagResource</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TagResource} obj Optional instance to populate.
     * @return {module:model/TagResource} The populated <code>TagResource</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>TagResource</code>.
     * @alias module:model/TagResource
     * @class
     * @param resources {Array.<module:model/TagResourceResources>} An array of objects containing resource_id and resource_type  attributes.
     */
    constructor(resources: Array<NodeModule>);
    resources: NodeModule[];
}
