/**
 * The CertificateCreateBase model module.
 * @module model/CertificateCreateBase
 * @version 2.0
 */
export class CertificateCreateBase {
    /**
     * Constructs a <code>CertificateCreateBase</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CertificateCreateBase} obj Optional instance to populate.
     * @return {module:model/CertificateCreateBase} The populated <code>CertificateCreateBase</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>CertificateCreateBase</code>.
     * @alias module:model/CertificateCreateBase
     * @class
     * @param name {String} A unique human-readable name referring to a certificate.
     */
    constructor(name: string);
    name: string;
    /**
     * A string representing the type of the certificate. The value will be `custom` for a user-uploaded certificate or `lets_encrypt` for one automatically generated with Let's Encrypt.
     * @member {module:model/CertificateCreateBase.TypeEnum} type
     */
    type: any;
}
export namespace CertificateCreateBase {
    namespace TypeEnum {
        const custom: string;
        const letsEncrypt: string;
    }
    /**
     * *
     */
    type TypeEnum = string;
}
