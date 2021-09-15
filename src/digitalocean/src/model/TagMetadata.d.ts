/**
 * The TagMetadata model module.
 * @module model/TagMetadata
 * @version 2.0
 */
export class TagMetadata {
    /**
     * Constructs a <code>TagMetadata</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TagMetadata} obj Optional instance to populate.
     * @return {module:model/TagMetadata} The populated <code>TagMetadata</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * The number of tagged objects for this type of resource.
     * @member {Number} count
     */
    count: any;
    /**
     * The URI for the last tagged object for this type of resource.
     * @member {String} lastTaggedUri
     */
    lastTaggedUri: any;
}
