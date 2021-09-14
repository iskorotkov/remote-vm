# DigitalOceanApi.DropletActionsApi

All URIs are relative to *https://api.digitalocean.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getDropletAction**](DropletActionsApi.md#getDropletAction) | **GET** /v2/droplets/{droplet_id}/actions/{action_id} | Retrieve a Droplet Action
[**listDropletActions**](DropletActionsApi.md#listDropletActions) | **GET** /v2/droplets/{droplet_id}/actions | List Actions for a Droplet
[**postDropletAction**](DropletActionsApi.md#postDropletAction) | **POST** /v2/droplets/{droplet_id}/actions | Initiate a Droplet Action
[**postDropletActionByTag**](DropletActionsApi.md#postDropletActionByTag) | **POST** /v2/droplets/actions | Acting on Tagged Droplets

<a name="getDropletAction"></a>
# **getDropletAction**
> InlineResponse2005 getDropletAction(dropletId, actionId)

Retrieve a Droplet Action

To retrieve a Droplet action, send a GET request to &#x60;/v2/droplets/$DROPLET_ID/actions/$ACTION_ID&#x60;.  The response will be a JSON object with a key called &#x60;action&#x60;. The value will be a Droplet action object. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DropletActionsApi();
let dropletId = 56; // Number | A unique identifier for a Droplet instance.
let actionId = 56; // Number | A unique numeric ID that can be used to identify and reference an action.

apiInstance.getDropletAction(dropletId, actionId, (error, data, response) => {
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
 **dropletId** | **Number**| A unique identifier for a Droplet instance. | 
 **actionId** | **Number**| A unique numeric ID that can be used to identify and reference an action. | 

### Return type

[**InlineResponse2005**](InlineResponse2005.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listDropletActions"></a>
# **listDropletActions**
> InlineResponse2004 listDropletActions(dropletId, opts)

List Actions for a Droplet

To retrieve a list of all actions that have been executed for a Droplet, send a GET request to &#x60;/v2/droplets/$DROPLET_ID/actions&#x60;.  The results will be returned as a JSON object with an &#x60;actions&#x60; key. This will be set to an array filled with &#x60;action&#x60; objects containing the standard &#x60;action&#x60; attributes. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DropletActionsApi();
let dropletId = 56; // Number | A unique identifier for a Droplet instance.
let opts = { 
  'perPage': 20, // Number | Number of items returned per page
  'page': 1 // Number | Which 'page' of paginated results to return.
};
apiInstance.listDropletActions(dropletId, opts, (error, data, response) => {
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
 **dropletId** | **Number**| A unique identifier for a Droplet instance. | 
 **perPage** | **Number**| Number of items returned per page | [optional] [default to 20]
 **page** | **Number**| Which &#x27;page&#x27; of paginated results to return. | [optional] [default to 1]

### Return type

[**InlineResponse2004**](InlineResponse2004.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="postDropletAction"></a>
# **postDropletAction**
> InlineResponse2005 postDropletAction(dropletId, opts)

Initiate a Droplet Action

To initiate an action on a Droplet send a POST request to &#x60;/v2/droplets/$DROPLET_ID/actions&#x60;. In the JSON body to the request, set the &#x60;type&#x60; attribute to on of the supported action types:  | Action                                   | Details | | ---------------------------------------- | ----------- | | &lt;nobr&gt;&#x60;enable_backups&#x60;&lt;/nobr&gt;            | Enables backups for a Droplet | | &lt;nobr&gt;&#x60;disable_backups&#x60;&lt;/nobr&gt;           | Disables backups for a Droplet | | &lt;nobr&gt;&#x60;reboot&#x60;&lt;/nobr&gt;                    | Reboots a Droplet. A &#x60;reboot&#x60; action is an attempt to reboot the Droplet in a graceful way, similar to using the &#x60;reboot&#x60; command from the console. | | &lt;nobr&gt;&#x60;power_cycle&#x60;&lt;/nobr&gt;               | Power cycles a Droplet. A &#x60;powercycle&#x60; action is similar to pushing the reset button on a physical machine, it&#x27;s similar to booting from scratch. | | &lt;nobr&gt;&#x60;shutdown&#x60;&lt;/nobr&gt;                  | Shutsdown a Droplet. A shutdown action is an attempt to shutdown the Droplet in a graceful way, similar to using the &#x60;shutdown&#x60; command from the console. Since a &#x60;shutdown&#x60; command can fail, this action guarantees that the command is issued, not that it succeeds. The preferred way to turn off a Droplet is to attempt a shutdown, with a reasonable timeout, followed by a &#x60;power_off&#x60; action to ensure the Droplet is off. | | &lt;nobr&gt;&#x60;power_off&#x60;&lt;/nobr&gt;                 | Powers off a Droplet. A &#x60;power_off&#x60; event is a hard shutdown and should only be used if the &#x60;shutdown&#x60; action is not successful. It is similar to cutting the power on a server and could lead to complications. | | &lt;nobr&gt;&#x60;power_on&#x60;&lt;/nobr&gt;                  | Powers on a Droplet. | | &lt;nobr&gt;&#x60;restore&#x60;&lt;/nobr&gt;                   | Restore a Droplet using a backup image. The image ID that is passed in must be a backup of the current Droplet instance. The operation will leave any embedded SSH keys intact. | | &lt;nobr&gt;&#x60;password_reset&#x60;&lt;/nobr&gt;            | Resets the root password for a Droplet. A new password will be provided via email. It must be changed after first use. | | &lt;nobr&gt;&#x60;resize&#x60;&lt;/nobr&gt;                    | Resizes a Droplet. Set the &#x60;size&#x60; attribute to a size slug. If a permanent resize with disk changes included is desired, set the &#x60;disk&#x60; attribute to &#x60;true&#x60;. | | &lt;nobr&gt;&#x60;rebuild&#x60;&lt;/nobr&gt;                   | Rebuilds a Droplet from a new base image. Set the &#x60;image&#x60; attribute to an image ID or slug. | | &lt;nobr&gt;&#x60;rename&#x60;&lt;/nobr&gt;                    | Renames a Droplet. | | &lt;nobr&gt;&#x60;change_kernel&#x60;&lt;/nobr&gt;             | Changes a Droplet&#x27;s kernel. Only applies to Droplets with externally managed kernels. All Droplets created after March 2017 use internal kernels by default. | | &lt;nobr&gt;&#x60;enable_ipv6&#x60;&lt;/nobr&gt;               | Enables IPv6 for a Droplet. | | &lt;nobr&gt;&#x60;snapshot&#x60;&lt;/nobr&gt;                  | Takes a snapshot of a Droplet. | 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DropletActionsApi();
let dropletId = 56; // Number | A unique identifier for a Droplet instance.
let opts = { 
  'body': new DigitalOceanApi.DropletIdActionsBody() // DropletIdActionsBody | The `type` attribute set in the request body will specify the  action that
will be taken on the Droplet. Some actions will require additional
attributes to be set as well.

};
apiInstance.postDropletAction(dropletId, opts, (error, data, response) => {
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
 **dropletId** | **Number**| A unique identifier for a Droplet instance. | 
 **body** | [**DropletIdActionsBody**](DropletIdActionsBody.md)| The &#x60;type&#x60; attribute set in the request body will specify the  action that
will be taken on the Droplet. Some actions will require additional
attributes to be set as well.
 | [optional] 

### Return type

[**InlineResponse2005**](InlineResponse2005.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="postDropletActionByTag"></a>
# **postDropletActionByTag**
> InlineResponse20110 postDropletActionByTag(opts)

Acting on Tagged Droplets

Some actions can be performed in bulk on tagged Droplets. The actions can be initiated by sending a POST to &#x60;/v2/droplets/actions?tag_name&#x3D;$TAG_NAME&#x60; with the action arguments.  Only a sub-set of action types are supported:  - &#x60;power_cycle&#x60; - &#x60;power_on&#x60; - &#x60;power_off&#x60; - &#x60;shutdown&#x60; - &#x60;enable_ipv6&#x60; - &#x60;enable_backups&#x60; - &#x60;disable_backups&#x60; - &#x60;snapshot&#x60; 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DropletActionsApi();
let opts = { 
  'body': new DigitalOceanApi.DropletsActionsBody(), // DropletsActionsBody | The `type` attribute set in the request body will specify the  action that
will be taken on the Droplet. Some actions will require additional
attributes to be set as well.

  'tagName': "tagName_example" // String | Used to filter Droplets by a specific tag.
};
apiInstance.postDropletActionByTag(opts, (error, data, response) => {
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
 **body** | [**DropletsActionsBody**](DropletsActionsBody.md)| The &#x60;type&#x60; attribute set in the request body will specify the  action that
will be taken on the Droplet. Some actions will require additional
attributes to be set as well.
 | [optional] 
 **tagName** | **String**| Used to filter Droplets by a specific tag. | [optional] 

### Return type

[**InlineResponse20110**](InlineResponse20110.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

