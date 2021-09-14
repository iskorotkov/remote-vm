# DigitalOceanApi.SnapshotsApi

All URIs are relative to *https://api.digitalocean.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**deleteSnapshot**](SnapshotsApi.md#deleteSnapshot) | **DELETE** /v2/snapshots/{snapshot_id} | Delete a Snapshot
[**getSnapshot**](SnapshotsApi.md#getSnapshot) | **GET** /v2/snapshots/{snapshot_id} | Retrieve an Existing Snapshot
[**listAllSnapshots**](SnapshotsApi.md#listAllSnapshots) | **GET** /v2/snapshots | List All Snapshots

<a name="deleteSnapshot"></a>
# **deleteSnapshot**
> deleteSnapshot(snapshotId)

Delete a Snapshot

Both Droplet and volume snapshots are managed through the &#x60;/v2/snapshots/&#x60; endpoint. To delete a snapshot, send a DELETE request to &#x60;/v2/snapshots/$SNAPSHOT_ID&#x60;.  A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.SnapshotsApi();
let snapshotId = new DigitalOceanApi.SnapshotId(); // SnapshotId | Either the ID of an existing snapshot. This will be an integer for a Droplet snapshot or a string for a volume snapshot.

apiInstance.deleteSnapshot(snapshotId, (error, data, response) => {
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
 **snapshotId** | [**SnapshotId**](.md)| Either the ID of an existing snapshot. This will be an integer for a Droplet snapshot or a string for a volume snapshot. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getSnapshot"></a>
# **getSnapshot**
> InlineResponse20054 getSnapshot(snapshotId)

Retrieve an Existing Snapshot

To retrieve information about a snapshot, send a GET request to &#x60;/v2/snapshots/$SNAPSHOT_ID&#x60;.  The response will be a JSON object with a key called &#x60;snapshot&#x60;. The value of this will be an snapshot object containing the standard snapshot attributes. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.SnapshotsApi();
let snapshotId = new DigitalOceanApi.SnapshotId(); // SnapshotId | Either the ID of an existing snapshot. This will be an integer for a Droplet snapshot or a string for a volume snapshot.

apiInstance.getSnapshot(snapshotId, (error, data, response) => {
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
 **snapshotId** | [**SnapshotId**](.md)| Either the ID of an existing snapshot. This will be an integer for a Droplet snapshot or a string for a volume snapshot. | 

### Return type

[**InlineResponse20054**](InlineResponse20054.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listAllSnapshots"></a>
# **listAllSnapshots**
> InlineResponse20053 listAllSnapshots(opts)

List All Snapshots

To list all of the snapshots available on your account, send a GET request to &#x60;/v2/snapshots&#x60;.  The response will be a JSON object with a key called &#x60;snapshots&#x60;. This will be set to an array of &#x60;snapshot&#x60; objects, each of which will contain the standard snapshot attributes.  ### Filtering Results by Resource Type  It&#x27;s possible to request filtered results by including certain query parameters.  #### List Droplet Snapshots  To retrieve only snapshots based on Droplets, include the &#x60;resource_type&#x60; query parameter set to &#x60;droplet&#x60;. For example, &#x60;/v2/snapshots?resource_type&#x3D;droplet&#x60;.  #### List Volume Snapshots  To retrieve only snapshots based on volumes, include the &#x60;resource_type&#x60; query parameter set to &#x60;volume&#x60;. For example, &#x60;/v2/snapshots?resource_type&#x3D;volume&#x60;. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.SnapshotsApi();
let opts = { 
  'perPage': 20, // Number | Number of items returned per page
  'page': 1, // Number | Which 'page' of paginated results to return.
  'resourceType': "resourceType_example" // String | Used to filter snapshots by a resource type.
};
apiInstance.listAllSnapshots(opts, (error, data, response) => {
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
 **resourceType** | **String**| Used to filter snapshots by a resource type. | [optional] 

### Return type

[**InlineResponse20053**](InlineResponse20053.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

