/**
 * The Certificate model module.
 * @module model/Certificate
 * @version 2.0
 */
export class Certificate {
    /**
     * Constructs a <code>Certificate</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Certificate} obj Optional instance to populate.
     * @return {module:model/Certificate} The populated <code>Certificate</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * A unique ID that can be used to identify and reference a certificate.
     * @member {String} id
     */
    id: any;
    /**
     * A unique human-readable name referring to a certificate.
     * @member {String} name
     */
    name: any;
    /**
     * A time value given in ISO8601 combined date and time format that represents the certificate's expiration date.
     * @member {Date} notAfter
     */
    notAfter: any;
    /**
     * A unique identifier generated from the SHA-1 fingerprint of the certificate.
     * @member {String} sha1Fingerprint
     */
    sha1Fingerprint: any;
    /**
     * A time value given in ISO8601 combined date and time format that represents when the certificate was created.
     * @member {Date} createdAt
     */
    createdAt: any;
    /**
     * An array of fully qualified domain names (FQDNs) for which the certificate was issued.
     * @member {Array.<String>} dnsNames
     */
    dnsNames: any;
    /**
     * A string representing the current state of the certificate. It may be `pending`, `verified`, or `error`.
     * @member {module:model/Certificate.StateEnum} state
     */
    state: any;
    /**
     * A string representing the type of the certificate. The value will be `custom` for a user-uploaded certificate or `lets_encrypt` for one automatically generated with Let's Encrypt.
     * @member {module:model/Certificate.TypeEnum} type
     */
    type: any;
}
export namespace Certificate {
    namespace StateEnum {
        const pending: string;
        const verified: string;
        const error: string;
    }
    /**
     * *
     */
    type StateEnum = string;
    namespace TypeEnum {
        const custom: string;
        const letsEncrypt: string;
    }
    /**
     * *
     */
    type TypeEnum = string;
}
