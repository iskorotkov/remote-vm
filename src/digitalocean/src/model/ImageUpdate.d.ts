/**
 * The ImageUpdate model module.
 * @module model/ImageUpdate
 * @version 2.0
 */
export class ImageUpdate {
    /**
     * Constructs a <code>ImageUpdate</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ImageUpdate} obj Optional instance to populate.
     * @return {module:model/ImageUpdate} The populated <code>ImageUpdate</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {module:model/ImageName} name
     */
    name: any;
    /**
     * @member {module:model/Distribution} distribution
     */
    distribution: any;
    /**
     * @member {module:model/ImageDescription} description
     */
    description: any;
}
