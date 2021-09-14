# digital_ocean_api

DigitalOceanApi - JavaScript client for digital_ocean_api
# Introduction  The DigitalOcean API allows you to manage Droplets and resources within the DigitalOcean cloud in a simple, programmatic way using conventional HTTP requests.  All of the functionality that you are familiar with in the DigitalOcean control panel is also available through the API, allowing you to script the complex actions that your situation requires.  The API documentation will start with a general overview about the design and technology that has been implemented, followed by reference information about specific endpoints.  ## Requests  Any tool that is fluent in HTTP can communicate with the API simply by requesting the correct URI. Requests should be made using the HTTPS protocol so that traffic is encrypted. The interface responds to different methods depending on the action required.  |Method|Usage| |--- |--- | |GET|For simple retrieval of information about your account, Droplets, or environment, you should use the GET method.  The information you request will be returned to you as a JSON object. The attributes defined by the JSON object can be used to form additional requests.  Any request using the GET method is read-only and will not affect any of the objects you are querying.| |DELETE|To destroy a resource and remove it from your account and environment, the DELETE method should be used.  This will remove the specified object if it is found.  If it is not found, the operation will return a response indicating that the object was not found. This idempotency means that you do not have to check for a resource's availability prior to issuing a delete command, the final state will be the same regardless of its existence.| |PUT|To update the information about a resource in your account, the PUT method is available. Like the DELETE Method, the PUT method is idempotent.  It sets the state of the target using the provided values, regardless of their current values. Requests using the PUT method do not need to check the current attributes of the object.| |PATCH|Some resources support partial modification. In these cases, the PATCH method is available. Unlike PUT which generally requires a complete representation of a resource, a PATCH request is is a set of instructions on how to modify a resource updating only specific attributes.| |POST|To create a new object, your request should specify the POST method. The POST request includes all of the attributes necessary to create a new object.  When you wish to create a new object, send a POST request to the target endpoint.| |HEAD|Finally, to retrieve metadata information, you should use the HEAD method to get the headers.  This returns only the header of what would be returned with an associated GET request. Response headers contain some useful information about your API access and the results that are available for your request. For instance, the headers contain your current rate-limit value and the amount of time available until the limit resets. It also contains metrics about the total number of objects found, pagination information, and the total content length.|   ## HTTP Statuses  Along with the HTTP methods that the API responds to, it will also return standard HTTP statuses, including error codes.  In the event of a problem, the status will contain the error code, while the body of the response will usually contain additional information about the problem that was encountered.  In general, if the status returned is in the 200 range, it indicates that the request was fulfilled successfully and that no error was encountered.  Return codes in the 400 range typically indicate that there was an issue with the request that was sent. Among other things, this could mean that you did not authenticate correctly, that you are requesting an action that you do not have authorization for, that the object you are requesting does not exist, or that your request is malformed.  If you receive a status in the 500 range, this generally indicates a server-side problem. This means that we are having an issue on our end and cannot fulfill your request currently.  400 and 500 level error responses will include a JSON object in their body, including the following attributes:  |Name|Type|Description| |--- |--- |--- | |id|string|A short identifier corresponding to the HTTP status code returned. For example, the ID for a response returning a 404 status code would be \"not_found.\"| |message|string|A message providing additional information about the error, including details to help resolve it when possible.| |request_id|string|Optionally, some endpoints may include a request ID that should be provided when reporting bugs or opening support tickets to help identify the issue.|  ### Example Error Response  ```     HTTP/1.1 403 Forbidden     {       \"id\":       \"forbidden\",       \"message\":  \"You do not have access for the attempted action.\"     } ```  ## Responses  When a request is successful, a response body will typically be sent back in the form of a JSON object. An exception to this is when a DELETE request is processed, which will result in a successful HTTP 204 status and an empty response body.  Inside of this JSON object, the resource root that was the target of the request will be set as the key. This will be the singular form of the word if the request operated on a single object, and the plural form of the word if a collection was processed.  For example, if you send a GET request to `/v2/droplets/$DROPLET_ID` you will get back an object with a key called \"`droplet`\". However, if you send the GET request to the general collection at `/v2/droplets`, you will get back an object with a key called \"`droplets`\".  The value of these keys will generally be a JSON object for a request on a single object and an array of objects for a request on a collection of objects.  ### Response for a Single Object  ```     {         \"droplet\": {             \"name\": \"example.com\"             . . .         }     } ```  ### Response for an Object Collection  ```     {         \"droplets\": [             {                 \"name\": \"example.com\"                 . . .             },             {                 \"name\": \"second.com\"                 . . .             }         ]     } ```  ## Meta  In addition to the main resource root, the response may also contain a `meta` object. This object contains information about the response itself.  The `meta` object contains a `total` key that is set to the total number of objects returned by the request. This has implications on the `links` object and pagination.  The `meta` object will only be displayed when it has a value. Currently, the `meta` object will have a value when a request is made on a collection (like `droplets` or `domains`).   ### Sample Meta Object  ```     {         . . .         \"meta\": {             \"total\": 43         }         . . .     } ```  ## Links & Pagination  The `links` object is returned as part of the response body when pagination is enabled. By default, 20 objects are returned per page. If the response contains 20 objects or fewer, no `links` object will be returned. If the response contains more than 20 objects, the first 20 will be returned along with the `links` object.  You can request a different pagination limit or force pagination by appending `?per_page=` to the request with the number of items you would like per page. For instance, to show only two results per page, you could add `?per_page=2` to the end of your query. The maximum number of results per page is 200.  The `links` object contains a `pages` object. The `pages` object, in turn, contains keys indicating the relationship of additional pages. The values of these are the URLs of the associated pages. The keys will be one of the following:  *   **first**: The URI of the first page of results. *   **prev**: The URI of the previous sequential page of results. *   **next**: The URI of the next sequential page of results. *   **last**: The URI of the last page of results.  The `pages` object will only include the links that make sense. So for the first page of results, no `first` or `prev` links will ever be set. This convention holds true in other situations where a link would not make sense.  ### Sample Links Object  ```     {         . . .         \"links\": {             \"pages\": {                 \"last\": \"https://api.digitalocean.com/v2/images?page=2\",                 \"next\": \"https://api.digitalocean.com/v2/images?page=2\"             }         }         . . .     } ```  ## Rate Limit  Requests through the API are rate limited per OAuth token. Current rate limits:  *   5,000 requests per hour *   250 requests per minute (5% of the hourly total)  Once you exceed either limit, you will be rate limited until the next cycle starts. Space out any requests that you would otherwise issue in bursts for the best results.  The rate limiting information is contained within the response headers of each request. The relevant headers are:  *   **RateLimit-Limit**: The number of requests that can be made per hour. *   **RateLimit-Remaining**: The number of requests that remain before you hit your request limit. See the information below for how the request limits expire. *   **RateLimit-Reset**: This represents the time when the oldest request will expire. The value is given in [Unix epoch time](http://en.wikipedia.org/wiki/Unix_time). See below for more information about how request limits expire.  As long as the `RateLimit-Remaining` count is above zero, you will be able to make additional requests.  The way that a request expires and is removed from the current limit count is important to understand. Rather than counting all of the requests for an hour and resetting the `RateLimit-Remaining` value at the end of the hour, each request instead has its own timer.  This means that each request contributes toward the `RateLimit-Remaining` count for one complete hour after the request is made. When that request's timer runs out, it is no longer counted towards the request limit.  This has implications on the meaning of the `RateLimit-Reset` header as well. Because the entire rate limit is not reset at one time, the value of this header is set to the time when the _oldest_ request will expire.  Keep this in mind if you see your `RateLimit-Reset` value change, but not move an entire hour into the future.  If the `RateLimit-Remaining` reaches zero, subsequent requests will receive a 429 error code until the request reset has been reached. You can see the format of the response in the examples.  **Note:** The following endpoints have special rate limit requirements that are independent of the limits defined above.  *   Only 12 `POST` requests to the `/v2/floating_ips` endpoint to create Floating IPs can be made per 60 seconds. *   Only 10 `GET` requests to the `/v2/account/keys` endpoint to list SSH keys can be made per 60 seconds.  ### Sample Rate Limit Headers  ```     . . .     RateLimit-Limit: 1200     RateLimit-Remaining: 1193     RateLimit-Reset: 1402425459     . . . ```  ### Sample Rate Exceeded Response  ```     429 Too Many Requests     {             id: \"too_many_requests\",             message: \"API Rate limit exceeded.\"     } ```  ## Curl Examples  Throughout this document, some example API requests will be given using the `curl` command. This will allow us to demonstrate the various endpoints in a simple, textual format.  The names of account-specific references (like Droplet IDs, for instance) will be represented by variables. For instance, a Droplet ID may be represented by a variable called `$DROPLET_ID`. You can set the associated variables in your environment if you wish to use the examples without modification.  The first variable that you should set to get started is your OAuth authorization token. The next section will go over the details of this, but you can set an environmental variable for it now.  Generate a token by going to the [Apps & API](https://cloud.digitalocean.com/settings/applications) section of the DigitalOcean control panel. Use an existing token if you have saved one, or generate a new token with the \"Generate new token\" button. Copy the generated token and use it to set and export the TOKEN variable in your environment as the example shows.  You may also wish to set some other variables now or as you go along. For example, you may wish to set the `DROPLET_ID` variable to one of your Droplet IDs since this will be used frequently in the API.  If you are following along, make sure you use a Droplet ID that you control so that your commands will execute correctly.  If you need access to the headers of a response through `curl`, you can pass the `-i` flag to display the header information along with the body. If you are only interested in the header, you can instead pass the `-I` flag, which will exclude the response body entirely.  ### Set and Export your OAuth Token  ``` export DIGITALOCEAN_TOKEN=your_token_here ```  ### Set and Export a Variable  ``` export DROPLET_ID=1111111 ```  ## Parameters  There are two different ways to pass parameters in a request with the API.  When passing parameters to create or update an object, parameters should be passed as a JSON object containing the appropriate attribute names and values as key-value pairs. When you use this format, you should specify that you are sending a JSON object in the header. This is done by setting the `Content-Type` header to `application/json`. This ensures that your request is interpreted correctly.  When passing parameters to filter a response on GET requests, parameters can be passed using standard query attributes. In this case, the parameters would be embedded into the URI itself by appending a `?` to the end of the URI and then setting each attribute with an equal sign. Attributes can be separated with a `&`. Tools like `curl` can create the appropriate URI when given parameters and values; this can also be done using the `-F` flag and then passing the key and value as an argument. The argument should take the form of a quoted string with the attribute being set to a value with an equal sign.  ### Pass Parameters as a JSON Object  ```     curl -H \"Authorization: Bearer $DIGITALOCEAN_TOKEN\" \\         -H \"Content-Type: application/json\" \\         -d '{\"name\": \"example.com\", \"ip_address\": \"127.0.0.1\"}' \\         -X POST \"https://api.digitalocean.com/v2/domains\" ```  ### Pass Filter Parameters as a Query String  ```      curl -H \"Authorization: Bearer $DIGITALOCEAN_TOKEN\" \\          -X GET \\          \"https://api.digitalocean.com/v2/images?private=true\" ```  ## Cross Origin Resource Sharing  In order to make requests to the API from other domains, the API implements Cross Origin Resource Sharing (CORS) support.  CORS support is generally used to create AJAX requests outside of the domain that the request originated from. This is necessary to implement projects like control panels utilizing the API. This tells the browser that it can send requests to an outside domain.  The procedure that the browser initiates in order to perform these actions (other than GET requests) begins by sending a \"preflight\" request. This sets the `Origin` header and uses the `OPTIONS` method. The server will reply back with the methods it allows and some of the limits it imposes. The client then sends the actual request if it falls within the allowed constraints.  This process is usually done in the background by the browser, but you can use curl to emulate this process using the example provided. The headers that will be set to show the constraints are:  *   **Access-Control-Allow-Origin**: This is the domain that is sent by the client or browser as the origin of the request. It is set through an `Origin` header. *   **Access-Control-Allow-Methods**: This specifies the allowed options for requests from that domain. This will generally be all available methods. *   **Access-Control-Expose-Headers**: This will contain the headers that will be available to requests from the origin domain. *   **Access-Control-Max-Age**: This is the length of time that the access is considered valid. After this expires, a new preflight should be sent. *   **Access-Control-Allow-Credentials**: This will be set to `true`. It basically allows you to send your OAuth token for authentication.  You should not need to be concerned with the details of these headers, because the browser will typically do all of the work for you. 
This SDK is automatically generated by the [Swagger Codegen](https://github.com/swagger-api/swagger-codegen) project:

- API version: 2.0
- Package version: 2.0
- Build package: io.swagger.codegen.v3.generators.javascript.JavaScriptClientCodegen

## Installation

### For [Node.js](https://nodejs.org/)

#### npm

To publish the library as a [npm](https://www.npmjs.com/),
please follow the procedure in ["Publishing npm packages"](https://docs.npmjs.com/getting-started/publishing-npm-packages).

Then install it via:

```shell
npm install digital_ocean_api --save
```

#### git
#
If the library is hosted at a git repository, e.g.
https://github.com/GIT_USER_ID/GIT_REPO_ID
then install it via:

```shell
    npm install GIT_USER_ID/GIT_REPO_ID --save
```

### For browser

The library also works in the browser environment via npm and [browserify](http://browserify.org/). After following
the above steps with Node.js and installing browserify with `npm install -g browserify`,
perform the following (assuming *main.js* is your entry file):

```shell
browserify main.js > bundle.js
```

Then include *bundle.js* in the HTML pages.

### Webpack Configuration

Using Webpack you may encounter the following error: "Module not found: Error:
Cannot resolve module", most certainly you should disable AMD loader. Add/merge
the following section to your webpack config:

```javascript
module: {
  rules: [
    {
      parser: {
        amd: false
      }
    }
  ]
}
```

## Getting Started

Please follow the [installation](#installation) instruction and execute the following JS code:

```javascript
var DigitalOceanApi = require('digital_ocean_api');
var defaultClient = DigitalOceanApi.ApiClient.instance;


var api = new DigitalOceanApi.AccountApi()
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
api.getUserInformation(callback);
```

## Documentation for API Endpoints

All URIs are relative to *https://api.digitalocean.com*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*DigitalOceanApi.AccountApi* | [**getUserInformation**](docs/AccountApi.md#getUserInformation) | **GET** /v2/account | Get User Information
*DigitalOceanApi.ActionsApi* | [**getAction**](docs/ActionsApi.md#getAction) | **GET** /v2/actions/{action_id} | Retrieve an Existing Action
*DigitalOceanApi.ActionsApi* | [**listAllActions**](docs/ActionsApi.md#listAllActions) | **GET** /v2/actions | List All Actions
*DigitalOceanApi.AppsApi* | [**createApp**](docs/AppsApi.md#createApp) | **POST** /v2/apps | Create a New App
*DigitalOceanApi.AppsApi* | [**createDeployment**](docs/AppsApi.md#createDeployment) | **POST** /v2/apps/{app_id}/deployments | Create an App Deployment
*DigitalOceanApi.AppsApi* | [**deleteApp**](docs/AppsApi.md#deleteApp) | **DELETE** /v2/apps/{id} | Delete an App
*DigitalOceanApi.AppsApi* | [**getApp**](docs/AppsApi.md#getApp) | **GET** /v2/apps/{id} | Retrieve an Existing App
*DigitalOceanApi.AppsApi* | [**getDeployment**](docs/AppsApi.md#getDeployment) | **GET** /v2/apps/{app_id}/deployments/{deployment_id} | Retrieve an App Deployment
*DigitalOceanApi.AppsApi* | [**getInstanceSize**](docs/AppsApi.md#getInstanceSize) | **GET** /v2/apps/tiers/instance_sizes/{slug} | Retrieve an Instance Size
*DigitalOceanApi.AppsApi* | [**getLogs**](docs/AppsApi.md#getLogs) | **GET** /v2/apps/{app_id}/deployments/{deployment_id}/components/{component_name}/logs | Retrieve Deployment Logs
*DigitalOceanApi.AppsApi* | [**getLogsAggregate**](docs/AppsApi.md#getLogsAggregate) | **GET** /v2/apps/{app_id}/deployments/{deployment_id}/logs | Retrieve Aggregate Deployment Logs
*DigitalOceanApi.AppsApi* | [**getTier**](docs/AppsApi.md#getTier) | **GET** /v2/apps/tiers/{slug} | Retrieve an App Tier
*DigitalOceanApi.AppsApi* | [**listApps**](docs/AppsApi.md#listApps) | **GET** /v2/apps | List All Apps
*DigitalOceanApi.AppsApi* | [**listDeployments**](docs/AppsApi.md#listDeployments) | **GET** /v2/apps/{app_id}/deployments | List App Deployments
*DigitalOceanApi.AppsApi* | [**listInstanceSizes**](docs/AppsApi.md#listInstanceSizes) | **GET** /v2/apps/tiers/instance_sizes | List Instance Sizes
*DigitalOceanApi.AppsApi* | [**listRegions**](docs/AppsApi.md#listRegions) | **GET** /v2/apps/regions | List App Regions
*DigitalOceanApi.AppsApi* | [**listTiers**](docs/AppsApi.md#listTiers) | **GET** /v2/apps/tiers | List App Tiers
*DigitalOceanApi.AppsApi* | [**postCancelDeployment**](docs/AppsApi.md#postCancelDeployment) | **POST** /v2/apps/{app_id}/deployments/{deployment_id}/cancel | Cancel a Deployment
*DigitalOceanApi.AppsApi* | [**updateApp**](docs/AppsApi.md#updateApp) | **PUT** /v2/apps/{id} | Update an App
*DigitalOceanApi.AppsApi* | [**validateAppSpec**](docs/AppsApi.md#validateAppSpec) | **POST** /v2/apps/propose | Propose an App Spec
*DigitalOceanApi.BillingApi* | [**getCustomerBalance**](docs/BillingApi.md#getCustomerBalance) | **GET** /v2/customers/my/balance | Get Customer Balance
*DigitalOceanApi.BillingApi* | [**getInvoiceByUuid**](docs/BillingApi.md#getInvoiceByUuid) | **GET** /v2/customers/my/invoices/{invoice_uuid} | Retrieve an Invoice by UUID
*DigitalOceanApi.BillingApi* | [**getInvoiceCsvByUuid**](docs/BillingApi.md#getInvoiceCsvByUuid) | **GET** /v2/customers/my/invoices/{invoice_uuid}/csv | Retrieve an Invoice CSV by UUID
*DigitalOceanApi.BillingApi* | [**getInvoicePdfByUuid**](docs/BillingApi.md#getInvoicePdfByUuid) | **GET** /v2/customers/my/invoices/{invoice_uuid}/pdf | Retrieve an Invoice PDF by UUID
*DigitalOceanApi.BillingApi* | [**getInvoiceSummaryByUuid**](docs/BillingApi.md#getInvoiceSummaryByUuid) | **GET** /v2/customers/my/invoices/{invoice_uuid}/summary | Retrieve an Invoice Summary by UUID
*DigitalOceanApi.BillingApi* | [**listBillingHistory**](docs/BillingApi.md#listBillingHistory) | **GET** /v2/customers/my/billing_history | List Billing History
*DigitalOceanApi.BillingApi* | [**listInvoices**](docs/BillingApi.md#listInvoices) | **GET** /v2/customers/my/invoices | List All Invoices
*DigitalOceanApi.BlockStorageApi* | [**createNewVolume**](docs/BlockStorageApi.md#createNewVolume) | **POST** /v2/volumes | Create a New Block Storage Volume
*DigitalOceanApi.BlockStorageApi* | [**createVolumeSnapshot**](docs/BlockStorageApi.md#createVolumeSnapshot) | **POST** /v2/volumes/{volume_id}/snapshots | Create Snapshot from a Volume
*DigitalOceanApi.BlockStorageApi* | [**deleteVolume**](docs/BlockStorageApi.md#deleteVolume) | **DELETE** /v2/volumes/{volume_id} | Delete a Block Storage Volume
*DigitalOceanApi.BlockStorageApi* | [**deleteVolumeByName**](docs/BlockStorageApi.md#deleteVolumeByName) | **DELETE** /v2/volumes | Delete a Block Storage Volume by Name
*DigitalOceanApi.BlockStorageApi* | [**deleteVolumeSnapshotById**](docs/BlockStorageApi.md#deleteVolumeSnapshotById) | **DELETE** /v2/volumes/snapshot/{snapshot_id} | Delete a Volume Snapshot
*DigitalOceanApi.BlockStorageApi* | [**getVolume**](docs/BlockStorageApi.md#getVolume) | **GET** /v2/volumes/{volume_id} | Retrieve an Existing Block Storage Volume
*DigitalOceanApi.BlockStorageApi* | [**getVolumeSnapshotById**](docs/BlockStorageApi.md#getVolumeSnapshotById) | **GET** /v2/volumes/snapshot/{snapshot_id} | Retreive an Existing Volume Snapshot
*DigitalOceanApi.BlockStorageApi* | [**listAllVolumes**](docs/BlockStorageApi.md#listAllVolumes) | **GET** /v2/volumes | List All Block Storage Volumes
*DigitalOceanApi.BlockStorageApi* | [**listVolumeSnapshots**](docs/BlockStorageApi.md#listVolumeSnapshots) | **GET** /v2/volumes/{volume_id}/snapshots | List Snapshots for a Volume
*DigitalOceanApi.BlockStorageActionsApi* | [**getVolumeAction**](docs/BlockStorageActionsApi.md#getVolumeAction) | **GET** /v2/volumes/{volume_id}/actions/{action_id} | Retrieve an Existing Volume Action
*DigitalOceanApi.BlockStorageActionsApi* | [**listAllVolumeActions**](docs/BlockStorageActionsApi.md#listAllVolumeActions) | **GET** /v2/volumes/{volume_id}/actions | List All Actions for a Volume
*DigitalOceanApi.BlockStorageActionsApi* | [**postVolumeActionById**](docs/BlockStorageActionsApi.md#postVolumeActionById) | **POST** /v2/volumes/{volume_id}/actions | Initiate A Block Storage Action By Volume Id
*DigitalOceanApi.BlockStorageActionsApi* | [**postVolumeActionByName**](docs/BlockStorageActionsApi.md#postVolumeActionByName) | **POST** /v2/volumes/actions | Initiate A Block Storage Action By Volume Name
*DigitalOceanApi.CDNEndpointsApi* | [**createCdnEndpoint**](docs/CDNEndpointsApi.md#createCdnEndpoint) | **POST** /v2/cdn/endpoints | Create a New CDN Endpoint
*DigitalOceanApi.CDNEndpointsApi* | [**deleteCdnEndpoint**](docs/CDNEndpointsApi.md#deleteCdnEndpoint) | **DELETE** /v2/cdn/endpoints/{cdn_id} | Delete a CDN Endpoint
*DigitalOceanApi.CDNEndpointsApi* | [**getCdnEndpoint**](docs/CDNEndpointsApi.md#getCdnEndpoint) | **GET** /v2/cdn/endpoints/{cdn_id} | Retrieve an Existing CDN Endpoint
*DigitalOceanApi.CDNEndpointsApi* | [**listCdnEndpoints**](docs/CDNEndpointsApi.md#listCdnEndpoints) | **GET** /v2/cdn/endpoints | List All CDN Endpoints
*DigitalOceanApi.CDNEndpointsApi* | [**purgeCdnCache**](docs/CDNEndpointsApi.md#purgeCdnCache) | **DELETE** /v2/cdn/endpoints/{cdn_id}/cache | Purge the Cache for an Existing CDN Endpoint
*DigitalOceanApi.CDNEndpointsApi* | [**updateCdnEndpoint**](docs/CDNEndpointsApi.md#updateCdnEndpoint) | **PUT** /v2/cdn/endpoints/{cdn_id} | Update a CDN Endpoint
*DigitalOceanApi.CertificatesApi* | [**createCertificates**](docs/CertificatesApi.md#createCertificates) | **POST** /v2/certificates | Create a New Certificate
*DigitalOceanApi.CertificatesApi* | [**deleteCertificate**](docs/CertificatesApi.md#deleteCertificate) | **DELETE** /v2/certificates/{certificate_id} | Delete a Certificate
*DigitalOceanApi.CertificatesApi* | [**getCertificate**](docs/CertificatesApi.md#getCertificate) | **GET** /v2/certificates/{certificate_id} | Retrieve an Existing Certificate
*DigitalOceanApi.CertificatesApi* | [**listCertificates**](docs/CertificatesApi.md#listCertificates) | **GET** /v2/certificates | List All Certificates
*DigitalOceanApi.Class1ClickApplicationsApi* | [**installKubernetes**](docs/Class1ClickApplicationsApi.md#installKubernetes) | **POST** /v2/1-clicks/kubernetes | Install Kubernetes 1-Click Applications
*DigitalOceanApi.Class1ClickApplicationsApi* | [**list**](docs/Class1ClickApplicationsApi.md#list) | **GET** /v2/1-clicks | List 1-Click Applications
*DigitalOceanApi.ContainerRegistryApi* | [**createRegistry**](docs/ContainerRegistryApi.md#createRegistry) | **POST** /v2/registry | Create Container Registry
*DigitalOceanApi.ContainerRegistryApi* | [**deleteRegistry**](docs/ContainerRegistryApi.md#deleteRegistry) | **DELETE** /v2/registry | Delete Container Registry
*DigitalOceanApi.ContainerRegistryApi* | [**deleteRepositoryManifest**](docs/ContainerRegistryApi.md#deleteRepositoryManifest) | **DELETE** /v2/registry/{registry_name}/{repository_name}/digests/{manifest_digest} | Delete Container Registry Repository Manifest
*DigitalOceanApi.ContainerRegistryApi* | [**deleteRepositoryTag**](docs/ContainerRegistryApi.md#deleteRepositoryTag) | **DELETE** /v2/registry/{registry_name}/{repository_name}/tags/{repository_tag} | Delete Container Registry Repository Tag
*DigitalOceanApi.ContainerRegistryApi* | [**getDockerCredentials**](docs/ContainerRegistryApi.md#getDockerCredentials) | **GET** /v2/registry/docker-credentials | Get Docker Credentials for Container Registry
*DigitalOceanApi.ContainerRegistryApi* | [**getGarbageCollection**](docs/ContainerRegistryApi.md#getGarbageCollection) | **GET** /v2/registry/{registry_name}/garbage-collection | Get Active Garbage Collection
*DigitalOceanApi.ContainerRegistryApi* | [**getRegistry**](docs/ContainerRegistryApi.md#getRegistry) | **GET** /v2/registry | Get Container Registry Information
*DigitalOceanApi.ContainerRegistryApi* | [**getRegistryOptions**](docs/ContainerRegistryApi.md#getRegistryOptions) | **GET** /v2/registry/options | List Available Subscription Tiers
*DigitalOceanApi.ContainerRegistryApi* | [**getRegistrySubscription**](docs/ContainerRegistryApi.md#getRegistrySubscription) | **GET** /v2/registry/subscription | Get Subscription Information
*DigitalOceanApi.ContainerRegistryApi* | [**listGarbageCollections**](docs/ContainerRegistryApi.md#listGarbageCollections) | **GET** /v2/registry/{registry_name}/garbage-collections | List Garbage Collections
*DigitalOceanApi.ContainerRegistryApi* | [**listRegistryRepositories**](docs/ContainerRegistryApi.md#listRegistryRepositories) | **GET** /v2/registry/{registry_name} | List All Container Registry Repositories
*DigitalOceanApi.ContainerRegistryApi* | [**listRepositoryTags**](docs/ContainerRegistryApi.md#listRepositoryTags) | **GET** /v2/registry/{registry_name}/{repository_name}/tags | List All Container Registry Repository Tags
*DigitalOceanApi.ContainerRegistryApi* | [**postRegistrySubscription**](docs/ContainerRegistryApi.md#postRegistrySubscription) | **POST** /v2/registry/subscription | Update Subscription Tier
*DigitalOceanApi.ContainerRegistryApi* | [**runGarbageCollection**](docs/ContainerRegistryApi.md#runGarbageCollection) | **POST** /v2/registry/{registry_name}/garbage-collection | Start Garbage Collection
*DigitalOceanApi.ContainerRegistryApi* | [**updateGarbageCollection**](docs/ContainerRegistryApi.md#updateGarbageCollection) | **PUT** /v2/registry/{registry_name}/garbage-collection/{garbage_collection_uuid} | Update Garbage Collection
*DigitalOceanApi.ContainerRegistryApi* | [**validateRegistryName**](docs/ContainerRegistryApi.md#validateRegistryName) | **POST** /v2/registry/validate-name | Validate a Container Registry Name
*DigitalOceanApi.DatabasesApi* | [**addConnectionPool**](docs/DatabasesApi.md#addConnectionPool) | **POST** /v2/databases/{database_cluster_uuid}/pools | Add a New Connection Pool (PostgreSQL)
*DigitalOceanApi.DatabasesApi* | [**addDatabase**](docs/DatabasesApi.md#addDatabase) | **POST** /v2/databases/{database_cluster_uuid}/dbs | Add a New Database
*DigitalOceanApi.DatabasesApi* | [**addUser**](docs/DatabasesApi.md#addUser) | **POST** /v2/databases/{database_cluster_uuid}/users | Add a Database User
*DigitalOceanApi.DatabasesApi* | [**createDatabaseCluster**](docs/DatabasesApi.md#createDatabaseCluster) | **POST** /v2/databases | Create a New Database Cluster
*DigitalOceanApi.DatabasesApi* | [**createReplica**](docs/DatabasesApi.md#createReplica) | **POST** /v2/databases/{database_cluster_uuid}/replicas | Create a Read-only Replica
*DigitalOceanApi.DatabasesApi* | [**deleteConnectionPool**](docs/DatabasesApi.md#deleteConnectionPool) | **DELETE** /v2/databases/{database_cluster_uuid}/pools/{pool_name} | Delete a Connection Pool (PostgreSQL)
*DigitalOceanApi.DatabasesApi* | [**deleteDatabase**](docs/DatabasesApi.md#deleteDatabase) | **DELETE** /v2/databases/{database_cluster_uuid}/dbs/{database_name} | Delete a Database
*DigitalOceanApi.DatabasesApi* | [**deleteOnlineMigration**](docs/DatabasesApi.md#deleteOnlineMigration) | **DELETE** /v2/databases/{database_cluster_uuid}/online-migration/{migration_id} | Stop an Online Migration
*DigitalOceanApi.DatabasesApi* | [**deleteUser**](docs/DatabasesApi.md#deleteUser) | **DELETE** /v2/databases/{database_cluster_uuid}/users/{username} | Remove a Database User
*DigitalOceanApi.DatabasesApi* | [**destroyCluster**](docs/DatabasesApi.md#destroyCluster) | **DELETE** /v2/databases/{database_cluster_uuid} | Destroy a Database Cluster
*DigitalOceanApi.DatabasesApi* | [**destroyReplica**](docs/DatabasesApi.md#destroyReplica) | **DELETE** /v2/databases/{database_cluster_uuid}/replicas/{replica_name} | Destroy a Read-only Replica
*DigitalOceanApi.DatabasesApi* | [**getCa**](docs/DatabasesApi.md#getCa) | **GET** /v2/databases/{database_cluster_uuid}/ca | Retrieve the Public Certificate
*DigitalOceanApi.DatabasesApi* | [**getConnectionPool**](docs/DatabasesApi.md#getConnectionPool) | **GET** /v2/databases/{database_cluster_uuid}/pools/{pool_name} | Retrieve Existing Connection Pool (PostgreSQL)
*DigitalOceanApi.DatabasesApi* | [**getDatabase**](docs/DatabasesApi.md#getDatabase) | **GET** /v2/databases/{database_cluster_uuid}/dbs/{database_name} | Retrieve an Existing Database
*DigitalOceanApi.DatabasesApi* | [**getDatabaseCluster**](docs/DatabasesApi.md#getDatabaseCluster) | **GET** /v2/databases/{database_cluster_uuid} | Retrieve an Existing Database Cluster
*DigitalOceanApi.DatabasesApi* | [**getEvictionPolicy**](docs/DatabasesApi.md#getEvictionPolicy) | **GET** /v2/databases/{database_cluster_uuid}/eviction_policy | Retrieve the Eviction Policy for a Redis Cluster
*DigitalOceanApi.DatabasesApi* | [**getMigrationStatus**](docs/DatabasesApi.md#getMigrationStatus) | **GET** /v2/databases/{database_cluster_uuid}/online-migration | Retrieve the Status of an Online Migration
*DigitalOceanApi.DatabasesApi* | [**getReplica**](docs/DatabasesApi.md#getReplica) | **GET** /v2/databases/{database_cluster_uuid}/replicas/{replica_name} | Retrieve an Existing Read-only Replica
*DigitalOceanApi.DatabasesApi* | [**getSqlMode**](docs/DatabasesApi.md#getSqlMode) | **GET** /v2/databases/{database_cluster_uuid}/sql_mode | Retrieve the SQL Modes for a MySQL Cluster
*DigitalOceanApi.DatabasesApi* | [**getUser**](docs/DatabasesApi.md#getUser) | **GET** /v2/databases/{database_cluster_uuid}/users/{username} | Retrieve an Existing Database User
*DigitalOceanApi.DatabasesApi* | [**listConnectionPools**](docs/DatabasesApi.md#listConnectionPools) | **GET** /v2/databases/{database_cluster_uuid}/pools | List Connection Pools (PostgreSQL)
*DigitalOceanApi.DatabasesApi* | [**listDatabaseBackups**](docs/DatabasesApi.md#listDatabaseBackups) | **GET** /v2/databases/{database_cluster_uuid}/backups | List Backups for a Database Cluster
*DigitalOceanApi.DatabasesApi* | [**listDatabaseClusters**](docs/DatabasesApi.md#listDatabaseClusters) | **GET** /v2/databases | List All Database Clusters
*DigitalOceanApi.DatabasesApi* | [**listDatabaseFirewalls**](docs/DatabasesApi.md#listDatabaseFirewalls) | **GET** /v2/databases/{database_cluster_uuid}/firewall | List Firewall Rules (Trusted Sources) for a Database Cluster
*DigitalOceanApi.DatabasesApi* | [**listDatabases**](docs/DatabasesApi.md#listDatabases) | **GET** /v2/databases/{database_cluster_uuid}/dbs | List All Databases
*DigitalOceanApi.DatabasesApi* | [**listReplicas**](docs/DatabasesApi.md#listReplicas) | **GET** /v2/databases/{database_cluster_uuid}/replicas | List All Read-only Replicas
*DigitalOceanApi.DatabasesApi* | [**listUsers**](docs/DatabasesApi.md#listUsers) | **GET** /v2/databases/{database_cluster_uuid}/users | List all Database Users
*DigitalOceanApi.DatabasesApi* | [**resetAuth**](docs/DatabasesApi.md#resetAuth) | **POST** /v2/databases/{database_cluster_uuid}/users/{username}/reset_auth | Reset a Database User&#x27;s Password or Authentication Method
*DigitalOceanApi.DatabasesApi* | [**updateDatabaseCluster**](docs/DatabasesApi.md#updateDatabaseCluster) | **PUT** /v2/databases/{database_cluster_uuid}/migrate | Migrate a Database Cluster to a New Region
*DigitalOceanApi.DatabasesApi* | [**updateDatabaseClusterSize**](docs/DatabasesApi.md#updateDatabaseClusterSize) | **PUT** /v2/databases/{database_cluster_uuid}/resize | Resize a Database Cluster
*DigitalOceanApi.DatabasesApi* | [**updateDatabaseFirewall**](docs/DatabasesApi.md#updateDatabaseFirewall) | **PUT** /v2/databases/{database_cluster_uuid}/firewall | Update Firewall Rules (Trusted Sources) for a Database
*DigitalOceanApi.DatabasesApi* | [**updateEvictionPolicy**](docs/DatabasesApi.md#updateEvictionPolicy) | **PUT** /v2/databases/{database_cluster_uuid}/eviction_policy | Configure the Eviction Policy for a Redis Cluster
*DigitalOceanApi.DatabasesApi* | [**updateMaintenanceWindow**](docs/DatabasesApi.md#updateMaintenanceWindow) | **PUT** /v2/databases/{database_cluster_uuid}/maintenance | Configure a Database Cluster&#x27;s Maintenance Window
*DigitalOceanApi.DatabasesApi* | [**updateOnlineMigration**](docs/DatabasesApi.md#updateOnlineMigration) | **PUT** /v2/databases/{database_cluster_uuid}/online-migration | Start an Online Migration
*DigitalOceanApi.DatabasesApi* | [**updateSqlMode**](docs/DatabasesApi.md#updateSqlMode) | **PUT** /v2/databases/{database_cluster_uuid}/sql_mode | Update SQL Mode for a Cluster
*DigitalOceanApi.DomainRecordsApi* | [**createDomainRecord**](docs/DomainRecordsApi.md#createDomainRecord) | **POST** /v2/domains/{domain_name}/records | Create a New Domain Record
*DigitalOceanApi.DomainRecordsApi* | [**deleteDomainRecord**](docs/DomainRecordsApi.md#deleteDomainRecord) | **DELETE** /v2/domains/{domain_name}/records/{domain_record_id} | Delete a Domain Record
*DigitalOceanApi.DomainRecordsApi* | [**getDomainRecord**](docs/DomainRecordsApi.md#getDomainRecord) | **GET** /v2/domains/{domain_name}/records/{domain_record_id} | Retrieve an Existing Domain Record
*DigitalOceanApi.DomainRecordsApi* | [**listAllDomainRecords**](docs/DomainRecordsApi.md#listAllDomainRecords) | **GET** /v2/domains/{domain_name}/records | List All Domain Records
*DigitalOceanApi.DomainRecordsApi* | [**patchUpdateDomainRecord**](docs/DomainRecordsApi.md#patchUpdateDomainRecord) | **PATCH** /v2/domains/{domain_name}/records/{domain_record_id} | Update a Domain Record
*DigitalOceanApi.DomainRecordsApi* | [**updateDomainRecord**](docs/DomainRecordsApi.md#updateDomainRecord) | **PUT** /v2/domains/{domain_name}/records/{domain_record_id} | Update a Domain Record
*DigitalOceanApi.DomainsApi* | [**createDomain**](docs/DomainsApi.md#createDomain) | **POST** /v2/domains | Create a New Domain
*DigitalOceanApi.DomainsApi* | [**deleteDomain**](docs/DomainsApi.md#deleteDomain) | **DELETE** /v2/domains/{domain_name} | Delete a Domain
*DigitalOceanApi.DomainsApi* | [**getDomain**](docs/DomainsApi.md#getDomain) | **GET** /v2/domains/{domain_name} | Retrieve an Existing Domain
*DigitalOceanApi.DomainsApi* | [**listAllDomains**](docs/DomainsApi.md#listAllDomains) | **GET** /v2/domains | List All Domains
*DigitalOceanApi.DropletActionsApi* | [**getDropletAction**](docs/DropletActionsApi.md#getDropletAction) | **GET** /v2/droplets/{droplet_id}/actions/{action_id} | Retrieve a Droplet Action
*DigitalOceanApi.DropletActionsApi* | [**listDropletActions**](docs/DropletActionsApi.md#listDropletActions) | **GET** /v2/droplets/{droplet_id}/actions | List Actions for a Droplet
*DigitalOceanApi.DropletActionsApi* | [**postDropletAction**](docs/DropletActionsApi.md#postDropletAction) | **POST** /v2/droplets/{droplet_id}/actions | Initiate a Droplet Action
*DigitalOceanApi.DropletActionsApi* | [**postDropletActionByTag**](docs/DropletActionsApi.md#postDropletActionByTag) | **POST** /v2/droplets/actions | Acting on Tagged Droplets
*DigitalOceanApi.DropletsApi* | [**createDroplet**](docs/DropletsApi.md#createDroplet) | **POST** /v2/droplets | Create a New Droplet
*DigitalOceanApi.DropletsApi* | [**destroyDroplet**](docs/DropletsApi.md#destroyDroplet) | **DELETE** /v2/droplets/{droplet_id} | Delete an Existing Droplet
*DigitalOceanApi.DropletsApi* | [**destroyDropletsByTag**](docs/DropletsApi.md#destroyDropletsByTag) | **DELETE** /v2/droplets | Deleting Droplets by Tag
*DigitalOceanApi.DropletsApi* | [**destroyWithAssociatedResourcesDangerous**](docs/DropletsApi.md#destroyWithAssociatedResourcesDangerous) | **DELETE** /v2/droplets/{droplet_id}/destroy_with_associated_resources/dangerous | Destroy a Droplet and All of its Associated Resources (Dangerous)
*DigitalOceanApi.DropletsApi* | [**destroyWithAssociatedResourcesSelective**](docs/DropletsApi.md#destroyWithAssociatedResourcesSelective) | **DELETE** /v2/droplets/{droplet_id}/destroy_with_associated_resources/selective | Selectively Destroy a Droplet and its Associated Resources
*DigitalOceanApi.DropletsApi* | [**getDestroyWithAssociatedResourcesStatus**](docs/DropletsApi.md#getDestroyWithAssociatedResourcesStatus) | **GET** /v2/droplets/{droplet_id}/destroy_with_associated_resources/status | Check Status of a Droplet Destroy with Associated Resources Request
*DigitalOceanApi.DropletsApi* | [**getDroplet**](docs/DropletsApi.md#getDroplet) | **GET** /v2/droplets/{droplet_id} | Retrieve an Existing Droplet
*DigitalOceanApi.DropletsApi* | [**listAllDropletNeighborsIds**](docs/DropletsApi.md#listAllDropletNeighborsIds) | **GET** /v2/reports/droplet_neighbors_ids | List All Droplet Neighbors
*DigitalOceanApi.DropletsApi* | [**listAllDroplets**](docs/DropletsApi.md#listAllDroplets) | **GET** /v2/droplets | List All Droplets
*DigitalOceanApi.DropletsApi* | [**listDropletAssociatedResources**](docs/DropletsApi.md#listDropletAssociatedResources) | **GET** /v2/droplets/{droplet_id}/destroy_with_associated_resources | List Associated Resources for a Droplet
*DigitalOceanApi.DropletsApi* | [**listDropletBackups**](docs/DropletsApi.md#listDropletBackups) | **GET** /v2/droplets/{droplet_id}/backups | List Backups for a Droplet
*DigitalOceanApi.DropletsApi* | [**listDropletFirewalls**](docs/DropletsApi.md#listDropletFirewalls) | **GET** /v2/droplets/{droplet_id}/firewalls | List all Firewalls Applied to a Droplet
*DigitalOceanApi.DropletsApi* | [**listDropletKernels**](docs/DropletsApi.md#listDropletKernels) | **GET** /v2/droplets/{droplet_id}/kernels | List All Available Kernels for a Droplet
*DigitalOceanApi.DropletsApi* | [**listDropletNeighbors**](docs/DropletsApi.md#listDropletNeighbors) | **GET** /v2/droplets/{droplet_id}/neighbors | List Neighbors for a Droplet
*DigitalOceanApi.DropletsApi* | [**listDropletSnapshots**](docs/DropletsApi.md#listDropletSnapshots) | **GET** /v2/droplets/{droplet_id}/snapshots | List Snapshots for a Droplet
*DigitalOceanApi.DropletsApi* | [**retryDestroyWithAssociatedResource**](docs/DropletsApi.md#retryDestroyWithAssociatedResource) | **POST** /v2/droplets/{droplet_id}/destroy_with_associated_resources/retry | Retry a Droplet Destroy with Associated Resources Request
*DigitalOceanApi.FirewallsApi* | [**addFirewallDroplets**](docs/FirewallsApi.md#addFirewallDroplets) | **POST** /v2/firewalls/{firewall_id}/droplets | Add Droplets to a Firewall
*DigitalOceanApi.FirewallsApi* | [**addFirewallRules**](docs/FirewallsApi.md#addFirewallRules) | **POST** /v2/firewalls/{firewall_id}/rules | Add Rules to a Firewall
*DigitalOceanApi.FirewallsApi* | [**addFirewallTags**](docs/FirewallsApi.md#addFirewallTags) | **POST** /v2/firewalls/{firewall_id}/tags | Add Tags to a Firewall
*DigitalOceanApi.FirewallsApi* | [**createFirewall**](docs/FirewallsApi.md#createFirewall) | **POST** /v2/firewalls | Create a New Firewall
*DigitalOceanApi.FirewallsApi* | [**deleteFirewall**](docs/FirewallsApi.md#deleteFirewall) | **DELETE** /v2/firewalls/{firewall_id} | Delete a Firewall
*DigitalOceanApi.FirewallsApi* | [**deleteFirewallDroplets**](docs/FirewallsApi.md#deleteFirewallDroplets) | **DELETE** /v2/firewalls/{firewall_id}/droplets | Remove Droplets from a Firewall
*DigitalOceanApi.FirewallsApi* | [**deleteFirewallRules**](docs/FirewallsApi.md#deleteFirewallRules) | **DELETE** /v2/firewalls/{firewall_id}/rules | Remove Rules from a Firewall
*DigitalOceanApi.FirewallsApi* | [**deleteFirewallTags**](docs/FirewallsApi.md#deleteFirewallTags) | **DELETE** /v2/firewalls/{firewall_id}/tags | Remove Tags from a Firewall
*DigitalOceanApi.FirewallsApi* | [**getFirewall**](docs/FirewallsApi.md#getFirewall) | **GET** /v2/firewalls/{firewall_id} | Retrieve an Existing Firewall
*DigitalOceanApi.FirewallsApi* | [**listFirewalls**](docs/FirewallsApi.md#listFirewalls) | **GET** /v2/firewalls | List All Firewalls
*DigitalOceanApi.FirewallsApi* | [**updateFirewall**](docs/FirewallsApi.md#updateFirewall) | **PUT** /v2/firewalls/{firewall_id} | Update a Firewall
*DigitalOceanApi.FloatingIPActionsApi* | [**getFloatingIpAction**](docs/FloatingIPActionsApi.md#getFloatingIpAction) | **GET** /v2/floating_ips/{floating_ip}/actions/{action_id} | Retrieve an Existing Floating IP Action
*DigitalOceanApi.FloatingIPActionsApi* | [**listFloatingIpActions**](docs/FloatingIPActionsApi.md#listFloatingIpActions) | **GET** /v2/floating_ips/{floating_ip}/actions | List All Actions for a Floating IP
*DigitalOceanApi.FloatingIPActionsApi* | [**postFloatingIpAction**](docs/FloatingIPActionsApi.md#postFloatingIpAction) | **POST** /v2/floating_ips/{floating_ip}/actions | Initiate a Floating IP Action
*DigitalOceanApi.FloatingIPsApi* | [**createFloatingIp**](docs/FloatingIPsApi.md#createFloatingIp) | **POST** /v2/floating_ips | Create a New Floating IP
*DigitalOceanApi.FloatingIPsApi* | [**deleteFloatingIp**](docs/FloatingIPsApi.md#deleteFloatingIp) | **DELETE** /v2/floating_ips/{floating_ip} | Delete a Floating IPs
*DigitalOceanApi.FloatingIPsApi* | [**getFloatingIp**](docs/FloatingIPsApi.md#getFloatingIp) | **GET** /v2/floating_ips/{floating_ip} | Retrieve an Existing Floating IP
*DigitalOceanApi.FloatingIPsApi* | [**listFloatingIps**](docs/FloatingIPsApi.md#listFloatingIps) | **GET** /v2/floating_ips | List All Floating IPs
*DigitalOceanApi.ImageActionsApi* | [**getImageAction**](docs/ImageActionsApi.md#getImageAction) | **GET** /v2/images/{image_id}/actions/{action_id} | Retrieve an Existing Action
*DigitalOceanApi.ImageActionsApi* | [**listImageActions**](docs/ImageActionsApi.md#listImageActions) | **GET** /v2/images/{image_id}/actions | List All Actions for an Image
*DigitalOceanApi.ImageActionsApi* | [**postImageAction**](docs/ImageActionsApi.md#postImageAction) | **POST** /v2/images/{image_id}/actions | Initiate an Image Action
*DigitalOceanApi.ImagesApi* | [**createCustomImage**](docs/ImagesApi.md#createCustomImage) | **POST** /v2/images | Create a Custom Image
*DigitalOceanApi.ImagesApi* | [**deleteImage**](docs/ImagesApi.md#deleteImage) | **DELETE** /v2/images/{image_id} | Delete an Image
*DigitalOceanApi.ImagesApi* | [**getImage**](docs/ImagesApi.md#getImage) | **GET** /v2/images/{image_id} | Retrieve an Existing Image
*DigitalOceanApi.ImagesApi* | [**getImagesList**](docs/ImagesApi.md#getImagesList) | **GET** /v2/images | List All Images
*DigitalOceanApi.ImagesApi* | [**updateImage**](docs/ImagesApi.md#updateImage) | **PUT** /v2/images/{image_id} | Update an Image
*DigitalOceanApi.KubernetesApi* | [**addKubernetesNodePool**](docs/KubernetesApi.md#addKubernetesNodePool) | **POST** /v2/kubernetes/clusters/{cluster_id}/node_pools | Add a Node Pool to a Kubernetes Cluster
*DigitalOceanApi.KubernetesApi* | [**addRegistry**](docs/KubernetesApi.md#addRegistry) | **POST** /v2/kubernetes/registry | Add Container Registry to Kubernetes Clusters
*DigitalOceanApi.KubernetesApi* | [**createKubernetesCluster**](docs/KubernetesApi.md#createKubernetesCluster) | **POST** /v2/kubernetes/clusters | Create a New Kubernetes Cluster
*DigitalOceanApi.KubernetesApi* | [**deleteKubernetesCluster**](docs/KubernetesApi.md#deleteKubernetesCluster) | **DELETE** /v2/kubernetes/clusters/{cluster_id} | Delete a Kubernetes Cluster
*DigitalOceanApi.KubernetesApi* | [**deleteKubernetesNode**](docs/KubernetesApi.md#deleteKubernetesNode) | **DELETE** /v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}/nodes/{node_id} | Delete a Node in a Kubernetes Cluster
*DigitalOceanApi.KubernetesApi* | [**deleteKubernetesNodePool**](docs/KubernetesApi.md#deleteKubernetesNodePool) | **DELETE** /v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id} | Delete a Node Pool in a Kubernetes Cluster
*DigitalOceanApi.KubernetesApi* | [**destroyKubernetesAssociatedResourcesDangerous**](docs/KubernetesApi.md#destroyKubernetesAssociatedResourcesDangerous) | **DELETE** /v2/kubernetes/clusters/{cluster_id}/destroy_with_associated_resources/dangerous | Delete a Cluster and All of its Associated Resources (Dangerous)
*DigitalOceanApi.KubernetesApi* | [**destroyKubernetesAssociatedResourcesSelective**](docs/KubernetesApi.md#destroyKubernetesAssociatedResourcesSelective) | **DELETE** /v2/kubernetes/clusters/{cluster_id}/destroy_with_associated_resources/selective | Selectively Delete a Cluster and its Associated Resources
*DigitalOceanApi.KubernetesApi* | [**getAvailableUpgrades**](docs/KubernetesApi.md#getAvailableUpgrades) | **GET** /v2/kubernetes/clusters/{cluster_id}/upgrades | Retrieve Available Upgrades for an Existing Kubernetes Cluster
*DigitalOceanApi.KubernetesApi* | [**getClusterUser**](docs/KubernetesApi.md#getClusterUser) | **GET** /v2/kubernetes/clusters/{cluster_id}/user | Retrieve User Information for a Kubernetes Cluster
*DigitalOceanApi.KubernetesApi* | [**getClusterlintResults**](docs/KubernetesApi.md#getClusterlintResults) | **GET** /v2/kubernetes/clusters/{cluster_id}/clusterlint | Fetch Clusterlint Diagnostics for a Kubernetes Cluster
*DigitalOceanApi.KubernetesApi* | [**getCredentials**](docs/KubernetesApi.md#getCredentials) | **GET** /v2/kubernetes/clusters/{cluster_id}/credentials | Retrieve Credentials for a Kubernetes Cluster
*DigitalOceanApi.KubernetesApi* | [**getKubeconfig**](docs/KubernetesApi.md#getKubeconfig) | **GET** /v2/kubernetes/clusters/{cluster_id}/kubeconfig | Retrieve the kubeconfig for a Kubernetes Cluster
*DigitalOceanApi.KubernetesApi* | [**getKubernetesCluster**](docs/KubernetesApi.md#getKubernetesCluster) | **GET** /v2/kubernetes/clusters/{cluster_id} | Retrieve an Existing Kubernetes Cluster
*DigitalOceanApi.KubernetesApi* | [**getNodePool**](docs/KubernetesApi.md#getNodePool) | **GET** /v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id} | Retrieve a Node Pool for a Kubernetes Cluster
*DigitalOceanApi.KubernetesApi* | [**listAllKubernetesClusters**](docs/KubernetesApi.md#listAllKubernetesClusters) | **GET** /v2/kubernetes/clusters | List All Kubernetes Clusters
*DigitalOceanApi.KubernetesApi* | [**listKubernetesAssociatedResources**](docs/KubernetesApi.md#listKubernetesAssociatedResources) | **GET** /v2/kubernetes/clusters/{cluster_id}/destroy_with_associated_resources | List Associated Resources for Cluster Deletion
*DigitalOceanApi.KubernetesApi* | [**listKubernetesOptions**](docs/KubernetesApi.md#listKubernetesOptions) | **GET** /v2/kubernetes/options | List Available Regions, Node Sizes, and Versions of Kubernetes
*DigitalOceanApi.KubernetesApi* | [**listNodePools**](docs/KubernetesApi.md#listNodePools) | **GET** /v2/kubernetes/clusters/{cluster_id}/node_pools | List All Node Pools in a Kubernetes Clusters
*DigitalOceanApi.KubernetesApi* | [**recycleKubernetesNodePool**](docs/KubernetesApi.md#recycleKubernetesNodePool) | **POST** /v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}/recycle | Recycle a Kubernetes Node Pool
*DigitalOceanApi.KubernetesApi* | [**removeRegistry**](docs/KubernetesApi.md#removeRegistry) | **DELETE** /v2/kubernetes/registry | Remove Container Registry from Kubernetes Clusters
*DigitalOceanApi.KubernetesApi* | [**runClusterlint**](docs/KubernetesApi.md#runClusterlint) | **POST** /v2/kubernetes/clusters/{cluster_id}/clusterlint | Run Clusterlint Checks on a Kubernetes Cluster
*DigitalOceanApi.KubernetesApi* | [**updateKubernetesCluster**](docs/KubernetesApi.md#updateKubernetesCluster) | **PUT** /v2/kubernetes/clusters/{cluster_id} | Update a Kubernetes Cluster
*DigitalOceanApi.KubernetesApi* | [**updateKubernetesNodePool**](docs/KubernetesApi.md#updateKubernetesNodePool) | **PUT** /v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id} | Update a Node Pool in a Kubernetes Cluster
*DigitalOceanApi.KubernetesApi* | [**upgradeKubernetesCluster**](docs/KubernetesApi.md#upgradeKubernetesCluster) | **POST** /v2/kubernetes/clusters/{cluster_id}/upgrade | Upgrade a Kubernetes Cluster
*DigitalOceanApi.LoadBalancersApi* | [**addLoadBalancerDroplets**](docs/LoadBalancersApi.md#addLoadBalancerDroplets) | **POST** /v2/load_balancers/{lb_id}/droplets | Add Droplets to a Load Balancer
*DigitalOceanApi.LoadBalancersApi* | [**addLoadBalancerForwardingRules**](docs/LoadBalancersApi.md#addLoadBalancerForwardingRules) | **POST** /v2/load_balancers/{lb_id}/forwarding_rules | Add Forwarding Rules to a Load Balancer
*DigitalOceanApi.LoadBalancersApi* | [**createLoadBalancer**](docs/LoadBalancersApi.md#createLoadBalancer) | **POST** /v2/load_balancers | Create a New Load Balancer
*DigitalOceanApi.LoadBalancersApi* | [**deleteLoadBalancer**](docs/LoadBalancersApi.md#deleteLoadBalancer) | **DELETE** /v2/load_balancers/{lb_id} | Delete a Load Balancer
*DigitalOceanApi.LoadBalancersApi* | [**getLoadBalancer**](docs/LoadBalancersApi.md#getLoadBalancer) | **GET** /v2/load_balancers/{lb_id} | Retrieve an Existing Load Balancer
*DigitalOceanApi.LoadBalancersApi* | [**listAllLoadBalancers**](docs/LoadBalancersApi.md#listAllLoadBalancers) | **GET** /v2/load_balancers | List All Load Balancers
*DigitalOceanApi.LoadBalancersApi* | [**removeLoadBalancerDroplets**](docs/LoadBalancersApi.md#removeLoadBalancerDroplets) | **DELETE** /v2/load_balancers/{lb_id}/droplets | Remove Droplets from a Load Balancer
*DigitalOceanApi.LoadBalancersApi* | [**removeLoadBalancerForwardingRules**](docs/LoadBalancersApi.md#removeLoadBalancerForwardingRules) | **DELETE** /v2/load_balancers/{lb_id}/forwarding_rules | Remove Forwarding Rules from a Load Balancer
*DigitalOceanApi.LoadBalancersApi* | [**updateLoadBalancer**](docs/LoadBalancersApi.md#updateLoadBalancer) | **PUT** /v2/load_balancers/{lb_id} | Update a Load Balancer
*DigitalOceanApi.MonitoringApi* | [**createAlertPolicy**](docs/MonitoringApi.md#createAlertPolicy) | **POST** /v2/monitoring/alerts | Create Alert Policy
*DigitalOceanApi.MonitoringApi* | [**deleteAlertPolicy**](docs/MonitoringApi.md#deleteAlertPolicy) | **DELETE** /v2/monitoring/alerts/{alert_uuid} | Delete an Alert Policy
*DigitalOceanApi.MonitoringApi* | [**getAlertPolicy**](docs/MonitoringApi.md#getAlertPolicy) | **GET** /v2/monitoring/alerts/{alert_uuid} | Retrieve an Existing Alert Policy
*DigitalOceanApi.MonitoringApi* | [**getDropletBandwidthMetrics**](docs/MonitoringApi.md#getDropletBandwidthMetrics) | **GET** /v2/monitoring/metrics/droplet/bandwidth | Get Droplet Bandwidth Metrics
*DigitalOceanApi.MonitoringApi* | [**getDropletCpuMetrics**](docs/MonitoringApi.md#getDropletCpuMetrics) | **GET** /v2/monitoring/metrics/droplet/cpu | Get Droplet CPU Metrics
*DigitalOceanApi.MonitoringApi* | [**getDropletFilesystemFreeMetrics**](docs/MonitoringApi.md#getDropletFilesystemFreeMetrics) | **GET** /v2/monitoring/metrics/droplet/filesystem_free | Get Droplet Filesystem Free Metrics
*DigitalOceanApi.MonitoringApi* | [**getDropletFilesystemSizeMetrics**](docs/MonitoringApi.md#getDropletFilesystemSizeMetrics) | **GET** /v2/monitoring/metrics/droplet/filesystem_size | Get Droplet Filesystem Size Metrics
*DigitalOceanApi.MonitoringApi* | [**getDropletLoad15Metrics**](docs/MonitoringApi.md#getDropletLoad15Metrics) | **GET** /v2/monitoring/metrics/droplet/load_15 | Get Droplet Load15 Metrics
*DigitalOceanApi.MonitoringApi* | [**getDropletLoad1Metrics**](docs/MonitoringApi.md#getDropletLoad1Metrics) | **GET** /v2/monitoring/metrics/droplet/load_1 | Get Droplet Load1 Metrics
*DigitalOceanApi.MonitoringApi* | [**getDropletLoad5Metrics**](docs/MonitoringApi.md#getDropletLoad5Metrics) | **GET** /v2/monitoring/metrics/droplet/load_5 | Get Droplet Load5 Metrics
*DigitalOceanApi.MonitoringApi* | [**getDropletMemoryAvailableMetrics**](docs/MonitoringApi.md#getDropletMemoryAvailableMetrics) | **GET** /v2/monitoring/metrics/droplet/memory_available | Get Droplet Available Memory Metrics
*DigitalOceanApi.MonitoringApi* | [**getDropletMemoryCachedMetrics**](docs/MonitoringApi.md#getDropletMemoryCachedMetrics) | **GET** /v2/monitoring/metrics/droplet/memory_cached | Get Droplet Cached Memory Metrics
*DigitalOceanApi.MonitoringApi* | [**getDropletMemoryFreeMetrics**](docs/MonitoringApi.md#getDropletMemoryFreeMetrics) | **GET** /v2/monitoring/metrics/droplet/memory_free | Get Droplet Free Memory Metrics
*DigitalOceanApi.MonitoringApi* | [**getDropletMemoryTotalMetrics**](docs/MonitoringApi.md#getDropletMemoryTotalMetrics) | **GET** /v2/monitoring/metrics/droplet/memory_total | Get Droplet Total Memory Metrics
*DigitalOceanApi.MonitoringApi* | [**listAlertPolicies**](docs/MonitoringApi.md#listAlertPolicies) | **GET** /v2/monitoring/alerts | List Alert Policies
*DigitalOceanApi.MonitoringApi* | [**updateAlertPolicy**](docs/MonitoringApi.md#updateAlertPolicy) | **PUT** /v2/monitoring/alerts/{alert_uuid} | Update an Alert Policy
*DigitalOceanApi.ProjectResourcesApi* | [**assignDefaultProjectResources**](docs/ProjectResourcesApi.md#assignDefaultProjectResources) | **POST** /v2/projects/default/resources | Assign Resources to Default Project
*DigitalOceanApi.ProjectResourcesApi* | [**assignProjectResources**](docs/ProjectResourcesApi.md#assignProjectResources) | **POST** /v2/projects/{project_id}/resources | Assign Resources to a Project
*DigitalOceanApi.ProjectResourcesApi* | [**listDefaultProjectResources**](docs/ProjectResourcesApi.md#listDefaultProjectResources) | **GET** /v2/projects/default/resources | List Default Project Resources
*DigitalOceanApi.ProjectResourcesApi* | [**listProjectResources**](docs/ProjectResourcesApi.md#listProjectResources) | **GET** /v2/projects/{project_id}/resources | List Project Resources
*DigitalOceanApi.ProjectsApi* | [**createProject**](docs/ProjectsApi.md#createProject) | **POST** /v2/projects | Create a Project
*DigitalOceanApi.ProjectsApi* | [**deleteProject**](docs/ProjectsApi.md#deleteProject) | **DELETE** /v2/projects/{project_id} | Delete an Existing Project
*DigitalOceanApi.ProjectsApi* | [**getDefaultProject**](docs/ProjectsApi.md#getDefaultProject) | **GET** /v2/projects/default | Retrieve the Default Project
*DigitalOceanApi.ProjectsApi* | [**getProject**](docs/ProjectsApi.md#getProject) | **GET** /v2/projects/{project_id} | Retrieve an Existing Project
*DigitalOceanApi.ProjectsApi* | [**listProjects**](docs/ProjectsApi.md#listProjects) | **GET** /v2/projects | List All Projects
*DigitalOceanApi.ProjectsApi* | [**patchDefaultProject**](docs/ProjectsApi.md#patchDefaultProject) | **PATCH** /v2/projects/default | Patch the Default Project
*DigitalOceanApi.ProjectsApi* | [**patchProject**](docs/ProjectsApi.md#patchProject) | **PATCH** /v2/projects/{project_id} | Patch a Project
*DigitalOceanApi.ProjectsApi* | [**updateDefaultProject**](docs/ProjectsApi.md#updateDefaultProject) | **PUT** /v2/projects/default | Update the Default Project
*DigitalOceanApi.ProjectsApi* | [**updateProject**](docs/ProjectsApi.md#updateProject) | **PUT** /v2/projects/{project_id} | Update a Project
*DigitalOceanApi.RegionsApi* | [**listAllRegions**](docs/RegionsApi.md#listAllRegions) | **GET** /v2/regions | List All Data Center Regions
*DigitalOceanApi.SSHKeysApi* | [**createSshKey**](docs/SSHKeysApi.md#createSshKey) | **POST** /v2/account/keys | Create a New SSH Key
*DigitalOceanApi.SSHKeysApi* | [**destroySshKey**](docs/SSHKeysApi.md#destroySshKey) | **DELETE** /v2/account/keys/{ssh_key_identifier} | Delete an SSH Key
*DigitalOceanApi.SSHKeysApi* | [**getSshKey**](docs/SSHKeysApi.md#getSshKey) | **GET** /v2/account/keys/{ssh_key_identifier} | Retrieve an Existing SSH Key
*DigitalOceanApi.SSHKeysApi* | [**listAllKeys**](docs/SSHKeysApi.md#listAllKeys) | **GET** /v2/account/keys | List All SSH Keys
*DigitalOceanApi.SSHKeysApi* | [**updateSshKey**](docs/SSHKeysApi.md#updateSshKey) | **PUT** /v2/account/keys/{ssh_key_identifier} | Update an SSH Key&#x27;s Name
*DigitalOceanApi.SizesApi* | [**listAllSizes**](docs/SizesApi.md#listAllSizes) | **GET** /v2/sizes | List All Droplet Sizes
*DigitalOceanApi.SnapshotsApi* | [**deleteSnapshot**](docs/SnapshotsApi.md#deleteSnapshot) | **DELETE** /v2/snapshots/{snapshot_id} | Delete a Snapshot
*DigitalOceanApi.SnapshotsApi* | [**getSnapshot**](docs/SnapshotsApi.md#getSnapshot) | **GET** /v2/snapshots/{snapshot_id} | Retrieve an Existing Snapshot
*DigitalOceanApi.SnapshotsApi* | [**listAllSnapshots**](docs/SnapshotsApi.md#listAllSnapshots) | **GET** /v2/snapshots | List All Snapshots
*DigitalOceanApi.TagsApi* | [**createNewTag**](docs/TagsApi.md#createNewTag) | **POST** /v2/tags | Create a New Tag
*DigitalOceanApi.TagsApi* | [**deleteTag**](docs/TagsApi.md#deleteTag) | **DELETE** /v2/tags/{tag_id} | Delete a Tag
*DigitalOceanApi.TagsApi* | [**getTag**](docs/TagsApi.md#getTag) | **GET** /v2/tags/{tag_id} | Retrieve a Tag
*DigitalOceanApi.TagsApi* | [**listAllTags**](docs/TagsApi.md#listAllTags) | **GET** /v2/tags | List All Tags
*DigitalOceanApi.TagsApi* | [**tagResource**](docs/TagsApi.md#tagResource) | **POST** /v2/tags/{tag_id}/resources | Tag a Resource
*DigitalOceanApi.TagsApi* | [**untagResource**](docs/TagsApi.md#untagResource) | **DELETE** /v2/tags/{tag_id}/resources | Untag a Resource
*DigitalOceanApi.VPCsApi* | [**createVpc**](docs/VPCsApi.md#createVpc) | **POST** /v2/vpcs | Create a New VPC
*DigitalOceanApi.VPCsApi* | [**deleteVpc**](docs/VPCsApi.md#deleteVpc) | **DELETE** /v2/vpcs/{vpc_id} | Delete a VPC
*DigitalOceanApi.VPCsApi* | [**getVpc**](docs/VPCsApi.md#getVpc) | **GET** /v2/vpcs/{vpc_id} | Retrieve an Existing VPC
*DigitalOceanApi.VPCsApi* | [**listVpcMembers**](docs/VPCsApi.md#listVpcMembers) | **GET** /v2/vpcs/{vpc_id}/members | List the Member Resources of a VPC
*DigitalOceanApi.VPCsApi* | [**listVpcs**](docs/VPCsApi.md#listVpcs) | **GET** /v2/vpcs | List All VPCs
*DigitalOceanApi.VPCsApi* | [**patchVpc**](docs/VPCsApi.md#patchVpc) | **PATCH** /v2/vpcs/{vpc_id} | Partially Update a VPC
*DigitalOceanApi.VPCsApi* | [**updateVpc**](docs/VPCsApi.md#updateVpc) | **PUT** /v2/vpcs/{vpc_id} | Update a VPC

## Documentation for Models

 - [DigitalOceanApi.Account](docs/Account.md)
 - [DigitalOceanApi.Action](docs/Action.md)
 - [DigitalOceanApi.ActionLink](docs/ActionLink.md)
 - [DigitalOceanApi.AlertPolicy](docs/AlertPolicy.md)
 - [DigitalOceanApi.AlertPolicyRequest](docs/AlertPolicyRequest.md)
 - [DigitalOceanApi.Alerts](docs/Alerts.md)
 - [DigitalOceanApi.AllOfactionRegionSlug](docs/AllOfactionRegionSlug.md)
 - [DigitalOceanApi.AllOfconnectionPoolConnection](docs/AllOfconnectionPoolConnection.md)
 - [DigitalOceanApi.AllOfconnectionPoolPrivateConnection](docs/AllOfconnectionPoolPrivateConnection.md)
 - [DigitalOceanApi.AllOfdatabaseClusterConnection](docs/AllOfdatabaseClusterConnection.md)
 - [DigitalOceanApi.AllOfdatabaseClusterMaintenanceWindow](docs/AllOfdatabaseClusterMaintenanceWindow.md)
 - [DigitalOceanApi.AllOfdatabaseClusterPrivateConnection](docs/AllOfdatabaseClusterPrivateConnection.md)
 - [DigitalOceanApi.AllOfdatabaseReplicaConnection](docs/AllOfdatabaseReplicaConnection.md)
 - [DigitalOceanApi.AllOfdatabaseReplicaPrivateConnection](docs/AllOfdatabaseReplicaPrivateConnection.md)
 - [DigitalOceanApi.AllOffirewallIdTagsBody1Tags](docs/AllOffirewallIdTagsBody1Tags.md)
 - [DigitalOceanApi.AllOffirewallIdTagsBodyTags](docs/AllOffirewallIdTagsBodyTags.md)
 - [DigitalOceanApi.AllOffirewallRuleTargetTags](docs/AllOffirewallRuleTargetTags.md)
 - [DigitalOceanApi.AllOffirewallRulesInboundRulesItems](docs/AllOffirewallRulesInboundRulesItems.md)
 - [DigitalOceanApi.AllOffirewallRulesOutboundRulesItems](docs/AllOffirewallRulesOutboundRulesItems.md)
 - [DigitalOceanApi.AllOffloatingIpRegion](docs/AllOffloatingIpRegion.md)
 - [DigitalOceanApi.AllOfinlineResponse20051OptionsSubscriptionTiersItems](docs/AllOfinlineResponse20051OptionsSubscriptionTiersItems.md)
 - [DigitalOceanApi.AllOfinvoiceSummaryCreditsAndAdjustments](docs/AllOfinvoiceSummaryCreditsAndAdjustments.md)
 - [DigitalOceanApi.AllOfinvoiceSummaryOverages](docs/AllOfinvoiceSummaryOverages.md)
 - [DigitalOceanApi.AllOfinvoiceSummaryProductCharges](docs/AllOfinvoiceSummaryProductCharges.md)
 - [DigitalOceanApi.AllOfinvoiceSummaryTaxes](docs/AllOfinvoiceSummaryTaxes.md)
 - [DigitalOceanApi.AllOfinvoiceSummaryUserBillingAddress](docs/AllOfinvoiceSummaryUserBillingAddress.md)
 - [DigitalOceanApi.AllOfregistrySubscription](docs/AllOfregistrySubscription.md)
 - [DigitalOceanApi.AllOfsourceDatabaseSource](docs/AllOfsourceDatabaseSource.md)
 - [DigitalOceanApi.AllOftagResources](docs/AllOftagResources.md)
 - [DigitalOceanApi.AnyOfdomainNameRecordsBody](docs/AnyOfdomainNameRecordsBody.md)
 - [DigitalOceanApi.AnyOfdropletCreateSshKeysItems](docs/AnyOfdropletCreateSshKeysItems.md)
 - [DigitalOceanApi.AnyOfdropletIdActionsBody](docs/AnyOfdropletIdActionsBody.md)
 - [DigitalOceanApi.AnyOffloatingIpActionsBody](docs/AnyOffloatingIpActionsBody.md)
 - [DigitalOceanApi.AnyOffloatingIpDroplet](docs/AnyOffloatingIpDroplet.md)
 - [DigitalOceanApi.AnyOfimageId](docs/AnyOfimageId.md)
 - [DigitalOceanApi.AnyOfimageIdActionsBody](docs/AnyOfimageIdActionsBody.md)
 - [DigitalOceanApi.AnyOfpageLinksPages](docs/AnyOfpageLinksPages.md)
 - [DigitalOceanApi.AnyOfsnapshotId](docs/AnyOfsnapshotId.md)
 - [DigitalOceanApi.AnyOfsshKeyIdentifier](docs/AnyOfsshKeyIdentifier.md)
 - [DigitalOceanApi.AnyOfv2VolumesBody](docs/AnyOfv2VolumesBody.md)
 - [DigitalOceanApi.AnyOfvolumeIdActionsBody](docs/AnyOfvolumeIdActionsBody.md)
 - [DigitalOceanApi.AnyOfvolumesActionsBody](docs/AnyOfvolumesActionsBody.md)
 - [DigitalOceanApi.App](docs/App.md)
 - [DigitalOceanApi.AppComponentBase](docs/AppComponentBase.md)
 - [DigitalOceanApi.AppComponentInstanceBase](docs/AppComponentInstanceBase.md)
 - [DigitalOceanApi.AppDatabaseSpec](docs/AppDatabaseSpec.md)
 - [DigitalOceanApi.AppDomainSpec](docs/AppDomainSpec.md)
 - [DigitalOceanApi.AppJobSpec](docs/AppJobSpec.md)
 - [DigitalOceanApi.AppPropose](docs/AppPropose.md)
 - [DigitalOceanApi.AppProposeResponse](docs/AppProposeResponse.md)
 - [DigitalOceanApi.AppResponse](docs/AppResponse.md)
 - [DigitalOceanApi.AppRouteSpec](docs/AppRouteSpec.md)
 - [DigitalOceanApi.AppServiceSpec](docs/AppServiceSpec.md)
 - [DigitalOceanApi.AppServiceSpecHealthCheck](docs/AppServiceSpecHealthCheck.md)
 - [DigitalOceanApi.AppSpec](docs/AppSpec.md)
 - [DigitalOceanApi.AppStaticSiteSpec](docs/AppStaticSiteSpec.md)
 - [DigitalOceanApi.AppVariableDefinition](docs/AppVariableDefinition.md)
 - [DigitalOceanApi.AppWorkerSpec](docs/AppWorkerSpec.md)
 - [DigitalOceanApi.AppsCorsPolicy](docs/AppsCorsPolicy.md)
 - [DigitalOceanApi.AppsCreateAppRequest](docs/AppsCreateAppRequest.md)
 - [DigitalOceanApi.AppsCreateDeploymentRequest](docs/AppsCreateDeploymentRequest.md)
 - [DigitalOceanApi.AppsDeleteAppResponse](docs/AppsDeleteAppResponse.md)
 - [DigitalOceanApi.AppsDeployment](docs/AppsDeployment.md)
 - [DigitalOceanApi.AppsDeploymentJob](docs/AppsDeploymentJob.md)
 - [DigitalOceanApi.AppsDeploymentPhase](docs/AppsDeploymentPhase.md)
 - [DigitalOceanApi.AppsDeploymentProgress](docs/AppsDeploymentProgress.md)
 - [DigitalOceanApi.AppsDeploymentProgressStep](docs/AppsDeploymentProgressStep.md)
 - [DigitalOceanApi.AppsDeploymentProgressStepReason](docs/AppsDeploymentProgressStepReason.md)
 - [DigitalOceanApi.AppsDeploymentProgressStepStatus](docs/AppsDeploymentProgressStepStatus.md)
 - [DigitalOceanApi.AppsDeploymentResponse](docs/AppsDeploymentResponse.md)
 - [DigitalOceanApi.AppsDeploymentService](docs/AppsDeploymentService.md)
 - [DigitalOceanApi.AppsDeploymentStaticSite](docs/AppsDeploymentStaticSite.md)
 - [DigitalOceanApi.AppsDeploymentWorker](docs/AppsDeploymentWorker.md)
 - [DigitalOceanApi.AppsDeploymentsResponse](docs/AppsDeploymentsResponse.md)
 - [DigitalOceanApi.AppsDomain](docs/AppsDomain.md)
 - [DigitalOceanApi.AppsDomainPhase](docs/AppsDomainPhase.md)
 - [DigitalOceanApi.AppsDomainProgress](docs/AppsDomainProgress.md)
 - [DigitalOceanApi.AppsGetInstanceSizeResponse](docs/AppsGetInstanceSizeResponse.md)
 - [DigitalOceanApi.AppsGetLogsResponse](docs/AppsGetLogsResponse.md)
 - [DigitalOceanApi.AppsGetTierResponse](docs/AppsGetTierResponse.md)
 - [DigitalOceanApi.AppsGitSourceSpec](docs/AppsGitSourceSpec.md)
 - [DigitalOceanApi.AppsGithubSourceSpec](docs/AppsGithubSourceSpec.md)
 - [DigitalOceanApi.AppsGitlabSourceSpec](docs/AppsGitlabSourceSpec.md)
 - [DigitalOceanApi.AppsImageSourceSpec](docs/AppsImageSourceSpec.md)
 - [DigitalOceanApi.AppsInstanceSize](docs/AppsInstanceSize.md)
 - [DigitalOceanApi.AppsListInstanceSizesResponse](docs/AppsListInstanceSizesResponse.md)
 - [DigitalOceanApi.AppsListRegionsResponse](docs/AppsListRegionsResponse.md)
 - [DigitalOceanApi.AppsListTiersResponse](docs/AppsListTiersResponse.md)
 - [DigitalOceanApi.AppsRegion](docs/AppsRegion.md)
 - [DigitalOceanApi.AppsResponse](docs/AppsResponse.md)
 - [DigitalOceanApi.AppsStringMatch](docs/AppsStringMatch.md)
 - [DigitalOceanApi.AppsTier](docs/AppsTier.md)
 - [DigitalOceanApi.AppsUpdateAppRequest](docs/AppsUpdateAppRequest.md)
 - [DigitalOceanApi.AssociatedKubernetesResource](docs/AssociatedKubernetesResource.md)
 - [DigitalOceanApi.AssociatedKubernetesResources](docs/AssociatedKubernetesResources.md)
 - [DigitalOceanApi.AssociatedResource](docs/AssociatedResource.md)
 - [DigitalOceanApi.AssociatedResourceStatus](docs/AssociatedResourceStatus.md)
 - [DigitalOceanApi.AssociatedResourceStatusResources](docs/AssociatedResourceStatusResources.md)
 - [DigitalOceanApi.Backup](docs/Backup.md)
 - [DigitalOceanApi.BackwardLinks](docs/BackwardLinks.md)
 - [DigitalOceanApi.Balance](docs/Balance.md)
 - [DigitalOceanApi.BillingAddress](docs/BillingAddress.md)
 - [DigitalOceanApi.BillingHistory](docs/BillingHistory.md)
 - [DigitalOceanApi.Ca](docs/Ca.md)
 - [DigitalOceanApi.CdnEndpoint](docs/CdnEndpoint.md)
 - [DigitalOceanApi.Certificate](docs/Certificate.md)
 - [DigitalOceanApi.CertificateCreateBase](docs/CertificateCreateBase.md)
 - [DigitalOceanApi.CertificateRequestCustom](docs/CertificateRequestCustom.md)
 - [DigitalOceanApi.CertificateRequestLetsEncrypt](docs/CertificateRequestLetsEncrypt.md)
 - [DigitalOceanApi.Cluster](docs/Cluster.md)
 - [DigitalOceanApi.ClusterIdUpgradeBody](docs/ClusterIdUpgradeBody.md)
 - [DigitalOceanApi.ClusterRegistries](docs/ClusterRegistries.md)
 - [DigitalOceanApi.ClusterStatus](docs/ClusterStatus.md)
 - [DigitalOceanApi.ClusterUpdate](docs/ClusterUpdate.md)
 - [DigitalOceanApi.ClusterlintRequest](docs/ClusterlintRequest.md)
 - [DigitalOceanApi.ClusterlintResults](docs/ClusterlintResults.md)
 - [DigitalOceanApi.ClusterlintResultsDiagnostics](docs/ClusterlintResultsDiagnostics.md)
 - [DigitalOceanApi.ClusterlintResultsObject](docs/ClusterlintResultsObject.md)
 - [DigitalOceanApi.ConnectionPool](docs/ConnectionPool.md)
 - [DigitalOceanApi.ConnectionPools](docs/ConnectionPools.md)
 - [DigitalOceanApi.Credentials](docs/Credentials.md)
 - [DigitalOceanApi.Database](docs/Database.md)
 - [DigitalOceanApi.DatabaseBackup](docs/DatabaseBackup.md)
 - [DigitalOceanApi.DatabaseCluster](docs/DatabaseCluster.md)
 - [DigitalOceanApi.DatabaseClusterResize](docs/DatabaseClusterResize.md)
 - [DigitalOceanApi.DatabaseClusterUuidFirewallBody](docs/DatabaseClusterUuidFirewallBody.md)
 - [DigitalOceanApi.DatabaseClusterUuidMigrateBody](docs/DatabaseClusterUuidMigrateBody.md)
 - [DigitalOceanApi.DatabaseClusterUuidReplicasBody](docs/DatabaseClusterUuidReplicasBody.md)
 - [DigitalOceanApi.DatabaseConnection](docs/DatabaseConnection.md)
 - [DigitalOceanApi.DatabaseMaintenanceWindow](docs/DatabaseMaintenanceWindow.md)
 - [DigitalOceanApi.DatabaseReplica](docs/DatabaseReplica.md)
 - [DigitalOceanApi.DatabaseUser](docs/DatabaseUser.md)
 - [DigitalOceanApi.DestroyAssociatedKubernetesResources](docs/DestroyAssociatedKubernetesResources.md)
 - [DigitalOceanApi.DestroyedAssociatedResource](docs/DestroyedAssociatedResource.md)
 - [DigitalOceanApi.Distribution](docs/Distribution.md)
 - [DigitalOceanApi.DockerCredentials](docs/DockerCredentials.md)
 - [DigitalOceanApi.DockerCredentialsAuths](docs/DockerCredentialsAuths.md)
 - [DigitalOceanApi.DockerCredentialsAuthsRegistryDigitaloceanCom](docs/DockerCredentialsAuthsRegistryDigitaloceanCom.md)
 - [DigitalOceanApi.Domain](docs/Domain.md)
 - [DigitalOceanApi.DomainNameRecordsBody](docs/DomainNameRecordsBody.md)
 - [DigitalOceanApi.DomainRecord](docs/DomainRecord.md)
 - [DigitalOceanApi.DomainRecordA](docs/DomainRecordA.md)
 - [DigitalOceanApi.DomainRecordAaaa](docs/DomainRecordAaaa.md)
 - [DigitalOceanApi.DomainRecordCaa](docs/DomainRecordCaa.md)
 - [DigitalOceanApi.DomainRecordCname](docs/DomainRecordCname.md)
 - [DigitalOceanApi.DomainRecordMx](docs/DomainRecordMx.md)
 - [DigitalOceanApi.DomainRecordNs](docs/DomainRecordNs.md)
 - [DigitalOceanApi.DomainRecordSoa](docs/DomainRecordSoa.md)
 - [DigitalOceanApi.DomainRecordSrv](docs/DomainRecordSrv.md)
 - [DigitalOceanApi.DomainRecordTxt](docs/DomainRecordTxt.md)
 - [DigitalOceanApi.Droplet](docs/Droplet.md)
 - [DigitalOceanApi.DropletActionChangeKernel](docs/DropletActionChangeKernel.md)
 - [DigitalOceanApi.DropletActionRebuild](docs/DropletActionRebuild.md)
 - [DigitalOceanApi.DropletActionRename](docs/DropletActionRename.md)
 - [DigitalOceanApi.DropletActionResize](docs/DropletActionResize.md)
 - [DigitalOceanApi.DropletActionRestore](docs/DropletActionRestore.md)
 - [DigitalOceanApi.DropletActionSnapshot](docs/DropletActionSnapshot.md)
 - [DigitalOceanApi.DropletActionType](docs/DropletActionType.md)
 - [DigitalOceanApi.DropletCreate](docs/DropletCreate.md)
 - [DigitalOceanApi.DropletIdActionsBody](docs/DropletIdActionsBody.md)
 - [DigitalOceanApi.DropletMultiCreate](docs/DropletMultiCreate.md)
 - [DigitalOceanApi.DropletNetworks](docs/DropletNetworks.md)
 - [DigitalOceanApi.DropletNextBackupWindow](docs/DropletNextBackupWindow.md)
 - [DigitalOceanApi.DropletSingleCreate](docs/DropletSingleCreate.md)
 - [DigitalOceanApi.DropletSnapshot](docs/DropletSnapshot.md)
 - [DigitalOceanApi.DropletsActionsBody](docs/DropletsActionsBody.md)
 - [DigitalOceanApi.Error](docs/Error.md)
 - [DigitalOceanApi.ErrorWithRootCauses](docs/ErrorWithRootCauses.md)
 - [DigitalOceanApi.EvictionPolicy](docs/EvictionPolicy.md)
 - [DigitalOceanApi.Firewall](docs/Firewall.md)
 - [DigitalOceanApi.FirewallIdDropletsBody](docs/FirewallIdDropletsBody.md)
 - [DigitalOceanApi.FirewallIdDropletsBody1](docs/FirewallIdDropletsBody1.md)
 - [DigitalOceanApi.FirewallIdRulesBody](docs/FirewallIdRulesBody.md)
 - [DigitalOceanApi.FirewallIdRulesBody1](docs/FirewallIdRulesBody1.md)
 - [DigitalOceanApi.FirewallIdTagsBody](docs/FirewallIdTagsBody.md)
 - [DigitalOceanApi.FirewallIdTagsBody1](docs/FirewallIdTagsBody1.md)
 - [DigitalOceanApi.FirewallPendingChanges](docs/FirewallPendingChanges.md)
 - [DigitalOceanApi.FirewallRule](docs/FirewallRule.md)
 - [DigitalOceanApi.FirewallRuleBase](docs/FirewallRuleBase.md)
 - [DigitalOceanApi.FirewallRuleTarget](docs/FirewallRuleTarget.md)
 - [DigitalOceanApi.FirewallRules](docs/FirewallRules.md)
 - [DigitalOceanApi.FirewallsFirewallIdBody](docs/FirewallsFirewallIdBody.md)
 - [DigitalOceanApi.FloatingIp](docs/FloatingIp.md)
 - [DigitalOceanApi.FloatingIpActionAssign](docs/FloatingIpActionAssign.md)
 - [DigitalOceanApi.FloatingIpActionType](docs/FloatingIpActionType.md)
 - [DigitalOceanApi.FloatingIpActionUnassign](docs/FloatingIpActionUnassign.md)
 - [DigitalOceanApi.FloatingIpActionsBody](docs/FloatingIpActionsBody.md)
 - [DigitalOceanApi.FloatingIpCreate](docs/FloatingIpCreate.md)
 - [DigitalOceanApi.ForwardLinks](docs/ForwardLinks.md)
 - [DigitalOceanApi.ForwardingRule](docs/ForwardingRule.md)
 - [DigitalOceanApi.GarbageCollection](docs/GarbageCollection.md)
 - [DigitalOceanApi.HealthCheck](docs/HealthCheck.md)
 - [DigitalOceanApi.Image](docs/Image.md)
 - [DigitalOceanApi.ImageActionBase](docs/ImageActionBase.md)
 - [DigitalOceanApi.ImageActionTransfer](docs/ImageActionTransfer.md)
 - [DigitalOceanApi.ImageDescription](docs/ImageDescription.md)
 - [DigitalOceanApi.ImageId](docs/ImageId.md)
 - [DigitalOceanApi.ImageIdActionsBody](docs/ImageIdActionsBody.md)
 - [DigitalOceanApi.ImageName](docs/ImageName.md)
 - [DigitalOceanApi.ImageNewCustom](docs/ImageNewCustom.md)
 - [DigitalOceanApi.ImageUpdate](docs/ImageUpdate.md)
 - [DigitalOceanApi.InlineResponse200](docs/InlineResponse200.md)
 - [DigitalOceanApi.InlineResponse2001](docs/InlineResponse2001.md)
 - [DigitalOceanApi.InlineResponse20010](docs/InlineResponse20010.md)
 - [DigitalOceanApi.InlineResponse20011](docs/InlineResponse20011.md)
 - [DigitalOceanApi.InlineResponse20012](docs/InlineResponse20012.md)
 - [DigitalOceanApi.InlineResponse20013](docs/InlineResponse20013.md)
 - [DigitalOceanApi.InlineResponse20014](docs/InlineResponse20014.md)
 - [DigitalOceanApi.InlineResponse20015](docs/InlineResponse20015.md)
 - [DigitalOceanApi.InlineResponse20016](docs/InlineResponse20016.md)
 - [DigitalOceanApi.InlineResponse20017](docs/InlineResponse20017.md)
 - [DigitalOceanApi.InlineResponse20018](docs/InlineResponse20018.md)
 - [DigitalOceanApi.InlineResponse20019](docs/InlineResponse20019.md)
 - [DigitalOceanApi.InlineResponse2002](docs/InlineResponse2002.md)
 - [DigitalOceanApi.InlineResponse20020](docs/InlineResponse20020.md)
 - [DigitalOceanApi.InlineResponse20021](docs/InlineResponse20021.md)
 - [DigitalOceanApi.InlineResponse20022](docs/InlineResponse20022.md)
 - [DigitalOceanApi.InlineResponse20023](docs/InlineResponse20023.md)
 - [DigitalOceanApi.InlineResponse20024](docs/InlineResponse20024.md)
 - [DigitalOceanApi.InlineResponse20025](docs/InlineResponse20025.md)
 - [DigitalOceanApi.InlineResponse20026](docs/InlineResponse20026.md)
 - [DigitalOceanApi.InlineResponse20027](docs/InlineResponse20027.md)
 - [DigitalOceanApi.InlineResponse20028](docs/InlineResponse20028.md)
 - [DigitalOceanApi.InlineResponse20029](docs/InlineResponse20029.md)
 - [DigitalOceanApi.InlineResponse2003](docs/InlineResponse2003.md)
 - [DigitalOceanApi.InlineResponse20030](docs/InlineResponse20030.md)
 - [DigitalOceanApi.InlineResponse20031](docs/InlineResponse20031.md)
 - [DigitalOceanApi.InlineResponse20032](docs/InlineResponse20032.md)
 - [DigitalOceanApi.InlineResponse20033](docs/InlineResponse20033.md)
 - [DigitalOceanApi.InlineResponse20034](docs/InlineResponse20034.md)
 - [DigitalOceanApi.InlineResponse20035](docs/InlineResponse20035.md)
 - [DigitalOceanApi.InlineResponse20036](docs/InlineResponse20036.md)
 - [DigitalOceanApi.InlineResponse20037](docs/InlineResponse20037.md)
 - [DigitalOceanApi.InlineResponse20038](docs/InlineResponse20038.md)
 - [DigitalOceanApi.InlineResponse20039](docs/InlineResponse20039.md)
 - [DigitalOceanApi.InlineResponse2004](docs/InlineResponse2004.md)
 - [DigitalOceanApi.InlineResponse20040](docs/InlineResponse20040.md)
 - [DigitalOceanApi.InlineResponse20041](docs/InlineResponse20041.md)
 - [DigitalOceanApi.InlineResponse20042](docs/InlineResponse20042.md)
 - [DigitalOceanApi.InlineResponse20043](docs/InlineResponse20043.md)
 - [DigitalOceanApi.InlineResponse20044](docs/InlineResponse20044.md)
 - [DigitalOceanApi.InlineResponse20045](docs/InlineResponse20045.md)
 - [DigitalOceanApi.InlineResponse20046](docs/InlineResponse20046.md)
 - [DigitalOceanApi.InlineResponse20047](docs/InlineResponse20047.md)
 - [DigitalOceanApi.InlineResponse20048](docs/InlineResponse20048.md)
 - [DigitalOceanApi.InlineResponse20049](docs/InlineResponse20049.md)
 - [DigitalOceanApi.InlineResponse2005](docs/InlineResponse2005.md)
 - [DigitalOceanApi.InlineResponse20050](docs/InlineResponse20050.md)
 - [DigitalOceanApi.InlineResponse20051](docs/InlineResponse20051.md)
 - [DigitalOceanApi.InlineResponse20051Options](docs/InlineResponse20051Options.md)
 - [DigitalOceanApi.InlineResponse20052](docs/InlineResponse20052.md)
 - [DigitalOceanApi.InlineResponse20053](docs/InlineResponse20053.md)
 - [DigitalOceanApi.InlineResponse20054](docs/InlineResponse20054.md)
 - [DigitalOceanApi.InlineResponse20055](docs/InlineResponse20055.md)
 - [DigitalOceanApi.InlineResponse20056](docs/InlineResponse20056.md)
 - [DigitalOceanApi.InlineResponse20057](docs/InlineResponse20057.md)
 - [DigitalOceanApi.InlineResponse20058](docs/InlineResponse20058.md)
 - [DigitalOceanApi.InlineResponse20059](docs/InlineResponse20059.md)
 - [DigitalOceanApi.InlineResponse2006](docs/InlineResponse2006.md)
 - [DigitalOceanApi.InlineResponse20060](docs/InlineResponse20060.md)
 - [DigitalOceanApi.InlineResponse20061](docs/InlineResponse20061.md)
 - [DigitalOceanApi.InlineResponse20062](docs/InlineResponse20062.md)
 - [DigitalOceanApi.InlineResponse2007](docs/InlineResponse2007.md)
 - [DigitalOceanApi.InlineResponse2008](docs/InlineResponse2008.md)
 - [DigitalOceanApi.InlineResponse2009](docs/InlineResponse2009.md)
 - [DigitalOceanApi.InlineResponse201](docs/InlineResponse201.md)
 - [DigitalOceanApi.InlineResponse2011](docs/InlineResponse2011.md)
 - [DigitalOceanApi.InlineResponse20110](docs/InlineResponse20110.md)
 - [DigitalOceanApi.InlineResponse20111](docs/InlineResponse20111.md)
 - [DigitalOceanApi.InlineResponse20112](docs/InlineResponse20112.md)
 - [DigitalOceanApi.InlineResponse20113](docs/InlineResponse20113.md)
 - [DigitalOceanApi.InlineResponse20114](docs/InlineResponse20114.md)
 - [DigitalOceanApi.InlineResponse20115](docs/InlineResponse20115.md)
 - [DigitalOceanApi.InlineResponse20116](docs/InlineResponse20116.md)
 - [DigitalOceanApi.InlineResponse20117](docs/InlineResponse20117.md)
 - [DigitalOceanApi.InlineResponse2012](docs/InlineResponse2012.md)
 - [DigitalOceanApi.InlineResponse2013](docs/InlineResponse2013.md)
 - [DigitalOceanApi.InlineResponse2014](docs/InlineResponse2014.md)
 - [DigitalOceanApi.InlineResponse2015](docs/InlineResponse2015.md)
 - [DigitalOceanApi.InlineResponse2016](docs/InlineResponse2016.md)
 - [DigitalOceanApi.InlineResponse2017](docs/InlineResponse2017.md)
 - [DigitalOceanApi.InlineResponse2018](docs/InlineResponse2018.md)
 - [DigitalOceanApi.InlineResponse2019](docs/InlineResponse2019.md)
 - [DigitalOceanApi.InlineResponse202](docs/InlineResponse202.md)
 - [DigitalOceanApi.InlineResponse2021](docs/InlineResponse2021.md)
 - [DigitalOceanApi.InlineResponse2022](docs/InlineResponse2022.md)
 - [DigitalOceanApi.InlineResponse2022Links](docs/InlineResponse2022Links.md)
 - [DigitalOceanApi.InlineResponse2023](docs/InlineResponse2023.md)
 - [DigitalOceanApi.InlineResponse2024](docs/InlineResponse2024.md)
 - [DigitalOceanApi.InlineResponse2025](docs/InlineResponse2025.md)
 - [DigitalOceanApi.InlineResponse2026](docs/InlineResponse2026.md)
 - [DigitalOceanApi.InlineResponse2027](docs/InlineResponse2027.md)
 - [DigitalOceanApi.InlineResponse202Links](docs/InlineResponse202Links.md)
 - [DigitalOceanApi.InstanceSizeCpuType](docs/InstanceSizeCpuType.md)
 - [DigitalOceanApi.InvoiceItem](docs/InvoiceItem.md)
 - [DigitalOceanApi.InvoicePreview](docs/InvoicePreview.md)
 - [DigitalOceanApi.InvoiceSummary](docs/InvoiceSummary.md)
 - [DigitalOceanApi.Kernel](docs/Kernel.md)
 - [DigitalOceanApi.KeysSshKeyIdentifierBody](docs/KeysSshKeyIdentifierBody.md)
 - [DigitalOceanApi.KubernetesNodePool](docs/KubernetesNodePool.md)
 - [DigitalOceanApi.KubernetesNodePoolBase](docs/KubernetesNodePoolBase.md)
 - [DigitalOceanApi.KubernetesNodePoolSize](docs/KubernetesNodePoolSize.md)
 - [DigitalOceanApi.KubernetesNodePoolTaint](docs/KubernetesNodePoolTaint.md)
 - [DigitalOceanApi.KubernetesNodePoolUpdate](docs/KubernetesNodePoolUpdate.md)
 - [DigitalOceanApi.KubernetesOptions](docs/KubernetesOptions.md)
 - [DigitalOceanApi.KubernetesOptionsOptions](docs/KubernetesOptionsOptions.md)
 - [DigitalOceanApi.KubernetesRegion](docs/KubernetesRegion.md)
 - [DigitalOceanApi.KubernetesSize](docs/KubernetesSize.md)
 - [DigitalOceanApi.KubernetesVersion](docs/KubernetesVersion.md)
 - [DigitalOceanApi.LbIdDropletsBody](docs/LbIdDropletsBody.md)
 - [DigitalOceanApi.LbIdDropletsBody1](docs/LbIdDropletsBody1.md)
 - [DigitalOceanApi.LbIdForwardingRulesBody](docs/LbIdForwardingRulesBody.md)
 - [DigitalOceanApi.LbIdForwardingRulesBody1](docs/LbIdForwardingRulesBody1.md)
 - [DigitalOceanApi.LinkToFirstPage](docs/LinkToFirstPage.md)
 - [DigitalOceanApi.LinkToLastPage](docs/LinkToLastPage.md)
 - [DigitalOceanApi.LinkToNextPage](docs/LinkToNextPage.md)
 - [DigitalOceanApi.LinkToPrevPage](docs/LinkToPrevPage.md)
 - [DigitalOceanApi.ListAlertPolicy](docs/ListAlertPolicy.md)
 - [DigitalOceanApi.LoadBalancer](docs/LoadBalancer.md)
 - [DigitalOceanApi.LoadBalancerBase](docs/LoadBalancerBase.md)
 - [DigitalOceanApi.LoadBalancerCreate](docs/LoadBalancerCreate.md)
 - [DigitalOceanApi.MaintenancePolicy](docs/MaintenancePolicy.md)
 - [DigitalOceanApi.Meta](docs/Meta.md)
 - [DigitalOceanApi.MetaMeta](docs/MetaMeta.md)
 - [DigitalOceanApi.MetaMeta1](docs/MetaMeta1.md)
 - [DigitalOceanApi.Metrics](docs/Metrics.md)
 - [DigitalOceanApi.MetricsData](docs/MetricsData.md)
 - [DigitalOceanApi.MetricsResult](docs/MetricsResult.md)
 - [DigitalOceanApi.Model1Click](docs/Model1Click.md)
 - [DigitalOceanApi.Model1ClickCreate](docs/Model1ClickCreate.md)
 - [DigitalOceanApi.MysqlSettings](docs/MysqlSettings.md)
 - [DigitalOceanApi.NeighborIds](docs/NeighborIds.md)
 - [DigitalOceanApi.NetworkV4](docs/NetworkV4.md)
 - [DigitalOceanApi.NetworkV6](docs/NetworkV6.md)
 - [DigitalOceanApi.NewVolumeExt4](docs/NewVolumeExt4.md)
 - [DigitalOceanApi.NewVolumeXfs](docs/NewVolumeXfs.md)
 - [DigitalOceanApi.Node](docs/Node.md)
 - [DigitalOceanApi.NodePoolIdRecycleBody](docs/NodePoolIdRecycleBody.md)
 - [DigitalOceanApi.NodeStatus](docs/NodeStatus.md)
 - [DigitalOceanApi.OneOfdropletCreateImage](docs/OneOfdropletCreateImage.md)
 - [DigitalOceanApi.OneOfdropletsActionsBody](docs/OneOfdropletsActionsBody.md)
 - [DigitalOceanApi.OneOffloatingIpCreate](docs/OneOffloatingIpCreate.md)
 - [DigitalOceanApi.OneOfinlineResponse202](docs/OneOfinlineResponse202.md)
 - [DigitalOceanApi.OneOfloadBalancerCreate](docs/OneOfloadBalancerCreate.md)
 - [DigitalOceanApi.OneOfv2CertificatesBody](docs/OneOfv2CertificatesBody.md)
 - [DigitalOceanApi.OneOfv2DropletsBody](docs/OneOfv2DropletsBody.md)
 - [DigitalOceanApi.OnlineMigration](docs/OnlineMigration.md)
 - [DigitalOceanApi.PageLinks](docs/PageLinks.md)
 - [DigitalOceanApi.Pagination](docs/Pagination.md)
 - [DigitalOceanApi.ProductChargeItem](docs/ProductChargeItem.md)
 - [DigitalOceanApi.ProductUsageCharges](docs/ProductUsageCharges.md)
 - [DigitalOceanApi.Project](docs/Project.md)
 - [DigitalOceanApi.ProjectAssignment](docs/ProjectAssignment.md)
 - [DigitalOceanApi.ProjectBase](docs/ProjectBase.md)
 - [DigitalOceanApi.ProjectsDefaultBody](docs/ProjectsDefaultBody.md)
 - [DigitalOceanApi.ProjectsProjectIdBody](docs/ProjectsProjectIdBody.md)
 - [DigitalOceanApi.PurgeCache](docs/PurgeCache.md)
 - [DigitalOceanApi.Region](docs/Region.md)
 - [DigitalOceanApi.RegionSlug](docs/RegionSlug.md)
 - [DigitalOceanApi.RegionsArray](docs/RegionsArray.md)
 - [DigitalOceanApi.Registry](docs/Registry.md)
 - [DigitalOceanApi.RegistryCreate](docs/RegistryCreate.md)
 - [DigitalOceanApi.RegistrySubscriptionBody](docs/RegistrySubscriptionBody.md)
 - [DigitalOceanApi.Repository](docs/Repository.md)
 - [DigitalOceanApi.RepositoryTag](docs/RepositoryTag.md)
 - [DigitalOceanApi.Resource](docs/Resource.md)
 - [DigitalOceanApi.ResourceLinks](docs/ResourceLinks.md)
 - [DigitalOceanApi.SimpleCharge](docs/SimpleCharge.md)
 - [DigitalOceanApi.Size](docs/Size.md)
 - [DigitalOceanApi.SlackDetails](docs/SlackDetails.md)
 - [DigitalOceanApi.Slug](docs/Slug.md)
 - [DigitalOceanApi.Snapshot](docs/Snapshot.md)
 - [DigitalOceanApi.SnapshotBase](docs/SnapshotBase.md)
 - [DigitalOceanApi.SnapshotId](docs/SnapshotId.md)
 - [DigitalOceanApi.SourceDatabase](docs/SourceDatabase.md)
 - [DigitalOceanApi.SqlMode](docs/SqlMode.md)
 - [DigitalOceanApi.SshKey](docs/SshKey.md)
 - [DigitalOceanApi.SshKeyFingerprint](docs/SshKeyFingerprint.md)
 - [DigitalOceanApi.SshKeyId](docs/SshKeyId.md)
 - [DigitalOceanApi.SshKeyIdentifier](docs/SshKeyIdentifier.md)
 - [DigitalOceanApi.SshKeyName](docs/SshKeyName.md)
 - [DigitalOceanApi.StickySessions](docs/StickySessions.md)
 - [DigitalOceanApi.Subscription](docs/Subscription.md)
 - [DigitalOceanApi.SubscriptionTierBase](docs/SubscriptionTierBase.md)
 - [DigitalOceanApi.SubscriptionTierExtended](docs/SubscriptionTierExtended.md)
 - [DigitalOceanApi.Tag](docs/Tag.md)
 - [DigitalOceanApi.TagMetadata](docs/TagMetadata.md)
 - [DigitalOceanApi.TagResource](docs/TagResource.md)
 - [DigitalOceanApi.TagResourceResources](docs/TagResourceResources.md)
 - [DigitalOceanApi.TagsArray](docs/TagsArray.md)
 - [DigitalOceanApi.UpdateEndpoint](docs/UpdateEndpoint.md)
 - [DigitalOceanApi.UpdateRegistry](docs/UpdateRegistry.md)
 - [DigitalOceanApi.Urn](docs/Urn.md)
 - [DigitalOceanApi.User](docs/User.md)
 - [DigitalOceanApi.UserKubernetesClusterUser](docs/UserKubernetesClusterUser.md)
 - [DigitalOceanApi.UsernameResetAuthBody](docs/UsernameResetAuthBody.md)
 - [DigitalOceanApi.V2CertificatesBody](docs/V2CertificatesBody.md)
 - [DigitalOceanApi.V2DatabasesBody](docs/V2DatabasesBody.md)
 - [DigitalOceanApi.V2DropletsBody](docs/V2DropletsBody.md)
 - [DigitalOceanApi.V2FirewallsBody](docs/V2FirewallsBody.md)
 - [DigitalOceanApi.V2ProjectsBody](docs/V2ProjectsBody.md)
 - [DigitalOceanApi.V2VolumesBody](docs/V2VolumesBody.md)
 - [DigitalOceanApi.V2VpcsBody](docs/V2VpcsBody.md)
 - [DigitalOceanApi.ValidateRegistry](docs/ValidateRegistry.md)
 - [DigitalOceanApi.VolumeAction](docs/VolumeAction.md)
 - [DigitalOceanApi.VolumeActionDropletId](docs/VolumeActionDropletId.md)
 - [DigitalOceanApi.VolumeActionPostAttach](docs/VolumeActionPostAttach.md)
 - [DigitalOceanApi.VolumeActionPostBase](docs/VolumeActionPostBase.md)
 - [DigitalOceanApi.VolumeActionPostDetach](docs/VolumeActionPostDetach.md)
 - [DigitalOceanApi.VolumeActionPostResize](docs/VolumeActionPostResize.md)
 - [DigitalOceanApi.VolumeBase](docs/VolumeBase.md)
 - [DigitalOceanApi.VolumeFull](docs/VolumeFull.md)
 - [DigitalOceanApi.VolumeIdActionsBody](docs/VolumeIdActionsBody.md)
 - [DigitalOceanApi.VolumeIdSnapshotsBody](docs/VolumeIdSnapshotsBody.md)
 - [DigitalOceanApi.VolumeSnapshotId](docs/VolumeSnapshotId.md)
 - [DigitalOceanApi.VolumeWriteFileSystemLabel](docs/VolumeWriteFileSystemLabel.md)
 - [DigitalOceanApi.VolumeWriteFileSystemType](docs/VolumeWriteFileSystemType.md)
 - [DigitalOceanApi.VolumesActionsBody](docs/VolumesActionsBody.md)
 - [DigitalOceanApi.Vpc](docs/Vpc.md)
 - [DigitalOceanApi.VpcBase](docs/VpcBase.md)
 - [DigitalOceanApi.VpcCreate](docs/VpcCreate.md)
 - [DigitalOceanApi.VpcDefault](docs/VpcDefault.md)
 - [DigitalOceanApi.VpcMember](docs/VpcMember.md)
 - [DigitalOceanApi.VpcUpdatable](docs/VpcUpdatable.md)
 - [DigitalOceanApi.VpcsVpcIdBody](docs/VpcsVpcIdBody.md)
 - [DigitalOceanApi.VpcsVpcIdBody1](docs/VpcsVpcIdBody1.md)

## Documentation for Authorization


### bearer_auth


