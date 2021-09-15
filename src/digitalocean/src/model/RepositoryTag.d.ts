/**
 * The RepositoryTag model module.
 * @module model/RepositoryTag
 * @version 2.0
 */
export class RepositoryTag {
    /**
     * Constructs a <code>RepositoryTag</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/RepositoryTag} obj Optional instance to populate.
     * @return {module:model/RepositoryTag} The populated <code>RepositoryTag</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * The name of the container registry.
     * @member {String} registryName
     */
    registryName: any;
    /**
     * The name of the repository.
     * @member {String} repositoryName
     */
    repositoryName: any;
    /**
     * The name of the tag.
     * @member {String} tag
     */
    tag: any;
    /**
     * The digest of the manifest associated with the tag.
     * @member {String} manifestDigest
     */
    manifestDigest: any;
    /**
     * The compressed size of the tag in bytes.
     * @member {Number} compressedSizeBytes
     */
    compressedSizeBytes: any;
    /**
     * The uncompressed size of the tag in bytes (this size is calculated asynchronously so it may not be immediately available).
     * @member {Number} sizeBytes
     */
    sizeBytes: any;
    /**
     * The time the tag was last updated.
     * @member {Date} updatedAt
     */
    updatedAt: any;
}
