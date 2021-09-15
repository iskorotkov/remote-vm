/**
 * The AppsImageSourceSpec model module.
 * @module model/AppsImageSourceSpec
 * @version 2.0
 */
export class AppsImageSourceSpec {
    /**
     * Constructs a <code>AppsImageSourceSpec</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppsImageSourceSpec} obj Optional instance to populate.
     * @return {module:model/AppsImageSourceSpec} The populated <code>AppsImageSourceSpec</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * The registry name. Must be left empty for the `DOCR` registry type.
     * @member {String} registry
     */
    registry: any;
    /**
     * - DOCKER_HUB: The DockerHub container registry type. - DOCR: The DigitalOcean container registry type.
     * @member {module:model/AppsImageSourceSpec.RegistryTypeEnum} registryType
     */
    registryType: any;
    /**
     * The repository name.
     * @member {String} repository
     */
    repository: any;
    /**
     * The repository tag. Defaults to `latest` if not provided.
     * @member {String} tag
     * @default 'latest'
     */
    tag: string;
}
export namespace AppsImageSourceSpec {
    namespace RegistryTypeEnum {
        const DOCKER_HUB: string;
        const DOCR: string;
    }
    /**
     * *
     */
    type RegistryTypeEnum = string;
}
