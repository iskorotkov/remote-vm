# DigitalOceanApi.ImagesApi

All URIs are relative to *https://api.digitalocean.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createCustomImage**](ImagesApi.md#createCustomImage) | **POST** /v2/images | Create a Custom Image
[**deleteImage**](ImagesApi.md#deleteImage) | **DELETE** /v2/images/{image_id} | Delete an Image
[**getImage**](ImagesApi.md#getImage) | **GET** /v2/images/{image_id} | Retrieve an Existing Image
[**getImagesList**](ImagesApi.md#getImagesList) | **GET** /v2/images | List All Images
[**updateImage**](ImagesApi.md#updateImage) | **PUT** /v2/images/{image_id} | Update an Image

<a name="createCustomImage"></a>
# **createCustomImage**
> InlineResponse2023 createCustomImage(body)

Create a Custom Image

To create a new custom image, send a POST request to /v2/images. The body must contain a url attribute pointing to a Linux virtual machine image to be imported into DigitalOcean. The image must be in the raw, qcow2, vhdx, vdi, or vmdk format. It may be compressed using gzip or bzip2 and must be smaller than 100 GB after  being decompressed. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.ImagesApi();
let body = new DigitalOceanApi.ImageNewCustom(); // ImageNewCustom | 

apiInstance.createCustomImage(body, (error, data, response) => {
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
 **body** | [**ImageNewCustom**](ImageNewCustom.md)|  | 

### Return type

[**InlineResponse2023**](InlineResponse2023.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteImage"></a>
# **deleteImage**
> deleteImage(imageId)

Delete an Image

To delete a snapshot or custom image, send a &#x60;DELETE&#x60; request to &#x60;/v2/images/$IMAGE_ID&#x60;. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.ImagesApi();
let imageId = 56; // Number | A unique number that can be used to identify and reference a specific image.

apiInstance.deleteImage(imageId, (error, data, response) => {
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
 **imageId** | **Number**| A unique number that can be used to identify and reference a specific image. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getImage"></a>
# **getImage**
> InlineResponse20034 getImage(imageId)

Retrieve an Existing Image

To retrieve information about an image, send a &#x60;GET&#x60; request to &#x60;/v2/images/$IDENTIFIER&#x60;. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.ImagesApi();
let imageId = new DigitalOceanApi.ImageId(); // ImageId | A unique number (id) or string (slug) used to identify and reference a specific image.  **Public** images can be identified by image `id` or `slug`.  **Private** images *must* be identified by image `id`. 

apiInstance.getImage(imageId, (error, data, response) => {
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
 **imageId** | [**ImageId**](.md)| A unique number (id) or string (slug) used to identify and reference a specific image.  **Public** images can be identified by image &#x60;id&#x60; or &#x60;slug&#x60;.  **Private** images *must* be identified by image &#x60;id&#x60;.  | 

### Return type

[**InlineResponse20034**](InlineResponse20034.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getImagesList"></a>
# **getImagesList**
> InlineResponse20033 getImagesList(opts)

List All Images

To list all of the images available on your account, send a GET request to /v2/images.  ## Filtering Results -----  It&#x27;s possible to request filtered results by including certain query parameters.  **Image Type**  Either 1-Click Application or OS Distribution images can be filtered by using the &#x60;type&#x60; query parameter.  &gt; Important: The &#x60;type&#x60; query parameter does not directly relate to the &#x60;type&#x60; attribute.  To retrieve only ***distribution*** images, include the &#x60;type&#x60; query parameter set to distribution, &#x60;/v2/images?type&#x3D;distribution&#x60;.  To retrieve only ***application*** images, include the &#x60;type&#x60; query parameter set to application, &#x60;/v2/images?type&#x3D;application&#x60;.  **User Images**  To retrieve only the private images of a user, include the &#x60;private&#x60; query parameter set to true, &#x60;/v2/images?private&#x3D;true&#x60;.  **Tags**  To list all images assigned to a specific tag, include the &#x60;tag_name&#x60; query parameter set to the name of the tag in your GET request. For example, &#x60;/v2/images?tag_name&#x3D;$TAG_NAME&#x60;. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.ImagesApi();
let opts = { 
  'type': "type_example", // String | Filters results based on image type which can be either `application` or `distribution`.
  '_private': true, // Boolean | Used to filter only user images.
  'tagName': "tagName_example", // String | Used to filter images by a specific tag.
  'perPage': 20, // Number | Number of items returned per page
  'page': 1 // Number | Which 'page' of paginated results to return.
};
apiInstance.getImagesList(opts, (error, data, response) => {
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
 **type** | **String**| Filters results based on image type which can be either &#x60;application&#x60; or &#x60;distribution&#x60;. | [optional] 
 **_private** | **Boolean**| Used to filter only user images. | [optional] 
 **tagName** | **String**| Used to filter images by a specific tag. | [optional] 
 **perPage** | **Number**| Number of items returned per page | [optional] [default to 20]
 **page** | **Number**| Which &#x27;page&#x27; of paginated results to return. | [optional] [default to 1]

### Return type

[**InlineResponse20033**](InlineResponse20033.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="updateImage"></a>
# **updateImage**
> InlineResponse20034 updateImage(body, imageId)

Update an Image

To update an image, send a &#x60;PUT&#x60; request to &#x60;/v2/images/$IMAGE_ID&#x60;. Set the &#x60;name&#x60; attribute to the new value you would like to use. For custom images, the &#x60;description&#x60; and &#x60;distribution&#x60; attributes may also be updated. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.ImagesApi();
let body = new DigitalOceanApi.ImageUpdate(); // ImageUpdate | 
let imageId = 56; // Number | A unique number that can be used to identify and reference a specific image.

apiInstance.updateImage(body, imageId, (error, data, response) => {
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
 **body** | [**ImageUpdate**](ImageUpdate.md)|  | 
 **imageId** | **Number**| A unique number that can be used to identify and reference a specific image. | 

### Return type

[**InlineResponse20034**](InlineResponse20034.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

