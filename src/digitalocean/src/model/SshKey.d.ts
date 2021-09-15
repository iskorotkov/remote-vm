/**
 * The SshKey model module.
 * @module model/SshKey
 * @version 2.0
 */
export class SshKey {
    /**
     * Constructs a <code>SshKey</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SshKey} obj Optional instance to populate.
     * @return {module:model/SshKey} The populated <code>SshKey</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>SshKey</code>.
     * @alias module:model/SshKey
     * @class
     * @param publicKey {String} The entire public key string that was uploaded. Embedded into the root user's `authorized_keys` file if you include this key during Droplet creation.
     * @param name {module:model/SshKeyName}
     */
    constructor(publicKey: string, name: any);
    publicKey: string;
    name: any;
    /**
     * @member {module:model/SshKeyId} id
     */
    id: any;
    /**
     * @member {module:model/SshKeyFingerprint} fingerprint
     */
    fingerprint: any;
}
