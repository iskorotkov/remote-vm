/**
 * The ResourceLinks model module.
 * @module model/ResourceLinks
 * @version 2.0
 */
export class ResourceLinks {
    /**
     * Constructs a <code>ResourceLinks</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ResourceLinks} obj Optional instance to populate.
     * @return {module:model/ResourceLinks} The populated <code>ResourceLinks</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * A URI that can be used to retrieve the resource.
     * @member {String} self
     */
    self: any;
}
