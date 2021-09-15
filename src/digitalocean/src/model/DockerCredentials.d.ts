/**
 * The DockerCredentials model module.
 * @module model/DockerCredentials
 * @version 2.0
 */
export class DockerCredentials {
    /**
     * Constructs a <code>DockerCredentials</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DockerCredentials} obj Optional instance to populate.
     * @return {module:model/DockerCredentials} The populated <code>DockerCredentials</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {module:model/DockerCredentialsAuths} auths
     */
    auths: any;
}
