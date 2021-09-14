# DigitalOceanApi.Credentials

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**server** | **String** | The URL used to access the cluster API server. | [optional] 
**certificateAuthorityData** | **Blob** | A base64 encoding of bytes representing the certificate authority data for accessing the cluster. | [optional] 
**clientCertificateData** | **Blob** | A base64 encoding of bytes representing the x509 client certificate data for access the cluster. This is only returned for clusters without support for token-based authentication.  Newly created Kubernetes clusters do not return credentials using certificate-based authentication. For additional information, [see here](https://www.digitalocean.com/docs/kubernetes/how-to/connect-to-cluster/#authenticate).  | [optional] 
**clientKeyData** | **Blob** | A base64 encoding of bytes representing the x509 client key data for access the cluster. This is only returned for clusters without support for token-based authentication.  Newly created Kubernetes clusters do not return credentials using certificate-based authentication. For additional information, [see here](https://www.digitalocean.com/docs/kubernetes/how-to/connect-to-cluster/#authenticate).  | [optional] 
**token** | **String** | An access token used to authenticate with the cluster. This is only returned for clusters with support for token-based authentication. | [optional] 
**expiresAt** | **Date** | A time value given in ISO8601 combined date and time format that represents when the access token expires. | [optional] 
