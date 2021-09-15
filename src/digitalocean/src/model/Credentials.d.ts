/**
 * The Credentials model module.
 * @module model/Credentials
 * @version 2.0
 */
export class Credentials {
    /**
     * Constructs a <code>Credentials</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Credentials} obj Optional instance to populate.
     * @return {module:model/Credentials} The populated <code>Credentials</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * The URL used to access the cluster API server.
     * @member {String} server
     */
    server: any;
    /**
     * A base64 encoding of bytes representing the certificate authority data for accessing the cluster.
     * @member {Blob} certificateAuthorityData
     */
    certificateAuthorityData: any;
    /**
     * A base64 encoding of bytes representing the x509 client certificate data for access the cluster. This is only returned for clusters without support for token-based authentication.  Newly created Kubernetes clusters do not return credentials using certificate-based authentication. For additional information, [see here](https://www.digitalocean.com/docs/kubernetes/how-to/connect-to-cluster/#authenticate).
     * @member {Blob} clientCertificateData
     */
    clientCertificateData: any;
    /**
     * A base64 encoding of bytes representing the x509 client key data for access the cluster. This is only returned for clusters without support for token-based authentication.  Newly created Kubernetes clusters do not return credentials using certificate-based authentication. For additional information, [see here](https://www.digitalocean.com/docs/kubernetes/how-to/connect-to-cluster/#authenticate).
     * @member {Blob} clientKeyData
     */
    clientKeyData: any;
    /**
     * An access token used to authenticate with the cluster. This is only returned for clusters with support for token-based authentication.
     * @member {String} token
     */
    token: any;
    /**
     * A time value given in ISO8601 combined date and time format that represents when the access token expires.
     * @member {Date} expiresAt
     */
    expiresAt: any;
}
