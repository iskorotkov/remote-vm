# DigitalOceanApi.TagsApi

All URIs are relative to *https://api.digitalocean.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createNewTag**](TagsApi.md#createNewTag) | **POST** /v2/tags | Create a New Tag
[**deleteTag**](TagsApi.md#deleteTag) | **DELETE** /v2/tags/{tag_id} | Delete a Tag
[**getTag**](TagsApi.md#getTag) | **GET** /v2/tags/{tag_id} | Retrieve a Tag
[**listAllTags**](TagsApi.md#listAllTags) | **GET** /v2/tags | List All Tags
[**tagResource**](TagsApi.md#tagResource) | **POST** /v2/tags/{tag_id}/resources | Tag a Resource
[**untagResource**](TagsApi.md#untagResource) | **DELETE** /v2/tags/{tag_id}/resources | Untag a Resource

<a name="createNewTag"></a>
# **createNewTag**
> InlineResponse20115 createNewTag(body)

Create a New Tag

To create a tag you can send a POST request to &#x60;/v2/tags&#x60; with a &#x60;name&#x60; attribute.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.TagsApi();
let body = new DigitalOceanApi.Tag(); // Tag | 

apiInstance.createNewTag(body, (error, data, response) => {
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
 **body** | [**Tag**](Tag.md)|  | 

### Return type

[**InlineResponse20115**](InlineResponse20115.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteTag"></a>
# **deleteTag**
> deleteTag(tagId)

Delete a Tag

A tag can be deleted by sending a &#x60;DELETE&#x60; request to &#x60;/v2/tags/$TAG_NAME&#x60;. Deleting a tag also untags all the resources that have previously been tagged by the Tag.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.TagsApi();
let tagId = "tagId_example"; // String | The name of the tag. Tags may contain letters, numbers, colons, dashes, and underscores. There is a limit of 255 characters per tag.

apiInstance.deleteTag(tagId, (error, data, response) => {
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
 **tagId** | **String**| The name of the tag. Tags may contain letters, numbers, colons, dashes, and underscores. There is a limit of 255 characters per tag. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getTag"></a>
# **getTag**
> InlineResponse20056 getTag(tagId)

Retrieve a Tag

To retrieve an individual tag, you can send a &#x60;GET&#x60; request to &#x60;/v2/tags/$TAG_NAME&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.TagsApi();
let tagId = "tagId_example"; // String | The name of the tag. Tags may contain letters, numbers, colons, dashes, and underscores. There is a limit of 255 characters per tag.

apiInstance.getTag(tagId, (error, data, response) => {
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
 **tagId** | **String**| The name of the tag. Tags may contain letters, numbers, colons, dashes, and underscores. There is a limit of 255 characters per tag. | 

### Return type

[**InlineResponse20056**](InlineResponse20056.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listAllTags"></a>
# **listAllTags**
> InlineResponse20055 listAllTags()

List All Tags

To list all of your tags, you can send a GET request to &#x60;/v2/tags&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.TagsApi();
apiInstance.listAllTags((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**InlineResponse20055**](InlineResponse20055.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="tagResource"></a>
# **tagResource**
> tagResource(body, tagId)

Tag a Resource

Resources can be tagged by sending a POST request to &#x60;/v2/tags/$TAG_NAME/resources&#x60; with an array of json objects containing &#x60;resource_id&#x60; and &#x60;resource_type&#x60; attributes. Currently only tagging of Droplets, Images, Volumes, and Volume Snapshots is supported. &#x60;resource_id&#x60; is expected to be the Droplet&#x27;s id, Image&#x27;s id, or Volume/Volume Snapshot&#x27;s UUID attribute as a string, and &#x60;resource_type&#x60; is expected to be the string &#x60;droplet&#x60;, &#x60;image&#x60;, &#x60;volume&#x60; or &#x60;volume_snapshot&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.TagsApi();
let body = new DigitalOceanApi.TagResource(); // TagResource | 
let tagId = "tagId_example"; // String | The name of the tag. Tags may contain letters, numbers, colons, dashes, and underscores. There is a limit of 255 characters per tag.

apiInstance.tagResource(body, tagId, (error, data, response) => {
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
 **body** | [**TagResource**](TagResource.md)|  | 
 **tagId** | **String**| The name of the tag. Tags may contain letters, numbers, colons, dashes, and underscores. There is a limit of 255 characters per tag. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="untagResource"></a>
# **untagResource**
> untagResource(body, tagId)

Untag a Resource

Resources can be tagged by sending a DELETE request to &#x60;/v2/tags/$TAG_NAME/resources&#x60; with an array of json objects containing &#x60;resource_id&#x60; and &#x60;resource_type&#x60; attributes. Currently only untagging of Droplets, Images, Volumes, and Volume Snapshots is supported. &#x60;resource_id&#x60; is expected to be the Droplet&#x27;s id, Image&#x27;s id, or Volume/Volume Snapshot&#x27;s UUID attribute as a string, and &#x60;resource_type&#x60; is expected to be the string &#x60;droplet&#x60;, &#x60;image&#x60;, &#x60;volume&#x60; or &#x60;volume_snapshot&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.TagsApi();
let body = new DigitalOceanApi.TagResource(); // TagResource | 
let tagId = "tagId_example"; // String | The name of the tag. Tags may contain letters, numbers, colons, dashes, and underscores. There is a limit of 255 characters per tag.

apiInstance.untagResource(body, tagId, (error, data, response) => {
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
 **body** | [**TagResource**](TagResource.md)|  | 
 **tagId** | **String**| The name of the tag. Tags may contain letters, numbers, colons, dashes, and underscores. There is a limit of 255 characters per tag. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

