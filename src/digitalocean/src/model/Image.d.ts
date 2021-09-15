/**
 * The Image model module.
 * @module model/Image
 * @version 2.0
 */
export class Image {
    /**
     * Constructs a <code>Image</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Image} obj Optional instance to populate.
     * @return {module:model/Image} The populated <code>Image</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * A unique number that can be used to identify and reference a specific image.
     * @member {Number} id
     */
    id: any;
    /**
     * @member {module:model/ImageName} name
     */
    name: any;
    /**
     * Describes the kind of image. It may be one of \"snapshot\", \"backup\", or \"custom\". This specifies whether an image is a user-generated Droplet snapshot, automatically created Droplet backup, or a user-provided virtual machine image.
     * @member {module:model/Image.TypeEnum} type
     */
    type: any;
    /**
     * @member {module:model/Distribution} distribution
     */
    distribution: any;
    /**
     * A uniquely identifying string that is associated with each of the DigitalOcean-provided public images. These can be used to reference a public image as an alternative to the numeric id.
     * @member {String} slug
     */
    slug: any;
    /**
     * This is a boolean value that indicates whether the image in question is public or not. An image that is public is available to all accounts. A non-public image is only accessible from your account.
     * @member {Boolean} _public
     */
    _public: any;
    /**
     * @member {module:model/RegionsArray} regions
     */
    regions: any;
    /**
     * A time value given in ISO8601 combined date and time format that represents when the image was created.
     * @member {Date} createdAt
     */
    createdAt: any;
    /**
     * The minimum disk size in GB required for a Droplet to use this image.
     * @member {Number} minDiskSize
     */
    minDiskSize: any;
    /**
     * The size of the image in gigabytes.
     * @member {Number} sizeGigabytes
     */
    sizeGigabytes: any;
    /**
     * @member {module:model/ImageDescription} description
     */
    description: any;
    /**
     * @member {module:model/TagsArray} tags
     */
    tags: any;
    /**
     * A status string indicating the state of a custom image. This may be `NEW`,  `available`, `pending`, `deleted`, or `retired`.
     * @member {module:model/Image.StatusEnum} status
     */
    status: any;
    /**
     * A string containing information about errors that may occur when importing  a custom image.
     * @member {String} errorMessage
     */
    errorMessage: any;
}
export namespace Image {
    namespace TypeEnum {
        const base: string;
        const snapshot: string;
        const backup: string;
        const custom: string;
    }
    /**
     * *
     */
    type TypeEnum = string;
    namespace StatusEnum {
        const NEW: string;
        const _new: string;
        const available: string;
        const pending: string;
        const deleted: string;
        const retired: string;
    }
    /**
     * *
     */
    type StatusEnum = string;
}
