/**
 * The CertificateRequestCustom model module.
 * @module model/CertificateRequestCustom
 * @version 2.0
 */
export class CertificateRequestCustom extends CertificateCreateBase {
    /**
     * Constructs a new <code>CertificateRequestCustom</code>.
     * @alias module:model/CertificateRequestCustom
     * @class
     * @extends module:model/CertificateCreateBase
     * @param name {} A unique human-readable name referring to a certificate.
     * @param privateKey {} The contents of a PEM-formatted private-key corresponding to the SSL certificate.
     * @param leafCertificate {} The contents of a PEM-formatted public SSL certificate.
     */
    constructor(name: any, privateKey: any, leafCertificate: any);
    privateKey: any;
    leafCertificate: any;
    /**
     * The full PEM-formatted trust chain between the certificate authority's certificate and your domain's SSL certificate.
     * @member {String} certificateChain
     */
    certificateChain: any;
}
import { CertificateCreateBase } from "./CertificateCreateBase";
