/**
 * The Repository model module.
 * @module model/Repository
 * @version 2.0
 */
export class Repository {
    /**
     * Constructs a <code>Repository</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Repository} obj Optional instance to populate.
     * @return {module:model/Repository} The populated <code>Repository</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * The name of the container registry.
     * @member {String} registryName
     */
    registryName: any;
    /**
     * The name of the repository.
     * @member {String} name
     */
    name: any;
    /**
     * @member {module:model/RepositoryTag} latestTag
     */
    latestTag: any;
    /**
     * The number of tags in the repository.
     * @member {Number} tagCount
     */
    tagCount: any;
}
