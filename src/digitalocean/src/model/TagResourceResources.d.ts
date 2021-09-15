/**
 * The TagResourceResources model module.
 * @module model/TagResourceResources
 * @version 2.0
 */
export class TagResourceResources {
    /**
     * Constructs a <code>TagResourceResources</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TagResourceResources} obj Optional instance to populate.
     * @return {module:model/TagResourceResources} The populated <code>TagResourceResources</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * The identifier of a resource.
     * @member {String} resourceId
     */
    resourceId: any;
    /**
     * The type of the resource.
     * @member {module:model/TagResourceResources.ResourceTypeEnum} resourceType
     */
    resourceType: any;
}
export namespace TagResourceResources {
    namespace ResourceTypeEnum {
        const droplet: string;
        const image: string;
        const volume: string;
        const volumeSnapshot: string;
    }
    /**
     * *
     */
    type ResourceTypeEnum = string;
}
