/**
 * The DockerCredentialsAuthsRegistryDigitaloceanCom model module.
 * @module model/DockerCredentialsAuthsRegistryDigitaloceanCom
 * @version 2.0
 */
export class DockerCredentialsAuthsRegistryDigitaloceanCom {
    /**
     * Constructs a <code>DockerCredentialsAuthsRegistryDigitaloceanCom</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DockerCredentialsAuthsRegistryDigitaloceanCom} obj Optional instance to populate.
     * @return {module:model/DockerCredentialsAuthsRegistryDigitaloceanCom} The populated <code>DockerCredentialsAuthsRegistryDigitaloceanCom</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * A base64 encoded string containing credentials for the container registry.
     * @member {String} auth
     */
    auth: any;
}
