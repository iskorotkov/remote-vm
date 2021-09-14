# DigitalOceanApi.DomainRecordsApi

All URIs are relative to *https://api.digitalocean.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createDomainRecord**](DomainRecordsApi.md#createDomainRecord) | **POST** /v2/domains/{domain_name}/records | Create a New Domain Record
[**deleteDomainRecord**](DomainRecordsApi.md#deleteDomainRecord) | **DELETE** /v2/domains/{domain_name}/records/{domain_record_id} | Delete a Domain Record
[**getDomainRecord**](DomainRecordsApi.md#getDomainRecord) | **GET** /v2/domains/{domain_name}/records/{domain_record_id} | Retrieve an Existing Domain Record
[**listAllDomainRecords**](DomainRecordsApi.md#listAllDomainRecords) | **GET** /v2/domains/{domain_name}/records | List All Domain Records
[**patchUpdateDomainRecord**](DomainRecordsApi.md#patchUpdateDomainRecord) | **PATCH** /v2/domains/{domain_name}/records/{domain_record_id} | Update a Domain Record
[**updateDomainRecord**](DomainRecordsApi.md#updateDomainRecord) | **PUT** /v2/domains/{domain_name}/records/{domain_record_id} | Update a Domain Record

<a name="createDomainRecord"></a>
# **createDomainRecord**
> InlineResponse2019 createDomainRecord(domainName, opts)

Create a New Domain Record

To create a new record to a domain, send a POST request to &#x60;/v2/domains/$DOMAIN_NAME/records&#x60;.  The request must include all of the required fields for the domain record type being added.  See the [attribute table](#tag/Domain-Records) for details regarding record types and their respective required attributes. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DomainRecordsApi();
let domainName = "domainName_example"; // String | The name of the domain itself.
let opts = { 
  'body': new DigitalOceanApi.DomainNameRecordsBody() // DomainNameRecordsBody | 
};
apiInstance.createDomainRecord(domainName, opts, (error, data, response) => {
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
 **domainName** | **String**| The name of the domain itself. | 
 **body** | [**DomainNameRecordsBody**](DomainNameRecordsBody.md)|  | [optional] 

### Return type

[**InlineResponse2019**](InlineResponse2019.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteDomainRecord"></a>
# **deleteDomainRecord**
> deleteDomainRecord(domainName, domainRecordId)

Delete a Domain Record

To delete a record for a domain, send a DELETE request to &#x60;/v2/domains/$DOMAIN_NAME/records/$DOMAIN_RECORD_ID&#x60;.  The record will be deleted and the response status will be a 204. This indicates a successful request with no body returned. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DomainRecordsApi();
let domainName = "domainName_example"; // String | The name of the domain itself.
let domainRecordId = 56; // Number | The unique identifier of the domain record.

apiInstance.deleteDomainRecord(domainName, domainRecordId, (error, data, response) => {
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
 **domainName** | **String**| The name of the domain itself. | 
 **domainRecordId** | **Number**| The unique identifier of the domain record. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getDomainRecord"></a>
# **getDomainRecord**
> InlineResponse20021 getDomainRecord(domainName, domainRecordId)

Retrieve an Existing Domain Record

To retrieve a specific domain record, send a GET request to &#x60;/v2/domains/$DOMAIN_NAME/records/$RECORD_ID&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DomainRecordsApi();
let domainName = "domainName_example"; // String | The name of the domain itself.
let domainRecordId = 56; // Number | The unique identifier of the domain record.

apiInstance.getDomainRecord(domainName, domainRecordId, (error, data, response) => {
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
 **domainName** | **String**| The name of the domain itself. | 
 **domainRecordId** | **Number**| The unique identifier of the domain record. | 

### Return type

[**InlineResponse20021**](InlineResponse20021.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listAllDomainRecords"></a>
# **listAllDomainRecords**
> InlineResponse20020 listAllDomainRecords(domainName, opts)

List All Domain Records

To get a listing of all records configured for a domain, send a GET request to &#x60;/v2/domains/$DOMAIN_NAME/records&#x60;. The list of records returned can be filtered by using the &#x60;name&#x60; and &#x60;type&#x60; query parameters. For example, to only include A records for a domain, send a GET request to &#x60;/v2/domains/$DOMAIN_NAME/records?type&#x3D;A&#x60;. &#x60;name&#x60; must be a fully qualified record name. For example, to only include records matching &#x60;sub.example.com&#x60;, send a GET request to &#x60;/v2/domains/$DOMAIN_NAME/records?name&#x3D;sub.example.com&#x60;. Both name and type may be used together.  

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DomainRecordsApi();
let domainName = "domainName_example"; // String | The name of the domain itself.
let opts = { 
  'name': "name_example", // String | A fully qualified record name. For example, to only include records matching sub.example.com, send a GET request to `/v2/domains/$DOMAIN_NAME/records?name=sub.example.com`.
  'type': "type_example" // String | The type of the DNS record. For example: A, CNAME, TXT, ...
};
apiInstance.listAllDomainRecords(domainName, opts, (error, data, response) => {
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
 **domainName** | **String**| The name of the domain itself. | 
 **name** | **String**| A fully qualified record name. For example, to only include records matching sub.example.com, send a GET request to &#x60;/v2/domains/$DOMAIN_NAME/records?name&#x3D;sub.example.com&#x60;. | [optional] 
 **type** | **String**| The type of the DNS record. For example: A, CNAME, TXT, ... | [optional] 

### Return type

[**InlineResponse20020**](InlineResponse20020.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="patchUpdateDomainRecord"></a>
# **patchUpdateDomainRecord**
> InlineResponse20021 patchUpdateDomainRecord(domainName, domainRecordId, opts)

Update a Domain Record

To update an existing record, send a PATCH request to &#x60;/v2/domains/$DOMAIN_NAME/records/$DOMAIN_RECORD_ID&#x60;. Any attribute valid for the record type can be set to a new value for the record.  See the [attribute table](#tag/Domain-Records) for details regarding record types and their respective attributes. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DomainRecordsApi();
let domainName = "domainName_example"; // String | The name of the domain itself.
let domainRecordId = 56; // Number | The unique identifier of the domain record.
let opts = { 
  'body': new DigitalOceanApi.DomainRecord() // DomainRecord | 
};
apiInstance.patchUpdateDomainRecord(domainName, domainRecordId, opts, (error, data, response) => {
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
 **domainName** | **String**| The name of the domain itself. | 
 **domainRecordId** | **Number**| The unique identifier of the domain record. | 
 **body** | [**DomainRecord**](DomainRecord.md)|  | [optional] 

### Return type

[**InlineResponse20021**](InlineResponse20021.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="updateDomainRecord"></a>
# **updateDomainRecord**
> InlineResponse20021 updateDomainRecord(domainName, domainRecordId, opts)

Update a Domain Record

To update an existing record, send a PUT request to &#x60;/v2/domains/$DOMAIN_NAME/records/$DOMAIN_RECORD_ID&#x60;. Any attribute valid for the record type can be set to a new value for the record.  See the [attribute table](#tag/Domain-Records) for details regarding record types and their respective attributes. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DomainRecordsApi();
let domainName = "domainName_example"; // String | The name of the domain itself.
let domainRecordId = 56; // Number | The unique identifier of the domain record.
let opts = { 
  'body': new DigitalOceanApi.DomainRecord() // DomainRecord | 
};
apiInstance.updateDomainRecord(domainName, domainRecordId, opts, (error, data, response) => {
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
 **domainName** | **String**| The name of the domain itself. | 
 **domainRecordId** | **Number**| The unique identifier of the domain record. | 
 **body** | [**DomainRecord**](DomainRecord.md)|  | [optional] 

### Return type

[**InlineResponse20021**](InlineResponse20021.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

