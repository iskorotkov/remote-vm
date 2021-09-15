/**
 * The KeysSshKeyIdentifierBody model module.
 * @module model/KeysSshKeyIdentifierBody
 * @version 2.0
 */
export class KeysSshKeyIdentifierBody {
    /**
     * Constructs a <code>KeysSshKeyIdentifierBody</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/KeysSshKeyIdentifierBody} obj Optional instance to populate.
     * @return {module:model/KeysSshKeyIdentifierBody} The populated <code>KeysSshKeyIdentifierBody</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {module:model/SshKeyName} name
     */
    name: any;
}
