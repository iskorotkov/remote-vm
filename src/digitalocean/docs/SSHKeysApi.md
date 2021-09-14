# DigitalOceanApi.SSHKeysApi

All URIs are relative to *https://api.digitalocean.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createSshKey**](SSHKeysApi.md#createSshKey) | **POST** /v2/account/keys | Create a New SSH Key
[**destroySshKey**](SSHKeysApi.md#destroySshKey) | **DELETE** /v2/account/keys/{ssh_key_identifier} | Delete an SSH Key
[**getSshKey**](SSHKeysApi.md#getSshKey) | **GET** /v2/account/keys/{ssh_key_identifier} | Retrieve an Existing SSH Key
[**listAllKeys**](SSHKeysApi.md#listAllKeys) | **GET** /v2/account/keys | List All SSH Keys
[**updateSshKey**](SSHKeysApi.md#updateSshKey) | **PUT** /v2/account/keys/{ssh_key_identifier} | Update an SSH Key&#x27;s Name

<a name="createSshKey"></a>
# **createSshKey**
> InlineResponse201 createSshKey(body)

Create a New SSH Key

To add a new SSH public key to your DigitalOcean account, send a POST request to &#x60;/v2/account/keys&#x60;. Set the &#x60;name&#x60; attribute to the name you wish to use and the &#x60;public_key&#x60; attribute to the full public key you are adding.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.SSHKeysApi();
let body = new DigitalOceanApi.SshKey(); // SshKey | 

apiInstance.createSshKey(body, (error, data, response) => {
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
 **body** | [**SshKey**](SshKey.md)|  | 

### Return type

[**InlineResponse201**](InlineResponse201.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="destroySshKey"></a>
# **destroySshKey**
> destroySshKey(sshKeyIdentifier)

Delete an SSH Key

To destroy a public SSH key that you have in your account, send a DELETE request to &#x60;/v2/account/keys/$KEY_ID&#x60; or &#x60;/v2/account/keys/$KEY_FINGERPRINT&#x60;. A 204 status will be returned, indicating that the action was successful and that the response body is empty.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.SSHKeysApi();
let sshKeyIdentifier = new DigitalOceanApi.SshKeyIdentifier(); // SshKeyIdentifier | Either the ID or the fingerprint of an existing SSH key.

apiInstance.destroySshKey(sshKeyIdentifier, (error, data, response) => {
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
 **sshKeyIdentifier** | [**SshKeyIdentifier**](.md)| Either the ID or the fingerprint of an existing SSH key. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getSshKey"></a>
# **getSshKey**
> InlineResponse201 getSshKey(sshKeyIdentifier)

Retrieve an Existing SSH Key

To get information about a key, send a GET request to &#x60;/v2/account/keys/$KEY_ID&#x60; or &#x60;/v2/account/keys/$KEY_FINGERPRINT&#x60;. The response will be a JSON object with the key &#x60;ssh_key&#x60; and value an ssh_key object which contains the standard ssh_key attributes.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.SSHKeysApi();
let sshKeyIdentifier = new DigitalOceanApi.SshKeyIdentifier(); // SshKeyIdentifier | Either the ID or the fingerprint of an existing SSH key.

apiInstance.getSshKey(sshKeyIdentifier, (error, data, response) => {
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
 **sshKeyIdentifier** | [**SshKeyIdentifier**](.md)| Either the ID or the fingerprint of an existing SSH key. | 

### Return type

[**InlineResponse201**](InlineResponse201.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listAllKeys"></a>
# **listAllKeys**
> InlineResponse2003 listAllKeys(opts)

List All SSH Keys

To list all of the keys in your account, send a GET request to &#x60;/v2/account/keys&#x60;. The response will be a JSON object with a key set to &#x60;ssh_keys&#x60;. The value of this will be an array of ssh_key objects, each of which contains the standard ssh_key attributes.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.SSHKeysApi();
let opts = { 
  'perPage': 20, // Number | Number of items returned per page
  'page': 1 // Number | Which 'page' of paginated results to return.
};
apiInstance.listAllKeys(opts, (error, data, response) => {
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

[**InlineResponse2003**](InlineResponse2003.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="updateSshKey"></a>
# **updateSshKey**
> InlineResponse201 updateSshKey(body, sshKeyIdentifier)

Update an SSH Key&#x27;s Name

To update the name of an SSH key, send a PUT request to either &#x60;/v2/account/keys/$SSH_KEY_ID&#x60; or &#x60;/v2/account/keys/$SSH_KEY_FINGERPRINT&#x60;. Set the &#x60;name&#x60; attribute to the new name you want to use.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.SSHKeysApi();
let body = new DigitalOceanApi.KeysSshKeyIdentifierBody(); // KeysSshKeyIdentifierBody | Set the `name` attribute to the new name you want to use.
let sshKeyIdentifier = new DigitalOceanApi.SshKeyIdentifier(); // SshKeyIdentifier | Either the ID or the fingerprint of an existing SSH key.

apiInstance.updateSshKey(body, sshKeyIdentifier, (error, data, response) => {
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
 **body** | [**KeysSshKeyIdentifierBody**](KeysSshKeyIdentifierBody.md)| Set the &#x60;name&#x60; attribute to the new name you want to use. | 
 **sshKeyIdentifier** | [**SshKeyIdentifier**](.md)| Either the ID or the fingerprint of an existing SSH key. | 

### Return type

[**InlineResponse201**](InlineResponse201.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

