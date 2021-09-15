/**
 * The CertificateRequestLetsEncrypt model module.
 * @module model/CertificateRequestLetsEncrypt
 * @version 2.0
 */
export class CertificateRequestLetsEncrypt extends CertificateCreateBase {
    /**
     * Constructs a new <code>CertificateRequestLetsEncrypt</code>.
     * @alias module:model/CertificateRequestLetsEncrypt
     * @class
     * @extends module:model/CertificateCreateBase
     * @param name {} A unique human-readable name referring to a certificate.
     * @param dnsNames {} An array of fully qualified domain names (FQDNs) for which the certificate was issued.
     */
    constructor(name: any, dnsNames: any);
    dnsNames: any;
}
import { CertificateCreateBase } from "./CertificateCreateBase";
