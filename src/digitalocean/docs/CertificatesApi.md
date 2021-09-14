# DigitalOceanApi.CertificatesApi

All URIs are relative to *https://api.digitalocean.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createCertificates**](CertificatesApi.md#createCertificates) | **POST** /v2/certificates | Create a New Certificate
[**deleteCertificate**](CertificatesApi.md#deleteCertificate) | **DELETE** /v2/certificates/{certificate_id} | Delete a Certificate
[**getCertificate**](CertificatesApi.md#getCertificate) | **GET** /v2/certificates/{certificate_id} | Retrieve an Existing Certificate
[**listCertificates**](CertificatesApi.md#listCertificates) | **GET** /v2/certificates | List All Certificates

<a name="createCertificates"></a>
# **createCertificates**
> InlineResponse2012 createCertificates(body)

Create a New Certificate

To upload new SSL certificate which you have previously generated, send a POST request to &#x60;/v2/certificates&#x60;.  When uploading a user-generated certificate, the &#x60;private_key&#x60;, &#x60;leaf_certificate&#x60;, and optionally the &#x60;certificate_chain&#x60; attributes should be provided. The type must be set to &#x60;custom&#x60;.  When using Let&#x27;s Encrypt to create a certificate, the &#x60;dns_names&#x60; attribute must be provided, and the type must be set to &#x60;lets_encrypt&#x60;. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.CertificatesApi();
let body = new DigitalOceanApi.V2CertificatesBody(); // V2CertificatesBody | 

apiInstance.createCertificates(body, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**V2CertificatesBody**](V2CertificatesBody.md)|  | 

### Return type

[**InlineResponse2012**](InlineResponse2012.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteCertificate"></a>
# **deleteCertificate**
> deleteCertificate(certificateId)

Delete a Certificate

To delete a specific certificate, send a DELETE request to &#x60;/v2/certificates/$CERTIFICATE_ID&#x60;. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.CertificatesApi();
let certificateId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a certificate.

apiInstance.deleteCertificate(certificateId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **certificateId** | [**String**](.md)| A unique identifier for a certificate. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getCertificate"></a>
# **getCertificate**
> InlineResponse2012 getCertificate(certificateId)

Retrieve an Existing Certificate

To show information about an existing certificate, send a GET request to &#x60;/v2/certificates/$CERTIFICATE_ID&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.CertificatesApi();
let certificateId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a certificate.

apiInstance.getCertificate(certificateId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **certificateId** | [**String**](.md)| A unique identifier for a certificate. | 

### Return type

[**InlineResponse2012**](InlineResponse2012.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listCertificates"></a>
# **listCertificates**
> InlineResponse2007 listCertificates(opts)

List All Certificates

To list all of the certificates available on your account, send a GET request to &#x60;/v2/certificates&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.CertificatesApi();
let opts = { 
  'perPage': 20, // Number | Number of items returned per page
  'page': 1 // Number | Which 'page' of paginated results to return.
};
apiInstance.listCertificates(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **perPage** | **Number**| Number of items returned per page | [optional] [default to 20]
 **page** | **Number**| Which &#x27;page&#x27; of paginated results to return. | [optional] [default to 1]

### Return type

[**InlineResponse2007**](InlineResponse2007.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

