/*
 * DigitalOcean API
 * # Introduction  The DigitalOcean API allows you to manage Droplets and resources within the DigitalOcean cloud in a simple, programmatic way using conventional HTTP requests.  All of the functionality that you are familiar with in the DigitalOcean control panel is also available through the API, allowing you to script the complex actions that your situation requires.  The API documentation will start with a general overview about the design and technology that has been implemented, followed by reference information about specific endpoints.  ## Requests  Any tool that is fluent in HTTP can communicate with the API simply by requesting the correct URI. Requests should be made using the HTTPS protocol so that traffic is encrypted. The interface responds to different methods depending on the action required.  |Method|Usage| |--- |--- | |GET|For simple retrieval of information about your account, Droplets, or environment, you should use the GET method.  The information you request will be returned to you as a JSON object. The attributes defined by the JSON object can be used to form additional requests.  Any request using the GET method is read-only and will not affect any of the objects you are querying.| |DELETE|To destroy a resource and remove it from your account and environment, the DELETE method should be used.  This will remove the specified object if it is found.  If it is not found, the operation will return a response indicating that the object was not found. This idempotency means that you do not have to check for a resource's availability prior to issuing a delete command, the final state will be the same regardless of its existence.| |PUT|To update the information about a resource in your account, the PUT method is available. Like the DELETE Method, the PUT method is idempotent.  It sets the state of the target using the provided values, regardless of their current values. Requests using the PUT method do not need to check the current attributes of the object.| |PATCH|Some resources support partial modification. In these cases, the PATCH method is available. Unlike PUT which generally requires a complete representation of a resource, a PATCH request is is a set of instructions on how to modify a resource updating only specific attributes.| |POST|To create a new object, your request should specify the POST method. The POST request includes all of the attributes necessary to create a new object.  When you wish to create a new object, send a POST request to the target endpoint.| |HEAD|Finally, to retrieve metadata information, you should use the HEAD method to get the headers.  This returns only the header of what would be returned with an associated GET request. Response headers contain some useful information about your API access and the results that are available for your request. For instance, the headers contain your current rate-limit value and the amount of time available until the limit resets. It also contains metrics about the total number of objects found, pagination information, and the total content length.|   ## HTTP Statuses  Along with the HTTP methods that the API responds to, it will also return standard HTTP statuses, including error codes.  In the event of a problem, the status will contain the error code, while the body of the response will usually contain additional information about the problem that was encountered.  In general, if the status returned is in the 200 range, it indicates that the request was fulfilled successfully and that no error was encountered.  Return codes in the 400 range typically indicate that there was an issue with the request that was sent. Among other things, this could mean that you did not authenticate correctly, that you are requesting an action that you do not have authorization for, that the object you are requesting does not exist, or that your request is malformed.  If you receive a status in the 500 range, this generally indicates a server-side problem. This means that we are having an issue on our end and cannot fulfill your request currently.  400 and 500 level error responses will include a JSON object in their body, including the following attributes:  |Name|Type|Description| |--- |--- |--- | |id|string|A short identifier corresponding to the HTTP status code returned. For example, the ID for a response returning a 404 status code would be \"not_found.\"| |message|string|A message providing additional information about the error, including details to help resolve it when possible.| |request_id|string|Optionally, some endpoints may include a request ID that should be provided when reporting bugs or opening support tickets to help identify the issue.|  ### Example Error Response  ```     HTTP/1.1 403 Forbidden     {       \"id\":       \"forbidden\",       \"message\":  \"You do not have access for the attempted action.\"     } ```  ## Responses  When a request is successful, a response body will typically be sent back in the form of a JSON object. An exception to this is when a DELETE request is processed, which will result in a successful HTTP 204 status and an empty response body.  Inside of this JSON object, the resource root that was the target of the request will be set as the key. This will be the singular form of the word if the request operated on a single object, and the plural form of the word if a collection was processed.  For example, if you send a GET request to `/v2/droplets/$DROPLET_ID` you will get back an object with a key called \"`droplet`\". However, if you send the GET request to the general collection at `/v2/droplets`, you will get back an object with a key called \"`droplets`\".  The value of these keys will generally be a JSON object for a request on a single object and an array of objects for a request on a collection of objects.  ### Response for a Single Object  ```     {         \"droplet\": {             \"name\": \"example.com\"             . . .         }     } ```  ### Response for an Object Collection  ```     {         \"droplets\": [             {                 \"name\": \"example.com\"                 . . .             },             {                 \"name\": \"second.com\"                 . . .             }         ]     } ```  ## Meta  In addition to the main resource root, the response may also contain a `meta` object. This object contains information about the response itself.  The `meta` object contains a `total` key that is set to the total number of objects returned by the request. This has implications on the `links` object and pagination.  The `meta` object will only be displayed when it has a value. Currently, the `meta` object will have a value when a request is made on a collection (like `droplets` or `domains`).   ### Sample Meta Object  ```     {         . . .         \"meta\": {             \"total\": 43         }         . . .     } ```  ## Links & Pagination  The `links` object is returned as part of the response body when pagination is enabled. By default, 20 objects are returned per page. If the response contains 20 objects or fewer, no `links` object will be returned. If the response contains more than 20 objects, the first 20 will be returned along with the `links` object.  You can request a different pagination limit or force pagination by appending `?per_page=` to the request with the number of items you would like per page. For instance, to show only two results per page, you could add `?per_page=2` to the end of your query. The maximum number of results per page is 200.  The `links` object contains a `pages` object. The `pages` object, in turn, contains keys indicating the relationship of additional pages. The values of these are the URLs of the associated pages. The keys will be one of the following:  *   **first**: The URI of the first page of results. *   **prev**: The URI of the previous sequential page of results. *   **next**: The URI of the next sequential page of results. *   **last**: The URI of the last page of results.  The `pages` object will only include the links that make sense. So for the first page of results, no `first` or `prev` links will ever be set. This convention holds true in other situations where a link would not make sense.  ### Sample Links Object  ```     {         . . .         \"links\": {             \"pages\": {                 \"last\": \"https://api.digitalocean.com/v2/images?page=2\",                 \"next\": \"https://api.digitalocean.com/v2/images?page=2\"             }         }         . . .     } ```  ## Rate Limit  Requests through the API are rate limited per OAuth token. Current rate limits:  *   5,000 requests per hour *   250 requests per minute (5% of the hourly total)  Once you exceed either limit, you will be rate limited until the next cycle starts. Space out any requests that you would otherwise issue in bursts for the best results.  The rate limiting information is contained within the response headers of each request. The relevant headers are:  *   **RateLimit-Limit**: The number of requests that can be made per hour. *   **RateLimit-Remaining**: The number of requests that remain before you hit your request limit. See the information below for how the request limits expire. *   **RateLimit-Reset**: This represents the time when the oldest request will expire. The value is given in [Unix epoch time](http://en.wikipedia.org/wiki/Unix_time). See below for more information about how request limits expire.  As long as the `RateLimit-Remaining` count is above zero, you will be able to make additional requests.  The way that a request expires and is removed from the current limit count is important to understand. Rather than counting all of the requests for an hour and resetting the `RateLimit-Remaining` value at the end of the hour, each request instead has its own timer.  This means that each request contributes toward the `RateLimit-Remaining` count for one complete hour after the request is made. When that request's timer runs out, it is no longer counted towards the request limit.  This has implications on the meaning of the `RateLimit-Reset` header as well. Because the entire rate limit is not reset at one time, the value of this header is set to the time when the _oldest_ request will expire.  Keep this in mind if you see your `RateLimit-Reset` value change, but not move an entire hour into the future.  If the `RateLimit-Remaining` reaches zero, subsequent requests will receive a 429 error code until the request reset has been reached. You can see the format of the response in the examples.  **Note:** The following endpoints have special rate limit requirements that are independent of the limits defined above.  *   Only 12 `POST` requests to the `/v2/floating_ips` endpoint to create Floating IPs can be made per 60 seconds. *   Only 10 `GET` requests to the `/v2/account/keys` endpoint to list SSH keys can be made per 60 seconds.  ### Sample Rate Limit Headers  ```     . . .     RateLimit-Limit: 1200     RateLimit-Remaining: 1193     RateLimit-Reset: 1402425459     . . . ```  ### Sample Rate Exceeded Response  ```     429 Too Many Requests     {             id: \"too_many_requests\",             message: \"API Rate limit exceeded.\"     } ```  ## Curl Examples  Throughout this document, some example API requests will be given using the `curl` command. This will allow us to demonstrate the various endpoints in a simple, textual format.  The names of account-specific references (like Droplet IDs, for instance) will be represented by variables. For instance, a Droplet ID may be represented by a variable called `$DROPLET_ID`. You can set the associated variables in your environment if you wish to use the examples without modification.  The first variable that you should set to get started is your OAuth authorization token. The next section will go over the details of this, but you can set an environmental variable for it now.  Generate a token by going to the [Apps & API](https://cloud.digitalocean.com/settings/applications) section of the DigitalOcean control panel. Use an existing token if you have saved one, or generate a new token with the \"Generate new token\" button. Copy the generated token and use it to set and export the TOKEN variable in your environment as the example shows.  You may also wish to set some other variables now or as you go along. For example, you may wish to set the `DROPLET_ID` variable to one of your Droplet IDs since this will be used frequently in the API.  If you are following along, make sure you use a Droplet ID that you control so that your commands will execute correctly.  If you need access to the headers of a response through `curl`, you can pass the `-i` flag to display the header information along with the body. If you are only interested in the header, you can instead pass the `-I` flag, which will exclude the response body entirely.  ### Set and Export your OAuth Token  ``` export DIGITALOCEAN_TOKEN=your_token_here ```  ### Set and Export a Variable  ``` export DROPLET_ID=1111111 ```  ## Parameters  There are two different ways to pass parameters in a request with the API.  When passing parameters to create or update an object, parameters should be passed as a JSON object containing the appropriate attribute names and values as key-value pairs. When you use this format, you should specify that you are sending a JSON object in the header. This is done by setting the `Content-Type` header to `application/json`. This ensures that your request is interpreted correctly.  When passing parameters to filter a response on GET requests, parameters can be passed using standard query attributes. In this case, the parameters would be embedded into the URI itself by appending a `?` to the end of the URI and then setting each attribute with an equal sign. Attributes can be separated with a `&`. Tools like `curl` can create the appropriate URI when given parameters and values; this can also be done using the `-F` flag and then passing the key and value as an argument. The argument should take the form of a quoted string with the attribute being set to a value with an equal sign.  ### Pass Parameters as a JSON Object  ```     curl -H \"Authorization: Bearer $DIGITALOCEAN_TOKEN\" \\         -H \"Content-Type: application/json\" \\         -d '{\"name\": \"example.com\", \"ip_address\": \"127.0.0.1\"}' \\         -X POST \"https://api.digitalocean.com/v2/domains\" ```  ### Pass Filter Parameters as a Query String  ```      curl -H \"Authorization: Bearer $DIGITALOCEAN_TOKEN\" \\          -X GET \\          \"https://api.digitalocean.com/v2/images?private=true\" ```  ## Cross Origin Resource Sharing  In order to make requests to the API from other domains, the API implements Cross Origin Resource Sharing (CORS) support.  CORS support is generally used to create AJAX requests outside of the domain that the request originated from. This is necessary to implement projects like control panels utilizing the API. This tells the browser that it can send requests to an outside domain.  The procedure that the browser initiates in order to perform these actions (other than GET requests) begins by sending a \"preflight\" request. This sets the `Origin` header and uses the `OPTIONS` method. The server will reply back with the methods it allows and some of the limits it imposes. The client then sends the actual request if it falls within the allowed constraints.  This process is usually done in the background by the browser, but you can use curl to emulate this process using the example provided. The headers that will be set to show the constraints are:  *   **Access-Control-Allow-Origin**: This is the domain that is sent by the client or browser as the origin of the request. It is set through an `Origin` header. *   **Access-Control-Allow-Methods**: This specifies the allowed options for requests from that domain. This will generally be all available methods. *   **Access-Control-Expose-Headers**: This will contain the headers that will be available to requests from the origin domain. *   **Access-Control-Max-Age**: This is the length of time that the access is considered valid. After this expires, a new preflight should be sent. *   **Access-Control-Allow-Credentials**: This will be set to `true`. It basically allows you to send your OAuth token for authentication.  You should not need to be concerned with the details of these headers, because the browser will typically do all of the work for you. 
 *
 * OpenAPI spec version: 2.0
 * Contact: api-engineering@digitalocean.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 3.0.27
 *
 * Do not edit the class manually.
 *
 */
import {ApiClient} from './ApiClient';
import {Account} from './model/Account';
import {Action} from './model/Action';
import {ActionLink} from './model/ActionLink';
import {AlertPolicy} from './model/AlertPolicy';
import {AlertPolicyRequest} from './model/AlertPolicyRequest';
import {Alerts} from './model/Alerts';
import {AllOfactionRegionSlug} from './model/AllOfactionRegionSlug';
import {AllOfconnectionPoolConnection} from './model/AllOfconnectionPoolConnection';
import {AllOfconnectionPoolPrivateConnection} from './model/AllOfconnectionPoolPrivateConnection';
import {AllOfdatabaseClusterConnection} from './model/AllOfdatabaseClusterConnection';
import {AllOfdatabaseClusterMaintenanceWindow} from './model/AllOfdatabaseClusterMaintenanceWindow';
import {AllOfdatabaseClusterPrivateConnection} from './model/AllOfdatabaseClusterPrivateConnection';
import {AllOfdatabaseReplicaConnection} from './model/AllOfdatabaseReplicaConnection';
import {AllOfdatabaseReplicaPrivateConnection} from './model/AllOfdatabaseReplicaPrivateConnection';
import {AllOffirewallIdTagsBody1Tags} from './model/AllOffirewallIdTagsBody1Tags';
import {AllOffirewallIdTagsBodyTags} from './model/AllOffirewallIdTagsBodyTags';
import {AllOffirewallRuleTargetTags} from './model/AllOffirewallRuleTargetTags';
import {AllOffirewallRulesInboundRulesItems} from './model/AllOffirewallRulesInboundRulesItems';
import {AllOffirewallRulesOutboundRulesItems} from './model/AllOffirewallRulesOutboundRulesItems';
import {AllOffloatingIpRegion} from './model/AllOffloatingIpRegion';
import {AllOfinlineResponse20051OptionsSubscriptionTiersItems} from './model/AllOfinlineResponse20051OptionsSubscriptionTiersItems';
import {AllOfinvoiceSummaryCreditsAndAdjustments} from './model/AllOfinvoiceSummaryCreditsAndAdjustments';
import {AllOfinvoiceSummaryOverages} from './model/AllOfinvoiceSummaryOverages';
import {AllOfinvoiceSummaryProductCharges} from './model/AllOfinvoiceSummaryProductCharges';
import {AllOfinvoiceSummaryTaxes} from './model/AllOfinvoiceSummaryTaxes';
import {AllOfinvoiceSummaryUserBillingAddress} from './model/AllOfinvoiceSummaryUserBillingAddress';
import {AllOfregistrySubscription} from './model/AllOfregistrySubscription';
import {AllOfsourceDatabaseSource} from './model/AllOfsourceDatabaseSource';
import {AllOftagResources} from './model/AllOftagResources';
import {AnyOfdomainNameRecordsBody} from './model/AnyOfdomainNameRecordsBody';
import {AnyOfdropletCreateSshKeysItems} from './model/AnyOfdropletCreateSshKeysItems';
import {AnyOfdropletIdActionsBody} from './model/AnyOfdropletIdActionsBody';
import {AnyOffloatingIpActionsBody} from './model/AnyOffloatingIpActionsBody';
import {AnyOffloatingIpDroplet} from './model/AnyOffloatingIpDroplet';
import {AnyOfimageId} from './model/AnyOfimageId';
import {AnyOfimageIdActionsBody} from './model/AnyOfimageIdActionsBody';
import {AnyOfpageLinksPages} from './model/AnyOfpageLinksPages';
import {AnyOfsnapshotId} from './model/AnyOfsnapshotId';
import {AnyOfsshKeyIdentifier} from './model/AnyOfsshKeyIdentifier';
import {AnyOfv2VolumesBody} from './model/AnyOfv2VolumesBody';
import {AnyOfvolumeIdActionsBody} from './model/AnyOfvolumeIdActionsBody';
import {AnyOfvolumesActionsBody} from './model/AnyOfvolumesActionsBody';
import {App} from './model/App';
import {AppComponentBase} from './model/AppComponentBase';
import {AppComponentInstanceBase} from './model/AppComponentInstanceBase';
import {AppDatabaseSpec} from './model/AppDatabaseSpec';
import {AppDomainSpec} from './model/AppDomainSpec';
import {AppJobSpec} from './model/AppJobSpec';
import {AppPropose} from './model/AppPropose';
import {AppProposeResponse} from './model/AppProposeResponse';
import {AppResponse} from './model/AppResponse';
import {AppRouteSpec} from './model/AppRouteSpec';
import {AppServiceSpec} from './model/AppServiceSpec';
import {AppServiceSpecHealthCheck} from './model/AppServiceSpecHealthCheck';
import {AppSpec} from './model/AppSpec';
import {AppStaticSiteSpec} from './model/AppStaticSiteSpec';
import {AppVariableDefinition} from './model/AppVariableDefinition';
import {AppWorkerSpec} from './model/AppWorkerSpec';
import {AppsCorsPolicy} from './model/AppsCorsPolicy';
import {AppsCreateAppRequest} from './model/AppsCreateAppRequest';
import {AppsCreateDeploymentRequest} from './model/AppsCreateDeploymentRequest';
import {AppsDeleteAppResponse} from './model/AppsDeleteAppResponse';
import {AppsDeployment} from './model/AppsDeployment';
import {AppsDeploymentJob} from './model/AppsDeploymentJob';
import {AppsDeploymentPhase} from './model/AppsDeploymentPhase';
import {AppsDeploymentProgress} from './model/AppsDeploymentProgress';
import {AppsDeploymentProgressStep} from './model/AppsDeploymentProgressStep';
import {AppsDeploymentProgressStepReason} from './model/AppsDeploymentProgressStepReason';
import {AppsDeploymentProgressStepStatus} from './model/AppsDeploymentProgressStepStatus';
import {AppsDeploymentResponse} from './model/AppsDeploymentResponse';
import {AppsDeploymentService} from './model/AppsDeploymentService';
import {AppsDeploymentStaticSite} from './model/AppsDeploymentStaticSite';
import {AppsDeploymentWorker} from './model/AppsDeploymentWorker';
import {AppsDeploymentsResponse} from './model/AppsDeploymentsResponse';
import {AppsDomain} from './model/AppsDomain';
import {AppsDomainPhase} from './model/AppsDomainPhase';
import {AppsDomainProgress} from './model/AppsDomainProgress';
import {AppsGetInstanceSizeResponse} from './model/AppsGetInstanceSizeResponse';
import {AppsGetLogsResponse} from './model/AppsGetLogsResponse';
import {AppsGetTierResponse} from './model/AppsGetTierResponse';
import {AppsGitSourceSpec} from './model/AppsGitSourceSpec';
import {AppsGithubSourceSpec} from './model/AppsGithubSourceSpec';
import {AppsGitlabSourceSpec} from './model/AppsGitlabSourceSpec';
import {AppsImageSourceSpec} from './model/AppsImageSourceSpec';
import {AppsInstanceSize} from './model/AppsInstanceSize';
import {AppsListInstanceSizesResponse} from './model/AppsListInstanceSizesResponse';
import {AppsListRegionsResponse} from './model/AppsListRegionsResponse';
import {AppsListTiersResponse} from './model/AppsListTiersResponse';
import {AppsRegion} from './model/AppsRegion';
import {AppsResponse} from './model/AppsResponse';
import {AppsStringMatch} from './model/AppsStringMatch';
import {AppsTier} from './model/AppsTier';
import {AppsUpdateAppRequest} from './model/AppsUpdateAppRequest';
import {AssociatedKubernetesResource} from './model/AssociatedKubernetesResource';
import {AssociatedKubernetesResources} from './model/AssociatedKubernetesResources';
import {AssociatedResource} from './model/AssociatedResource';
import {AssociatedResourceStatus} from './model/AssociatedResourceStatus';
import {AssociatedResourceStatusResources} from './model/AssociatedResourceStatusResources';
import {Backup} from './model/Backup';
import {BackwardLinks} from './model/BackwardLinks';
import {Balance} from './model/Balance';
import {BillingAddress} from './model/BillingAddress';
import {BillingHistory} from './model/BillingHistory';
import {Ca} from './model/Ca';
import {CdnEndpoint} from './model/CdnEndpoint';
import {Certificate} from './model/Certificate';
import {CertificateCreateBase} from './model/CertificateCreateBase';
import {CertificateRequestCustom} from './model/CertificateRequestCustom';
import {CertificateRequestLetsEncrypt} from './model/CertificateRequestLetsEncrypt';
import {Cluster} from './model/Cluster';
import {ClusterIdUpgradeBody} from './model/ClusterIdUpgradeBody';
import {ClusterRegistries} from './model/ClusterRegistries';
import {ClusterStatus} from './model/ClusterStatus';
import {ClusterUpdate} from './model/ClusterUpdate';
import {ClusterlintRequest} from './model/ClusterlintRequest';
import {ClusterlintResults} from './model/ClusterlintResults';
import {ClusterlintResultsDiagnostics} from './model/ClusterlintResultsDiagnostics';
import {ClusterlintResultsObject} from './model/ClusterlintResultsObject';
import {ConnectionPool} from './model/ConnectionPool';
import {ConnectionPools} from './model/ConnectionPools';
import {Credentials} from './model/Credentials';
import {Database} from './model/Database';
import {DatabaseBackup} from './model/DatabaseBackup';
import {DatabaseCluster} from './model/DatabaseCluster';
import {DatabaseClusterResize} from './model/DatabaseClusterResize';
import {DatabaseClusterUuidFirewallBody} from './model/DatabaseClusterUuidFirewallBody';
import {DatabaseClusterUuidMigrateBody} from './model/DatabaseClusterUuidMigrateBody';
import {DatabaseClusterUuidReplicasBody} from './model/DatabaseClusterUuidReplicasBody';
import {DatabaseConnection} from './model/DatabaseConnection';
import {DatabaseMaintenanceWindow} from './model/DatabaseMaintenanceWindow';
import {DatabaseReplica} from './model/DatabaseReplica';
import {DatabaseUser} from './model/DatabaseUser';
import {DestroyAssociatedKubernetesResources} from './model/DestroyAssociatedKubernetesResources';
import {DestroyedAssociatedResource} from './model/DestroyedAssociatedResource';
import {Distribution} from './model/Distribution';
import {DockerCredentials} from './model/DockerCredentials';
import {DockerCredentialsAuths} from './model/DockerCredentialsAuths';
import {DockerCredentialsAuthsRegistryDigitaloceanCom} from './model/DockerCredentialsAuthsRegistryDigitaloceanCom';
import {Domain} from './model/Domain';
import {DomainNameRecordsBody} from './model/DomainNameRecordsBody';
import {DomainRecord} from './model/DomainRecord';
import {DomainRecordA} from './model/DomainRecordA';
import {DomainRecordAaaa} from './model/DomainRecordAaaa';
import {DomainRecordCaa} from './model/DomainRecordCaa';
import {DomainRecordCname} from './model/DomainRecordCname';
import {DomainRecordMx} from './model/DomainRecordMx';
import {DomainRecordNs} from './model/DomainRecordNs';
import {DomainRecordSoa} from './model/DomainRecordSoa';
import {DomainRecordSrv} from './model/DomainRecordSrv';
import {DomainRecordTxt} from './model/DomainRecordTxt';
import {Droplet} from './model/Droplet';
import {DropletActionChangeKernel} from './model/DropletActionChangeKernel';
import {DropletActionRebuild} from './model/DropletActionRebuild';
import {DropletActionRename} from './model/DropletActionRename';
import {DropletActionResize} from './model/DropletActionResize';
import {DropletActionRestore} from './model/DropletActionRestore';
import {DropletActionSnapshot} from './model/DropletActionSnapshot';
import {DropletActionType} from './model/DropletActionType';
import {DropletCreate} from './model/DropletCreate';
import {DropletIdActionsBody} from './model/DropletIdActionsBody';
import {DropletMultiCreate} from './model/DropletMultiCreate';
import {DropletNetworks} from './model/DropletNetworks';
import {DropletNextBackupWindow} from './model/DropletNextBackupWindow';
import {DropletSingleCreate} from './model/DropletSingleCreate';
import {DropletSnapshot} from './model/DropletSnapshot';
import {DropletsActionsBody} from './model/DropletsActionsBody';
import {Error} from './model/Error';
import {ErrorWithRootCauses} from './model/ErrorWithRootCauses';
import {EvictionPolicy} from './model/EvictionPolicy';
import {Firewall} from './model/Firewall';
import {FirewallIdDropletsBody} from './model/FirewallIdDropletsBody';
import {FirewallIdDropletsBody1} from './model/FirewallIdDropletsBody1';
import {FirewallIdRulesBody} from './model/FirewallIdRulesBody';
import {FirewallIdRulesBody1} from './model/FirewallIdRulesBody1';
import {FirewallIdTagsBody} from './model/FirewallIdTagsBody';
import {FirewallIdTagsBody1} from './model/FirewallIdTagsBody1';
import {FirewallPendingChanges} from './model/FirewallPendingChanges';
import {FirewallRule} from './model/FirewallRule';
import {FirewallRuleBase} from './model/FirewallRuleBase';
import {FirewallRuleTarget} from './model/FirewallRuleTarget';
import {FirewallRules} from './model/FirewallRules';
import {FirewallsFirewallIdBody} from './model/FirewallsFirewallIdBody';
import {FloatingIp} from './model/FloatingIp';
import {FloatingIpActionAssign} from './model/FloatingIpActionAssign';
import {FloatingIpActionType} from './model/FloatingIpActionType';
import {FloatingIpActionUnassign} from './model/FloatingIpActionUnassign';
import {FloatingIpActionsBody} from './model/FloatingIpActionsBody';
import {FloatingIpCreate} from './model/FloatingIpCreate';
import {ForwardLinks} from './model/ForwardLinks';
import {ForwardingRule} from './model/ForwardingRule';
import {GarbageCollection} from './model/GarbageCollection';
import {HealthCheck} from './model/HealthCheck';
import {Image} from './model/Image';
import {ImageActionBase} from './model/ImageActionBase';
import {ImageActionTransfer} from './model/ImageActionTransfer';
import {ImageDescription} from './model/ImageDescription';
import {ImageId} from './model/ImageId';
import {ImageIdActionsBody} from './model/ImageIdActionsBody';
import {ImageName} from './model/ImageName';
import {ImageNewCustom} from './model/ImageNewCustom';
import {ImageUpdate} from './model/ImageUpdate';
import {InlineResponse200} from './model/InlineResponse200';
import {InlineResponse2001} from './model/InlineResponse2001';
import {InlineResponse20010} from './model/InlineResponse20010';
import {InlineResponse20011} from './model/InlineResponse20011';
import {InlineResponse20012} from './model/InlineResponse20012';
import {InlineResponse20013} from './model/InlineResponse20013';
import {InlineResponse20014} from './model/InlineResponse20014';
import {InlineResponse20015} from './model/InlineResponse20015';
import {InlineResponse20016} from './model/InlineResponse20016';
import {InlineResponse20017} from './model/InlineResponse20017';
import {InlineResponse20018} from './model/InlineResponse20018';
import {InlineResponse20019} from './model/InlineResponse20019';
import {InlineResponse2002} from './model/InlineResponse2002';
import {InlineResponse20020} from './model/InlineResponse20020';
import {InlineResponse20021} from './model/InlineResponse20021';
import {InlineResponse20022} from './model/InlineResponse20022';
import {InlineResponse20023} from './model/InlineResponse20023';
import {InlineResponse20024} from './model/InlineResponse20024';
import {InlineResponse20025} from './model/InlineResponse20025';
import {InlineResponse20026} from './model/InlineResponse20026';
import {InlineResponse20027} from './model/InlineResponse20027';
import {InlineResponse20028} from './model/InlineResponse20028';
import {InlineResponse20029} from './model/InlineResponse20029';
import {InlineResponse2003} from './model/InlineResponse2003';
import {InlineResponse20030} from './model/InlineResponse20030';
import {InlineResponse20031} from './model/InlineResponse20031';
import {InlineResponse20032} from './model/InlineResponse20032';
import {InlineResponse20033} from './model/InlineResponse20033';
import {InlineResponse20034} from './model/InlineResponse20034';
import {InlineResponse20035} from './model/InlineResponse20035';
import {InlineResponse20036} from './model/InlineResponse20036';
import {InlineResponse20037} from './model/InlineResponse20037';
import {InlineResponse20038} from './model/InlineResponse20038';
import {InlineResponse20039} from './model/InlineResponse20039';
import {InlineResponse2004} from './model/InlineResponse2004';
import {InlineResponse20040} from './model/InlineResponse20040';
import {InlineResponse20041} from './model/InlineResponse20041';
import {InlineResponse20042} from './model/InlineResponse20042';
import {InlineResponse20043} from './model/InlineResponse20043';
import {InlineResponse20044} from './model/InlineResponse20044';
import {InlineResponse20045} from './model/InlineResponse20045';
import {InlineResponse20046} from './model/InlineResponse20046';
import {InlineResponse20047} from './model/InlineResponse20047';
import {InlineResponse20048} from './model/InlineResponse20048';
import {InlineResponse20049} from './model/InlineResponse20049';
import {InlineResponse2005} from './model/InlineResponse2005';
import {InlineResponse20050} from './model/InlineResponse20050';
import {InlineResponse20051} from './model/InlineResponse20051';
import {InlineResponse20051Options} from './model/InlineResponse20051Options';
import {InlineResponse20052} from './model/InlineResponse20052';
import {InlineResponse20053} from './model/InlineResponse20053';
import {InlineResponse20054} from './model/InlineResponse20054';
import {InlineResponse20055} from './model/InlineResponse20055';
import {InlineResponse20056} from './model/InlineResponse20056';
import {InlineResponse20057} from './model/InlineResponse20057';
import {InlineResponse20058} from './model/InlineResponse20058';
import {InlineResponse20059} from './model/InlineResponse20059';
import {InlineResponse2006} from './model/InlineResponse2006';
import {InlineResponse20060} from './model/InlineResponse20060';
import {InlineResponse20061} from './model/InlineResponse20061';
import {InlineResponse20062} from './model/InlineResponse20062';
import {InlineResponse2007} from './model/InlineResponse2007';
import {InlineResponse2008} from './model/InlineResponse2008';
import {InlineResponse2009} from './model/InlineResponse2009';
import {InlineResponse201} from './model/InlineResponse201';
import {InlineResponse2011} from './model/InlineResponse2011';
import {InlineResponse20110} from './model/InlineResponse20110';
import {InlineResponse20111} from './model/InlineResponse20111';
import {InlineResponse20112} from './model/InlineResponse20112';
import {InlineResponse20113} from './model/InlineResponse20113';
import {InlineResponse20114} from './model/InlineResponse20114';
import {InlineResponse20115} from './model/InlineResponse20115';
import {InlineResponse20116} from './model/InlineResponse20116';
import {InlineResponse20117} from './model/InlineResponse20117';
import {InlineResponse2012} from './model/InlineResponse2012';
import {InlineResponse2013} from './model/InlineResponse2013';
import {InlineResponse2014} from './model/InlineResponse2014';
import {InlineResponse2015} from './model/InlineResponse2015';
import {InlineResponse2016} from './model/InlineResponse2016';
import {InlineResponse2017} from './model/InlineResponse2017';
import {InlineResponse2018} from './model/InlineResponse2018';
import {InlineResponse2019} from './model/InlineResponse2019';
import {InlineResponse202} from './model/InlineResponse202';
import {InlineResponse2021} from './model/InlineResponse2021';
import {InlineResponse2022} from './model/InlineResponse2022';
import {InlineResponse2022Links} from './model/InlineResponse2022Links';
import {InlineResponse2023} from './model/InlineResponse2023';
import {InlineResponse2024} from './model/InlineResponse2024';
import {InlineResponse2025} from './model/InlineResponse2025';
import {InlineResponse2026} from './model/InlineResponse2026';
import {InlineResponse2027} from './model/InlineResponse2027';
import {InlineResponse202Links} from './model/InlineResponse202Links';
import {InstanceSizeCpuType} from './model/InstanceSizeCpuType';
import {InvoiceItem} from './model/InvoiceItem';
import {InvoicePreview} from './model/InvoicePreview';
import {InvoiceSummary} from './model/InvoiceSummary';
import {Kernel} from './model/Kernel';
import {KeysSshKeyIdentifierBody} from './model/KeysSshKeyIdentifierBody';
import {KubernetesNodePool} from './model/KubernetesNodePool';
import {KubernetesNodePoolBase} from './model/KubernetesNodePoolBase';
import {KubernetesNodePoolSize} from './model/KubernetesNodePoolSize';
import {KubernetesNodePoolTaint} from './model/KubernetesNodePoolTaint';
import {KubernetesNodePoolUpdate} from './model/KubernetesNodePoolUpdate';
import {KubernetesOptions} from './model/KubernetesOptions';
import {KubernetesOptionsOptions} from './model/KubernetesOptionsOptions';
import {KubernetesRegion} from './model/KubernetesRegion';
import {KubernetesSize} from './model/KubernetesSize';
import {KubernetesVersion} from './model/KubernetesVersion';
import {LbIdDropletsBody} from './model/LbIdDropletsBody';
import {LbIdDropletsBody1} from './model/LbIdDropletsBody1';
import {LbIdForwardingRulesBody} from './model/LbIdForwardingRulesBody';
import {LbIdForwardingRulesBody1} from './model/LbIdForwardingRulesBody1';
import {LinkToFirstPage} from './model/LinkToFirstPage';
import {LinkToLastPage} from './model/LinkToLastPage';
import {LinkToNextPage} from './model/LinkToNextPage';
import {LinkToPrevPage} from './model/LinkToPrevPage';
import {ListAlertPolicy} from './model/ListAlertPolicy';
import {LoadBalancer} from './model/LoadBalancer';
import {LoadBalancerBase} from './model/LoadBalancerBase';
import {LoadBalancerCreate} from './model/LoadBalancerCreate';
import {MaintenancePolicy} from './model/MaintenancePolicy';
import {Meta} from './model/Meta';
import {MetaMeta} from './model/MetaMeta';
import {MetaMeta1} from './model/MetaMeta1';
import {Metrics} from './model/Metrics';
import {MetricsData} from './model/MetricsData';
import {MetricsResult} from './model/MetricsResult';
import {Model1Click} from './model/Model1Click';
import {Model1ClickCreate} from './model/Model1ClickCreate';
import {MysqlSettings} from './model/MysqlSettings';
import {NeighborIds} from './model/NeighborIds';
import {NetworkV4} from './model/NetworkV4';
import {NetworkV6} from './model/NetworkV6';
import {NewVolumeExt4} from './model/NewVolumeExt4';
import {NewVolumeXfs} from './model/NewVolumeXfs';
import {Node} from './model/Node';
import {NodePoolIdRecycleBody} from './model/NodePoolIdRecycleBody';
import {NodeStatus} from './model/NodeStatus';
import {OneOfdropletCreateImage} from './model/OneOfdropletCreateImage';
import {OneOfdropletsActionsBody} from './model/OneOfdropletsActionsBody';
import {OneOffloatingIpCreate} from './model/OneOffloatingIpCreate';
import {OneOfinlineResponse202} from './model/OneOfinlineResponse202';
import {OneOfloadBalancerCreate} from './model/OneOfloadBalancerCreate';
import {OneOfv2CertificatesBody} from './model/OneOfv2CertificatesBody';
import {OneOfv2DropletsBody} from './model/OneOfv2DropletsBody';
import {OnlineMigration} from './model/OnlineMigration';
import {PageLinks} from './model/PageLinks';
import {Pagination} from './model/Pagination';
import {ProductChargeItem} from './model/ProductChargeItem';
import {ProductUsageCharges} from './model/ProductUsageCharges';
import {Project} from './model/Project';
import {ProjectAssignment} from './model/ProjectAssignment';
import {ProjectBase} from './model/ProjectBase';
import {ProjectsDefaultBody} from './model/ProjectsDefaultBody';
import {ProjectsProjectIdBody} from './model/ProjectsProjectIdBody';
import {PurgeCache} from './model/PurgeCache';
import {Region} from './model/Region';
import {RegionSlug} from './model/RegionSlug';
import {RegionsArray} from './model/RegionsArray';
import {Registry} from './model/Registry';
import {RegistryCreate} from './model/RegistryCreate';
import {RegistrySubscriptionBody} from './model/RegistrySubscriptionBody';
import {Repository} from './model/Repository';
import {RepositoryTag} from './model/RepositoryTag';
import {Resource} from './model/Resource';
import {ResourceLinks} from './model/ResourceLinks';
import {SimpleCharge} from './model/SimpleCharge';
import {Size} from './model/Size';
import {SlackDetails} from './model/SlackDetails';
import {Slug} from './model/Slug';
import {Snapshot} from './model/Snapshot';
import {SnapshotBase} from './model/SnapshotBase';
import {SnapshotId} from './model/SnapshotId';
import {SourceDatabase} from './model/SourceDatabase';
import {SqlMode} from './model/SqlMode';
import {SshKey} from './model/SshKey';
import {SshKeyFingerprint} from './model/SshKeyFingerprint';
import {SshKeyId} from './model/SshKeyId';
import {SshKeyIdentifier} from './model/SshKeyIdentifier';
import {SshKeyName} from './model/SshKeyName';
import {StickySessions} from './model/StickySessions';
import {Subscription} from './model/Subscription';
import {SubscriptionTierBase} from './model/SubscriptionTierBase';
import {SubscriptionTierExtended} from './model/SubscriptionTierExtended';
import {Tag} from './model/Tag';
import {TagMetadata} from './model/TagMetadata';
import {TagResource} from './model/TagResource';
import {TagResourceResources} from './model/TagResourceResources';
import {TagsArray} from './model/TagsArray';
import {UpdateEndpoint} from './model/UpdateEndpoint';
import {UpdateRegistry} from './model/UpdateRegistry';
import {Urn} from './model/Urn';
import {User} from './model/User';
import {UserKubernetesClusterUser} from './model/UserKubernetesClusterUser';
import {UsernameResetAuthBody} from './model/UsernameResetAuthBody';
import {V2CertificatesBody} from './model/V2CertificatesBody';
import {V2DatabasesBody} from './model/V2DatabasesBody';
import {V2DropletsBody} from './model/V2DropletsBody';
import {V2FirewallsBody} from './model/V2FirewallsBody';
import {V2ProjectsBody} from './model/V2ProjectsBody';
import {V2VolumesBody} from './model/V2VolumesBody';
import {V2VpcsBody} from './model/V2VpcsBody';
import {ValidateRegistry} from './model/ValidateRegistry';
import {VolumeAction} from './model/VolumeAction';
import {VolumeActionDropletId} from './model/VolumeActionDropletId';
import {VolumeActionPostAttach} from './model/VolumeActionPostAttach';
import {VolumeActionPostBase} from './model/VolumeActionPostBase';
import {VolumeActionPostDetach} from './model/VolumeActionPostDetach';
import {VolumeActionPostResize} from './model/VolumeActionPostResize';
import {VolumeBase} from './model/VolumeBase';
import {VolumeFull} from './model/VolumeFull';
import {VolumeIdActionsBody} from './model/VolumeIdActionsBody';
import {VolumeIdSnapshotsBody} from './model/VolumeIdSnapshotsBody';
import {VolumeSnapshotId} from './model/VolumeSnapshotId';
import {VolumeWriteFileSystemLabel} from './model/VolumeWriteFileSystemLabel';
import {VolumeWriteFileSystemType} from './model/VolumeWriteFileSystemType';
import {VolumesActionsBody} from './model/VolumesActionsBody';
import {Vpc} from './model/Vpc';
import {VpcBase} from './model/VpcBase';
import {VpcCreate} from './model/VpcCreate';
import {VpcDefault} from './model/VpcDefault';
import {VpcMember} from './model/VpcMember';
import {VpcUpdatable} from './model/VpcUpdatable';
import {VpcsVpcIdBody} from './model/VpcsVpcIdBody';
import {VpcsVpcIdBody1} from './model/VpcsVpcIdBody1';
import {AccountApi} from './api/AccountApi';
import {ActionsApi} from './api/ActionsApi';
import {AppsApi} from './api/AppsApi';
import {BillingApi} from './api/BillingApi';
import {BlockStorageApi} from './api/BlockStorageApi';
import {BlockStorageActionsApi} from './api/BlockStorageActionsApi';
import {CDNEndpointsApi} from './api/CDNEndpointsApi';
import {CertificatesApi} from './api/CertificatesApi';
import {Class1ClickApplicationsApi} from './api/Class1ClickApplicationsApi';
import {ContainerRegistryApi} from './api/ContainerRegistryApi';
import {DatabasesApi} from './api/DatabasesApi';
import {DomainRecordsApi} from './api/DomainRecordsApi';
import {DomainsApi} from './api/DomainsApi';
import {DropletActionsApi} from './api/DropletActionsApi';
import {DropletsApi} from './api/DropletsApi';
import {FirewallsApi} from './api/FirewallsApi';
import {FloatingIPActionsApi} from './api/FloatingIPActionsApi';
import {FloatingIPsApi} from './api/FloatingIPsApi';
import {ImageActionsApi} from './api/ImageActionsApi';
import {ImagesApi} from './api/ImagesApi';
import {KubernetesApi} from './api/KubernetesApi';
import {LoadBalancersApi} from './api/LoadBalancersApi';
import {MonitoringApi} from './api/MonitoringApi';
import {ProjectResourcesApi} from './api/ProjectResourcesApi';
import {ProjectsApi} from './api/ProjectsApi';
import {RegionsApi} from './api/RegionsApi';
import {SSHKeysApi} from './api/SSHKeysApi';
import {SizesApi} from './api/SizesApi';
import {SnapshotsApi} from './api/SnapshotsApi';
import {TagsApi} from './api/TagsApi';
import {VPCsApi} from './api/VPCsApi';

/**
* _IntroductionThe_DigitalOcean_API_allows_you_to_manage_Droplets_and_resources_within_theDigitalOcean_cloud_in_a_simple_programmatic_way_using_conventional_HTTP_requests_All_of_the_functionality_that_you_are_familiar_with_in_the_DigitalOceancontrol_panel_is_also_available_through_the_API_allowing_you_to_script_thecomplex_actions_that_your_situation_requires_The_API_documentation_will_start_with_a_general_overview_about_the_designand_technology_that_has_been_implemented_followed_by_reference_informationabout_specific_endpoints__RequestsAny_tool_that_is_fluent_in_HTTP_can_communicate_with_the_API_simply_byrequesting_the_correct_URI__Requests_should_be_made_using_the_HTTPS_protocolso_that_traffic_is_encrypted__The_interface_responds_to_different_methodsdepending_on_the_action_required_MethodUsage________GETFor_simple_retrieval_of_information_about_your_account_Droplets_or_environment_you_should_use_the_GET_method___The_information_you_request_will_be_returned_to_you_as_a_JSON_object__The_attributes_defined_by_the_JSON_object_can_be_used_to_form_additional_requests___Any_request_using_the_GET_method_is_read_only_and_will_not_affect_any_of_the_objects_you_are_querying_DELETETo_destroy_a_resource_and_remove_it_from_your_account_and_environment_the_DELETE_method_should_be_used___This_will_remove_the_specified_object_if_it_is_found___If_it_is_not_found_the_operation_will_return_a_response_indicating_that_the_object_was_not_found__This_idempotency_means_that_you_do_not_have_to_check_for_a_resources_availability_prior_to_issuing_a_delete_command_the_final_state_will_be_the_same_regardless_of_its_existence_PUTTo_update_the_information_about_a_resource_in_your_account_the_PUT_method_is_available__Like_the_DELETE_Method_the_PUT_method_is_idempotent___It_sets_the_state_of_the_target_using_the_provided_values_regardless_of_their_current_values__Requests_using_the_PUT_method_do_not_need_to_check_the_current_attributes_of_the_object_PATCHSome_resources_support_partial_modification__In_these_cases_the_PATCH_method_is_available__Unlike_PUT_which_generally_requires_a_complete_representation_of_a_resource_a_PATCH_request_is_is_a_set_of_instructions_on_how_to_modify_a_resource_updating_only_specific_attributes_POSTTo_create_a_new_object_your_request_should_specify_the_POST_method__The_POST_request_includes_all_of_the_attributes_necessary_to_create_a_new_object___When_you_wish_to_create_a_new_object_send_a_POST_request_to_the_target_endpoint_HEADFinally_to_retrieve_metadata_information_you_should_use_the_HEAD_method_to_get_the_headers___This_returns_only_the_header_of_what_would_be_returned_with_an_associated_GET_request__Response_headers_contain_some_useful_information_about_your_API_access_and_the_results_that_are_available_for_your_request__For_instance_the_headers_contain_your_current_rate_limit_value_and_the_amount_of_time_available_until_the_limit_resets__It_also_contains_metrics_about_the_total_number_of_objects_found_pagination_information_and_the_total_content_length__HTTP_StatusesAlong_with_the_HTTP_methods_that_the_API_responds_to_it_will_also_returnstandard_HTTP_statuses_including_error_codes_In_the_event_of_a_problem_the_status_will_contain_the_error_code_while_thebody_of_the_response_will_usually_contain_additional_information_about_theproblem_that_was_encountered_In_general_if_the_status_returned_is_in_the_200_range_it_indicates_thatthe_request_was_fulfilled_successfully_and_that_no_error_was_encountered_Return_codes_in_the_400_range_typically_indicate_that_there_was_an_issuewith_the_request_that_was_sent__Among_other_things_this_could_mean_that_youdid_not_authenticate_correctly_that_you_are_requesting_an_action_that_youdo_not_have_authorization_for_that_the_object_you_are_requesting_does_notexist_or_that_your_request_is_malformed_If_you_receive_a_status_in_the_500_range_this_generally_indicates_aserver_side_problem__This_means_that_we_are_having_an_issue_on_our_end_andcannot_fulfill_your_request_currently_400_and_500_level_error_responses_will_include_a_JSON_object_in_their_bodyincluding_the_following_attributesNameTypeDescription____________idstringA_short_identifier_corresponding_to_the_HTTP_status_code_returned__For_example_the_ID_for_a_response_returning_a_404_status_code_would_be_not_found_messagestringA_message_providing_additional_information_about_the_error_including_details_to_help_resolve_it_when_possible_request_idstringOptionally_some_endpoints_may_include_a_request_ID_that_should_be_provided_when_reporting_bugs_or_opening_support_tickets_to_help_identify_the_issue__Example_Error_Response____HTTP1_1_403_Forbidden__________id_______forbidden______message__You_do_not_have_access_for_the_attempted_action______ResponsesWhen_a_request_is_successful_a_response_body_will_typically_be_sent_back_inthe_form_of_a_JSON_object__An_exception_to_this_is_when_a_DELETE_request_isprocessed_which_will_result_in_a_successful_HTTP_204_status_and_an_emptyresponse_body_Inside_of_this_JSON_object_the_resource_root_that_was_the_target_of_therequest_will_be_set_as_the_key__This_will_be_the_singular_form_of_the_wordif_the_request_operated_on_a_single_object_and_the_plural_form_of_the_wordif_a_collection_was_processed_For_example_if_you_send_a_GET_request_to_v2dropletsDROPLET_ID_youwill_get_back_an_object_with_a_key_called_droplet__However_if_you_sendthe_GET_request_to_the_general_collection_at_v2droplets_you_will_getback_an_object_with_a_key_called_droplets_The_value_of_these_keys_will_generally_be_a_JSON_object_for_a_request_on_asingle_object_and_an_array_of_objects_for_a_request_on_a_collection_ofobjects__Response_for_a_Single_Object____________droplet_____________name_example_com______________________________Response_for_an_Object_Collection____________droplets______________________________name_example_com_____________________________________________________________name_second_com______________________________________________MetaIn_addition_to_the_main_resource_root_the_response_may_also_contain_ameta_object__This_object_contains_information_about_the_response_itself_The_meta_object_contains_a_total_key_that_is_set_to_the_total_number_ofobjects_returned_by_the_request__This_has_implications_on_the_links_objectand_pagination_The_meta_object_will_only_be_displayed_when_it_has_a_value__Currently_themeta_object_will_have_a_value_when_a_request_is_made_on_a_collection__likedroplets_or_domains__Sample_Meta_Object_________________________meta_____________total_43__________________________Links__PaginationThe_links_object_is_returned_as_part_of_the_response_body_when_paginationis_enabled__By_default_20_objects_are_returned_per_page__If_the_responsecontains_20_objects_or_fewer_no_links_object_will_be_returned__If_theresponse_contains_more_than_20_objects_the_first_20_will_be_returned_alongwith_the_links_object_You_can_request_a_different_pagination_limit_or_force_pagination_byappending_per_page_to_the_request_with_the_number_of_items_you_wouldlike_per_page__For_instance_to_show_only_two_results_per_page_you_couldadd_per_page2_to_the_end_of_your_query__The_maximum_number_of_resultsper_page_is_200_The_links_object_contains_a_pages_object__The_pages_object_in_turncontains_keys_indicating_the_relationship_of_additional_pages__The_values_ofthese_are_the_URLs_of_the_associated_pages__The_keys_will_be_one_of_thefollowing___first_The_URI_of_the_first_page_of_results____prev_The_URI_of_the_previous_sequential_page_of_results____next_The_URI_of_the_next_sequential_page_of_results____last_The_URI_of_the_last_page_of_results_The_pages_object_will_only_include_the_links_that_make_sense__So_for_thefirst_page_of_results_no_first_or_prev_links_will_ever_be_set__Thisconvention_holds_true_in_other_situations_where_a_link_would_not_make_sense__Sample_Links_Object_________________________links_____________pages_________________last_httpsapi_digitalocean_comv2imagespage2________________next_httpsapi_digitalocean_comv2imagespage2______________________________________Rate_LimitRequests_through_the_API_are_rate_limited_per_OAuth_token__Current_rate_limits___5000_requests_per_hour___250_requests_per_minute__5_of_the_hourly_totalOnce_you_exceed_either_limit_you_will_be_rate_limited_until_the_next_cyclestarts__Space_out_any_requests_that_you_would_otherwise_issue_in_bursts_forthe_best_results_The_rate_limiting_information_is_contained_within_the_response_headers_ofeach_request__The_relevant_headers_are___RateLimit_Limit_The_number_of_requests_that_can_be_made_per_hour____RateLimit_Remaining_The_number_of_requests_that_remain_before_you_hit_your_request_limit__See_the_information_below_for_how_the_request_limits_expire____RateLimit_Reset_This_represents_the_time_when_the_oldest_request_will_expire__The_value_is_given_in__Unix_epoch_time_httpen_wikipedia_orgwikiUnix_time__See_below_for_more_information_about_how_request_limits_expire_As_long_as_the_RateLimit_Remaining_count_is_above_zero_you_will_be_ableto_make_additional_requests_The_way_that_a_request_expires_and_is_removed_from_the_current_limit_countis_important_to_understand__Rather_than_counting_all_of_the_requests_for_anhour_and_resetting_the_RateLimit_Remaining_value_at_the_end_of_the_houreach_request_instead_has_its_own_timer_This_means_that_each_request_contributes_toward_the_RateLimit_Remainingcount_for_one_complete_hour_after_the_request_is_made__When_that_requeststimer_runs_out_it_is_no_longer_counted_towards_the_request_limit_This_has_implications_on_the_meaning_of_the_RateLimit_Reset_header_aswell__Because_the_entire_rate_limit_is_not_reset_at_one_time_the_value_ofthis_header_is_set_to_the_time_when_the__oldest__request_will_expire_Keep_this_in_mind_if_you_see_your_RateLimit_Reset_value_change_but_notmove_an_entire_hour_into_the_future_If_the_RateLimit_Remaining_reaches_zero_subsequent_requests_will_receivea_429_error_code_until_the_request_reset_has_been_reached__You_can_see_theformat_of_the_response_in_the_examples_Note_The_following_endpoints_have_special_rate_limit_requirements_thatare_independent_of_the_limits_defined_above____Only_12_POST_requests_to_the_v2floating_ips_endpoint_to_create_Floating_IPs_can_be_made_per_60_seconds____Only_10_GET_requests_to_the_v2accountkeys_endpoint_to_list_SSH_keys_can_be_made_per_60_seconds__Sample_Rate_Limit_Headers_____________RateLimit_Limit_1200____RateLimit_Remaining_1193____RateLimit_Reset_1402425459__________Sample_Rate_Exceeded_Response____429_Too_Many_Requests________________id_too_many_requests____________message_API_Rate_limit_exceeded______Curl_ExamplesThroughout_this_document_some_example_API_requests_will_be_given_using_thecurl_command__This_will_allow_us_to_demonstrate_the_various_endpoints_in_asimple_textual_format_The_names_of_account_specific_references__like_Droplet_IDs_for_instancewill_be_represented_by_variables__For_instance_a_Droplet_ID_may_berepresented_by_a_variable_called_DROPLET_ID__You_can_set_the_associatedvariables_in_your_environment_if_you_wish_to_use_the_examples_withoutmodification_The_first_variable_that_you_should_set_to_get_started_is_your_OAuthauthorization_token__The_next_section_will_go_over_the_details_of_this_butyou_can_set_an_environmental_variable_for_it_now_Generate_a_token_by_going_to_the__Apps__API_httpscloud_digitalocean_comsettingsapplicationssection_of_the_DigitalOcean_control_panel__Use_an_existing_token_if_you_havesaved_one_or_generate_a_new_token_with_the_Generate_new_token_button_Copy_the_generated_token_and_use_it_to_set_and_export_the_TOKEN_variable_inyour_environment_as_the_example_shows_You_may_also_wish_to_set_some_other_variables_now_or_as_you_go_along__Forexample_you_may_wish_to_set_the_DROPLET_ID_variable_to_one_of_yourDroplet_IDs_since_this_will_be_used_frequently_in_the_API_If_you_are_following_along_make_sure_you_use_a_Droplet_ID_that_you_controlso_that_your_commands_will_execute_correctly_If_you_need_access_to_the_headers_of_a_response_through_curl_you_can_passthe__i_flag_to_display_the_header_information_along_with_the_body__If_youare_only_interested_in_the_header_you_can_instead_pass_the__I_flag_whichwill_exclude_the_response_body_entirely__Set_and_Export_your_OAuth_Tokenexport_DIGITALOCEAN_TOKENyour_token_here_Set_and_Export_a_Variableexport_DROPLET_ID1111111_ParametersThere_are_two_different_ways_to_pass_parameters_in_a_request_with_the_API_When_passing_parameters_to_create_or_update_an_object_parameters_should_bepassed_as_a_JSON_object_containing_the_appropriate_attribute_names_andvalues_as_key_value_pairs__When_you_use_this_format_you_should_specify_thatyou_are_sending_a_JSON_object_in_the_header__This_is_done_by_setting_theContent_Type_header_to_applicationjson__This_ensures_that_your_requestis_interpreted_correctly_When_passing_parameters_to_filter_a_response_on_GET_requests_parameters_canbe_passed_using_standard_query_attributes__In_this_case_the_parameterswould_be_embedded_into_the_URI_itself_by_appending_a__to_the_end_of_theURI_and_then_setting_each_attribute_with_an_equal_sign__Attributes_can_beseparated_with_a___Tools_like_curl_can_create_the_appropriate_URI_whengiven_parameters_and_values_this_can_also_be_done_using_the__F_flag_andthen_passing_the_key_and_value_as_an_argument__The_argument_should_take_theform_of_a_quoted_string_with_the_attribute_being_set_to_a_value_with_anequal_sign__Pass_Parameters_as_a_JSON_Object____curl__H_Authorization_Bearer_DIGITALOCEAN_TOKEN__________H_Content_Type_applicationjson__________d_name_example_com_ip_address_127_0_0_1__________X_POST_httpsapi_digitalocean_comv2domains_Pass_Filter_Parameters_as_a_Query_String_____curl__H_Authorization_Bearer_DIGITALOCEAN_TOKEN___________X_GET__________httpsapi_digitalocean_comv2imagesprivatetrue_Cross_Origin_Resource_SharingIn_order_to_make_requests_to_the_API_from_other_domains_the_API_implementsCross_Origin_Resource_Sharing__CORS_support_CORS_support_is_generally_used_to_create_AJAX_requests_outside_of_the_domainthat_the_request_originated_from__This_is_necessary_to_implement_projectslike_control_panels_utilizing_the_API__This_tells_the_browser_that_it_cansend_requests_to_an_outside_domain_The_procedure_that_the_browser_initiates_in_order_to_perform_these_actions_other_than_GET_requests_begins_by_sending_a_preflight_request__This_setsthe_Origin_header_and_uses_the_OPTIONS_method__The_server_will_replyback_with_the_methods_it_allows_and_some_of_the_limits_it_imposes__Theclient_then_sends_the_actual_request_if_it_falls_within_the_allowedconstraints_This_process_is_usually_done_in_the_background_by_the_browser_but_you_canuse_curl_to_emulate_this_process_using_the_example_provided__The_headersthat_will_be_set_to_show_the_constraints_are___Access_Control_Allow_Origin_This_is_the_domain_that_is_sent_by_the_client_or_browser_as_the_origin_of_the_request__It_is_set_through_an_Origin_header____Access_Control_Allow_Methods_This_specifies_the_allowed_options_for_requests_from_that_domain__This_will_generally_be_all_available_methods____Access_Control_Expose_Headers_This_will_contain_the_headers_that_will_be_available_to_requests_from_the_origin_domain____Access_Control_Max_Age_This_is_the_length_of_time_that_the_access_is_considered_valid__After_this_expires_a_new_preflight_should_be_sent____Access_Control_Allow_Credentials_This_will_be_set_to_true__It_basically_allows_you_to_send_your_OAuth_token_for_authentication_You_should_not_need_to_be_concerned_with_the_details_of_these_headersbecause_the_browser_will_typically_do_all_of_the_work_for_you_.<br>
* The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
* <p>
* An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
* <pre>
* var DigitalOceanApi = require('index'); // See note below*.
* var xxxSvc = new DigitalOceanApi.XxxApi(); // Allocate the API class we're going to use.
* var yyyModel = new DigitalOceanApi.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* <em>*NOTE: For a top-level AMD script, use require(['index'], function(){...})
* and put the application logic within the callback function.</em>
* </p>
* <p>
* A non-AMD browser application (discouraged) might do something like this:
* <pre>
* var xxxSvc = new DigitalOceanApi.XxxApi(); // Allocate the API class we're going to use.
* var yyy = new DigitalOceanApi.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* </p>
* @module index
* @version 2.0
*/
export {
    /**
     * The ApiClient constructor.
     * @property {module:ApiClient}
     */
    ApiClient,

    /**
     * The Account model constructor.
     * @property {module:model/Account}
     */
    Account,

    /**
     * The Action model constructor.
     * @property {module:model/Action}
     */
    Action,

    /**
     * The ActionLink model constructor.
     * @property {module:model/ActionLink}
     */
    ActionLink,

    /**
     * The AlertPolicy model constructor.
     * @property {module:model/AlertPolicy}
     */
    AlertPolicy,

    /**
     * The AlertPolicyRequest model constructor.
     * @property {module:model/AlertPolicyRequest}
     */
    AlertPolicyRequest,

    /**
     * The Alerts model constructor.
     * @property {module:model/Alerts}
     */
    Alerts,

    /**
     * The AllOfactionRegionSlug model constructor.
     * @property {module:model/AllOfactionRegionSlug}
     */
    AllOfactionRegionSlug,

    /**
     * The AllOfconnectionPoolConnection model constructor.
     * @property {module:model/AllOfconnectionPoolConnection}
     */
    AllOfconnectionPoolConnection,

    /**
     * The AllOfconnectionPoolPrivateConnection model constructor.
     * @property {module:model/AllOfconnectionPoolPrivateConnection}
     */
    AllOfconnectionPoolPrivateConnection,

    /**
     * The AllOfdatabaseClusterConnection model constructor.
     * @property {module:model/AllOfdatabaseClusterConnection}
     */
    AllOfdatabaseClusterConnection,

    /**
     * The AllOfdatabaseClusterMaintenanceWindow model constructor.
     * @property {module:model/AllOfdatabaseClusterMaintenanceWindow}
     */
    AllOfdatabaseClusterMaintenanceWindow,

    /**
     * The AllOfdatabaseClusterPrivateConnection model constructor.
     * @property {module:model/AllOfdatabaseClusterPrivateConnection}
     */
    AllOfdatabaseClusterPrivateConnection,

    /**
     * The AllOfdatabaseReplicaConnection model constructor.
     * @property {module:model/AllOfdatabaseReplicaConnection}
     */
    AllOfdatabaseReplicaConnection,

    /**
     * The AllOfdatabaseReplicaPrivateConnection model constructor.
     * @property {module:model/AllOfdatabaseReplicaPrivateConnection}
     */
    AllOfdatabaseReplicaPrivateConnection,

    /**
     * The AllOffirewallIdTagsBody1Tags model constructor.
     * @property {module:model/AllOffirewallIdTagsBody1Tags}
     */
    AllOffirewallIdTagsBody1Tags,

    /**
     * The AllOffirewallIdTagsBodyTags model constructor.
     * @property {module:model/AllOffirewallIdTagsBodyTags}
     */
    AllOffirewallIdTagsBodyTags,

    /**
     * The AllOffirewallRuleTargetTags model constructor.
     * @property {module:model/AllOffirewallRuleTargetTags}
     */
    AllOffirewallRuleTargetTags,

    /**
     * The AllOffirewallRulesInboundRulesItems model constructor.
     * @property {module:model/AllOffirewallRulesInboundRulesItems}
     */
    AllOffirewallRulesInboundRulesItems,

    /**
     * The AllOffirewallRulesOutboundRulesItems model constructor.
     * @property {module:model/AllOffirewallRulesOutboundRulesItems}
     */
    AllOffirewallRulesOutboundRulesItems,

    /**
     * The AllOffloatingIpRegion model constructor.
     * @property {module:model/AllOffloatingIpRegion}
     */
    AllOffloatingIpRegion,

    /**
     * The AllOfinlineResponse20051OptionsSubscriptionTiersItems model constructor.
     * @property {module:model/AllOfinlineResponse20051OptionsSubscriptionTiersItems}
     */
    AllOfinlineResponse20051OptionsSubscriptionTiersItems,

    /**
     * The AllOfinvoiceSummaryCreditsAndAdjustments model constructor.
     * @property {module:model/AllOfinvoiceSummaryCreditsAndAdjustments}
     */
    AllOfinvoiceSummaryCreditsAndAdjustments,

    /**
     * The AllOfinvoiceSummaryOverages model constructor.
     * @property {module:model/AllOfinvoiceSummaryOverages}
     */
    AllOfinvoiceSummaryOverages,

    /**
     * The AllOfinvoiceSummaryProductCharges model constructor.
     * @property {module:model/AllOfinvoiceSummaryProductCharges}
     */
    AllOfinvoiceSummaryProductCharges,

    /**
     * The AllOfinvoiceSummaryTaxes model constructor.
     * @property {module:model/AllOfinvoiceSummaryTaxes}
     */
    AllOfinvoiceSummaryTaxes,

    /**
     * The AllOfinvoiceSummaryUserBillingAddress model constructor.
     * @property {module:model/AllOfinvoiceSummaryUserBillingAddress}
     */
    AllOfinvoiceSummaryUserBillingAddress,

    /**
     * The AllOfregistrySubscription model constructor.
     * @property {module:model/AllOfregistrySubscription}
     */
    AllOfregistrySubscription,

    /**
     * The AllOfsourceDatabaseSource model constructor.
     * @property {module:model/AllOfsourceDatabaseSource}
     */
    AllOfsourceDatabaseSource,

    /**
     * The AllOftagResources model constructor.
     * @property {module:model/AllOftagResources}
     */
    AllOftagResources,

    /**
     * The AnyOfdomainNameRecordsBody model constructor.
     * @property {module:model/AnyOfdomainNameRecordsBody}
     */
    AnyOfdomainNameRecordsBody,

    /**
     * The AnyOfdropletCreateSshKeysItems model constructor.
     * @property {module:model/AnyOfdropletCreateSshKeysItems}
     */
    AnyOfdropletCreateSshKeysItems,

    /**
     * The AnyOfdropletIdActionsBody model constructor.
     * @property {module:model/AnyOfdropletIdActionsBody}
     */
    AnyOfdropletIdActionsBody,

    /**
     * The AnyOffloatingIpActionsBody model constructor.
     * @property {module:model/AnyOffloatingIpActionsBody}
     */
    AnyOffloatingIpActionsBody,

    /**
     * The AnyOffloatingIpDroplet model constructor.
     * @property {module:model/AnyOffloatingIpDroplet}
     */
    AnyOffloatingIpDroplet,

    /**
     * The AnyOfimageId model constructor.
     * @property {module:model/AnyOfimageId}
     */
    AnyOfimageId,

    /**
     * The AnyOfimageIdActionsBody model constructor.
     * @property {module:model/AnyOfimageIdActionsBody}
     */
    AnyOfimageIdActionsBody,

    /**
     * The AnyOfpageLinksPages model constructor.
     * @property {module:model/AnyOfpageLinksPages}
     */
    AnyOfpageLinksPages,

    /**
     * The AnyOfsnapshotId model constructor.
     * @property {module:model/AnyOfsnapshotId}
     */
    AnyOfsnapshotId,

    /**
     * The AnyOfsshKeyIdentifier model constructor.
     * @property {module:model/AnyOfsshKeyIdentifier}
     */
    AnyOfsshKeyIdentifier,

    /**
     * The AnyOfv2VolumesBody model constructor.
     * @property {module:model/AnyOfv2VolumesBody}
     */
    AnyOfv2VolumesBody,

    /**
     * The AnyOfvolumeIdActionsBody model constructor.
     * @property {module:model/AnyOfvolumeIdActionsBody}
     */
    AnyOfvolumeIdActionsBody,

    /**
     * The AnyOfvolumesActionsBody model constructor.
     * @property {module:model/AnyOfvolumesActionsBody}
     */
    AnyOfvolumesActionsBody,

    /**
     * The App model constructor.
     * @property {module:model/App}
     */
    App,

    /**
     * The AppComponentBase model constructor.
     * @property {module:model/AppComponentBase}
     */
    AppComponentBase,

    /**
     * The AppComponentInstanceBase model constructor.
     * @property {module:model/AppComponentInstanceBase}
     */
    AppComponentInstanceBase,

    /**
     * The AppDatabaseSpec model constructor.
     * @property {module:model/AppDatabaseSpec}
     */
    AppDatabaseSpec,

    /**
     * The AppDomainSpec model constructor.
     * @property {module:model/AppDomainSpec}
     */
    AppDomainSpec,

    /**
     * The AppJobSpec model constructor.
     * @property {module:model/AppJobSpec}
     */
    AppJobSpec,

    /**
     * The AppPropose model constructor.
     * @property {module:model/AppPropose}
     */
    AppPropose,

    /**
     * The AppProposeResponse model constructor.
     * @property {module:model/AppProposeResponse}
     */
    AppProposeResponse,

    /**
     * The AppResponse model constructor.
     * @property {module:model/AppResponse}
     */
    AppResponse,

    /**
     * The AppRouteSpec model constructor.
     * @property {module:model/AppRouteSpec}
     */
    AppRouteSpec,

    /**
     * The AppServiceSpec model constructor.
     * @property {module:model/AppServiceSpec}
     */
    AppServiceSpec,

    /**
     * The AppServiceSpecHealthCheck model constructor.
     * @property {module:model/AppServiceSpecHealthCheck}
     */
    AppServiceSpecHealthCheck,

    /**
     * The AppSpec model constructor.
     * @property {module:model/AppSpec}
     */
    AppSpec,

    /**
     * The AppStaticSiteSpec model constructor.
     * @property {module:model/AppStaticSiteSpec}
     */
    AppStaticSiteSpec,

    /**
     * The AppVariableDefinition model constructor.
     * @property {module:model/AppVariableDefinition}
     */
    AppVariableDefinition,

    /**
     * The AppWorkerSpec model constructor.
     * @property {module:model/AppWorkerSpec}
     */
    AppWorkerSpec,

    /**
     * The AppsCorsPolicy model constructor.
     * @property {module:model/AppsCorsPolicy}
     */
    AppsCorsPolicy,

    /**
     * The AppsCreateAppRequest model constructor.
     * @property {module:model/AppsCreateAppRequest}
     */
    AppsCreateAppRequest,

    /**
     * The AppsCreateDeploymentRequest model constructor.
     * @property {module:model/AppsCreateDeploymentRequest}
     */
    AppsCreateDeploymentRequest,

    /**
     * The AppsDeleteAppResponse model constructor.
     * @property {module:model/AppsDeleteAppResponse}
     */
    AppsDeleteAppResponse,

    /**
     * The AppsDeployment model constructor.
     * @property {module:model/AppsDeployment}
     */
    AppsDeployment,

    /**
     * The AppsDeploymentJob model constructor.
     * @property {module:model/AppsDeploymentJob}
     */
    AppsDeploymentJob,

    /**
     * The AppsDeploymentPhase model constructor.
     * @property {module:model/AppsDeploymentPhase}
     */
    AppsDeploymentPhase,

    /**
     * The AppsDeploymentProgress model constructor.
     * @property {module:model/AppsDeploymentProgress}
     */
    AppsDeploymentProgress,

    /**
     * The AppsDeploymentProgressStep model constructor.
     * @property {module:model/AppsDeploymentProgressStep}
     */
    AppsDeploymentProgressStep,

    /**
     * The AppsDeploymentProgressStepReason model constructor.
     * @property {module:model/AppsDeploymentProgressStepReason}
     */
    AppsDeploymentProgressStepReason,

    /**
     * The AppsDeploymentProgressStepStatus model constructor.
     * @property {module:model/AppsDeploymentProgressStepStatus}
     */
    AppsDeploymentProgressStepStatus,

    /**
     * The AppsDeploymentResponse model constructor.
     * @property {module:model/AppsDeploymentResponse}
     */
    AppsDeploymentResponse,

    /**
     * The AppsDeploymentService model constructor.
     * @property {module:model/AppsDeploymentService}
     */
    AppsDeploymentService,

    /**
     * The AppsDeploymentStaticSite model constructor.
     * @property {module:model/AppsDeploymentStaticSite}
     */
    AppsDeploymentStaticSite,

    /**
     * The AppsDeploymentWorker model constructor.
     * @property {module:model/AppsDeploymentWorker}
     */
    AppsDeploymentWorker,

    /**
     * The AppsDeploymentsResponse model constructor.
     * @property {module:model/AppsDeploymentsResponse}
     */
    AppsDeploymentsResponse,

    /**
     * The AppsDomain model constructor.
     * @property {module:model/AppsDomain}
     */
    AppsDomain,

    /**
     * The AppsDomainPhase model constructor.
     * @property {module:model/AppsDomainPhase}
     */
    AppsDomainPhase,

    /**
     * The AppsDomainProgress model constructor.
     * @property {module:model/AppsDomainProgress}
     */
    AppsDomainProgress,

    /**
     * The AppsGetInstanceSizeResponse model constructor.
     * @property {module:model/AppsGetInstanceSizeResponse}
     */
    AppsGetInstanceSizeResponse,

    /**
     * The AppsGetLogsResponse model constructor.
     * @property {module:model/AppsGetLogsResponse}
     */
    AppsGetLogsResponse,

    /**
     * The AppsGetTierResponse model constructor.
     * @property {module:model/AppsGetTierResponse}
     */
    AppsGetTierResponse,

    /**
     * The AppsGitSourceSpec model constructor.
     * @property {module:model/AppsGitSourceSpec}
     */
    AppsGitSourceSpec,

    /**
     * The AppsGithubSourceSpec model constructor.
     * @property {module:model/AppsGithubSourceSpec}
     */
    AppsGithubSourceSpec,

    /**
     * The AppsGitlabSourceSpec model constructor.
     * @property {module:model/AppsGitlabSourceSpec}
     */
    AppsGitlabSourceSpec,

    /**
     * The AppsImageSourceSpec model constructor.
     * @property {module:model/AppsImageSourceSpec}
     */
    AppsImageSourceSpec,

    /**
     * The AppsInstanceSize model constructor.
     * @property {module:model/AppsInstanceSize}
     */
    AppsInstanceSize,

    /**
     * The AppsListInstanceSizesResponse model constructor.
     * @property {module:model/AppsListInstanceSizesResponse}
     */
    AppsListInstanceSizesResponse,

    /**
     * The AppsListRegionsResponse model constructor.
     * @property {module:model/AppsListRegionsResponse}
     */
    AppsListRegionsResponse,

    /**
     * The AppsListTiersResponse model constructor.
     * @property {module:model/AppsListTiersResponse}
     */
    AppsListTiersResponse,

    /**
     * The AppsRegion model constructor.
     * @property {module:model/AppsRegion}
     */
    AppsRegion,

    /**
     * The AppsResponse model constructor.
     * @property {module:model/AppsResponse}
     */
    AppsResponse,

    /**
     * The AppsStringMatch model constructor.
     * @property {module:model/AppsStringMatch}
     */
    AppsStringMatch,

    /**
     * The AppsTier model constructor.
     * @property {module:model/AppsTier}
     */
    AppsTier,

    /**
     * The AppsUpdateAppRequest model constructor.
     * @property {module:model/AppsUpdateAppRequest}
     */
    AppsUpdateAppRequest,

    /**
     * The AssociatedKubernetesResource model constructor.
     * @property {module:model/AssociatedKubernetesResource}
     */
    AssociatedKubernetesResource,

    /**
     * The AssociatedKubernetesResources model constructor.
     * @property {module:model/AssociatedKubernetesResources}
     */
    AssociatedKubernetesResources,

    /**
     * The AssociatedResource model constructor.
     * @property {module:model/AssociatedResource}
     */
    AssociatedResource,

    /**
     * The AssociatedResourceStatus model constructor.
     * @property {module:model/AssociatedResourceStatus}
     */
    AssociatedResourceStatus,

    /**
     * The AssociatedResourceStatusResources model constructor.
     * @property {module:model/AssociatedResourceStatusResources}
     */
    AssociatedResourceStatusResources,

    /**
     * The Backup model constructor.
     * @property {module:model/Backup}
     */
    Backup,

    /**
     * The BackwardLinks model constructor.
     * @property {module:model/BackwardLinks}
     */
    BackwardLinks,

    /**
     * The Balance model constructor.
     * @property {module:model/Balance}
     */
    Balance,

    /**
     * The BillingAddress model constructor.
     * @property {module:model/BillingAddress}
     */
    BillingAddress,

    /**
     * The BillingHistory model constructor.
     * @property {module:model/BillingHistory}
     */
    BillingHistory,

    /**
     * The Ca model constructor.
     * @property {module:model/Ca}
     */
    Ca,

    /**
     * The CdnEndpoint model constructor.
     * @property {module:model/CdnEndpoint}
     */
    CdnEndpoint,

    /**
     * The Certificate model constructor.
     * @property {module:model/Certificate}
     */
    Certificate,

    /**
     * The CertificateCreateBase model constructor.
     * @property {module:model/CertificateCreateBase}
     */
    CertificateCreateBase,

    /**
     * The CertificateRequestCustom model constructor.
     * @property {module:model/CertificateRequestCustom}
     */
    CertificateRequestCustom,

    /**
     * The CertificateRequestLetsEncrypt model constructor.
     * @property {module:model/CertificateRequestLetsEncrypt}
     */
    CertificateRequestLetsEncrypt,

    /**
     * The Cluster model constructor.
     * @property {module:model/Cluster}
     */
    Cluster,

    /**
     * The ClusterIdUpgradeBody model constructor.
     * @property {module:model/ClusterIdUpgradeBody}
     */
    ClusterIdUpgradeBody,

    /**
     * The ClusterRegistries model constructor.
     * @property {module:model/ClusterRegistries}
     */
    ClusterRegistries,

    /**
     * The ClusterStatus model constructor.
     * @property {module:model/ClusterStatus}
     */
    ClusterStatus,

    /**
     * The ClusterUpdate model constructor.
     * @property {module:model/ClusterUpdate}
     */
    ClusterUpdate,

    /**
     * The ClusterlintRequest model constructor.
     * @property {module:model/ClusterlintRequest}
     */
    ClusterlintRequest,

    /**
     * The ClusterlintResults model constructor.
     * @property {module:model/ClusterlintResults}
     */
    ClusterlintResults,

    /**
     * The ClusterlintResultsDiagnostics model constructor.
     * @property {module:model/ClusterlintResultsDiagnostics}
     */
    ClusterlintResultsDiagnostics,

    /**
     * The ClusterlintResultsObject model constructor.
     * @property {module:model/ClusterlintResultsObject}
     */
    ClusterlintResultsObject,

    /**
     * The ConnectionPool model constructor.
     * @property {module:model/ConnectionPool}
     */
    ConnectionPool,

    /**
     * The ConnectionPools model constructor.
     * @property {module:model/ConnectionPools}
     */
    ConnectionPools,

    /**
     * The Credentials model constructor.
     * @property {module:model/Credentials}
     */
    Credentials,

    /**
     * The Database model constructor.
     * @property {module:model/Database}
     */
    Database,

    /**
     * The DatabaseBackup model constructor.
     * @property {module:model/DatabaseBackup}
     */
    DatabaseBackup,

    /**
     * The DatabaseCluster model constructor.
     * @property {module:model/DatabaseCluster}
     */
    DatabaseCluster,

    /**
     * The DatabaseClusterResize model constructor.
     * @property {module:model/DatabaseClusterResize}
     */
    DatabaseClusterResize,

    /**
     * The DatabaseClusterUuidFirewallBody model constructor.
     * @property {module:model/DatabaseClusterUuidFirewallBody}
     */
    DatabaseClusterUuidFirewallBody,

    /**
     * The DatabaseClusterUuidMigrateBody model constructor.
     * @property {module:model/DatabaseClusterUuidMigrateBody}
     */
    DatabaseClusterUuidMigrateBody,

    /**
     * The DatabaseClusterUuidReplicasBody model constructor.
     * @property {module:model/DatabaseClusterUuidReplicasBody}
     */
    DatabaseClusterUuidReplicasBody,

    /**
     * The DatabaseConnection model constructor.
     * @property {module:model/DatabaseConnection}
     */
    DatabaseConnection,

    /**
     * The DatabaseMaintenanceWindow model constructor.
     * @property {module:model/DatabaseMaintenanceWindow}
     */
    DatabaseMaintenanceWindow,

    /**
     * The DatabaseReplica model constructor.
     * @property {module:model/DatabaseReplica}
     */
    DatabaseReplica,

    /**
     * The DatabaseUser model constructor.
     * @property {module:model/DatabaseUser}
     */
    DatabaseUser,

    /**
     * The DestroyAssociatedKubernetesResources model constructor.
     * @property {module:model/DestroyAssociatedKubernetesResources}
     */
    DestroyAssociatedKubernetesResources,

    /**
     * The DestroyedAssociatedResource model constructor.
     * @property {module:model/DestroyedAssociatedResource}
     */
    DestroyedAssociatedResource,

    /**
     * The Distribution model constructor.
     * @property {module:model/Distribution}
     */
    Distribution,

    /**
     * The DockerCredentials model constructor.
     * @property {module:model/DockerCredentials}
     */
    DockerCredentials,

    /**
     * The DockerCredentialsAuths model constructor.
     * @property {module:model/DockerCredentialsAuths}
     */
    DockerCredentialsAuths,

    /**
     * The DockerCredentialsAuthsRegistryDigitaloceanCom model constructor.
     * @property {module:model/DockerCredentialsAuthsRegistryDigitaloceanCom}
     */
    DockerCredentialsAuthsRegistryDigitaloceanCom,

    /**
     * The Domain model constructor.
     * @property {module:model/Domain}
     */
    Domain,

    /**
     * The DomainNameRecordsBody model constructor.
     * @property {module:model/DomainNameRecordsBody}
     */
    DomainNameRecordsBody,

    /**
     * The DomainRecord model constructor.
     * @property {module:model/DomainRecord}
     */
    DomainRecord,

    /**
     * The DomainRecordA model constructor.
     * @property {module:model/DomainRecordA}
     */
    DomainRecordA,

    /**
     * The DomainRecordAaaa model constructor.
     * @property {module:model/DomainRecordAaaa}
     */
    DomainRecordAaaa,

    /**
     * The DomainRecordCaa model constructor.
     * @property {module:model/DomainRecordCaa}
     */
    DomainRecordCaa,

    /**
     * The DomainRecordCname model constructor.
     * @property {module:model/DomainRecordCname}
     */
    DomainRecordCname,

    /**
     * The DomainRecordMx model constructor.
     * @property {module:model/DomainRecordMx}
     */
    DomainRecordMx,

    /**
     * The DomainRecordNs model constructor.
     * @property {module:model/DomainRecordNs}
     */
    DomainRecordNs,

    /**
     * The DomainRecordSoa model constructor.
     * @property {module:model/DomainRecordSoa}
     */
    DomainRecordSoa,

    /**
     * The DomainRecordSrv model constructor.
     * @property {module:model/DomainRecordSrv}
     */
    DomainRecordSrv,

    /**
     * The DomainRecordTxt model constructor.
     * @property {module:model/DomainRecordTxt}
     */
    DomainRecordTxt,

    /**
     * The Droplet model constructor.
     * @property {module:model/Droplet}
     */
    Droplet,

    /**
     * The DropletActionChangeKernel model constructor.
     * @property {module:model/DropletActionChangeKernel}
     */
    DropletActionChangeKernel,

    /**
     * The DropletActionRebuild model constructor.
     * @property {module:model/DropletActionRebuild}
     */
    DropletActionRebuild,

    /**
     * The DropletActionRename model constructor.
     * @property {module:model/DropletActionRename}
     */
    DropletActionRename,

    /**
     * The DropletActionResize model constructor.
     * @property {module:model/DropletActionResize}
     */
    DropletActionResize,

    /**
     * The DropletActionRestore model constructor.
     * @property {module:model/DropletActionRestore}
     */
    DropletActionRestore,

    /**
     * The DropletActionSnapshot model constructor.
     * @property {module:model/DropletActionSnapshot}
     */
    DropletActionSnapshot,

    /**
     * The DropletActionType model constructor.
     * @property {module:model/DropletActionType}
     */
    DropletActionType,

    /**
     * The DropletCreate model constructor.
     * @property {module:model/DropletCreate}
     */
    DropletCreate,

    /**
     * The DropletIdActionsBody model constructor.
     * @property {module:model/DropletIdActionsBody}
     */
    DropletIdActionsBody,

    /**
     * The DropletMultiCreate model constructor.
     * @property {module:model/DropletMultiCreate}
     */
    DropletMultiCreate,

    /**
     * The DropletNetworks model constructor.
     * @property {module:model/DropletNetworks}
     */
    DropletNetworks,

    /**
     * The DropletNextBackupWindow model constructor.
     * @property {module:model/DropletNextBackupWindow}
     */
    DropletNextBackupWindow,

    /**
     * The DropletSingleCreate model constructor.
     * @property {module:model/DropletSingleCreate}
     */
    DropletSingleCreate,

    /**
     * The DropletSnapshot model constructor.
     * @property {module:model/DropletSnapshot}
     */
    DropletSnapshot,

    /**
     * The DropletsActionsBody model constructor.
     * @property {module:model/DropletsActionsBody}
     */
    DropletsActionsBody,

    /**
     * The Error model constructor.
     * @property {module:model/Error}
     */
    Error,

    /**
     * The ErrorWithRootCauses model constructor.
     * @property {module:model/ErrorWithRootCauses}
     */
    ErrorWithRootCauses,

    /**
     * The EvictionPolicy model constructor.
     * @property {module:model/EvictionPolicy}
     */
    EvictionPolicy,

    /**
     * The Firewall model constructor.
     * @property {module:model/Firewall}
     */
    Firewall,

    /**
     * The FirewallIdDropletsBody model constructor.
     * @property {module:model/FirewallIdDropletsBody}
     */
    FirewallIdDropletsBody,

    /**
     * The FirewallIdDropletsBody1 model constructor.
     * @property {module:model/FirewallIdDropletsBody1}
     */
    FirewallIdDropletsBody1,

    /**
     * The FirewallIdRulesBody model constructor.
     * @property {module:model/FirewallIdRulesBody}
     */
    FirewallIdRulesBody,

    /**
     * The FirewallIdRulesBody1 model constructor.
     * @property {module:model/FirewallIdRulesBody1}
     */
    FirewallIdRulesBody1,

    /**
     * The FirewallIdTagsBody model constructor.
     * @property {module:model/FirewallIdTagsBody}
     */
    FirewallIdTagsBody,

    /**
     * The FirewallIdTagsBody1 model constructor.
     * @property {module:model/FirewallIdTagsBody1}
     */
    FirewallIdTagsBody1,

    /**
     * The FirewallPendingChanges model constructor.
     * @property {module:model/FirewallPendingChanges}
     */
    FirewallPendingChanges,

    /**
     * The FirewallRule model constructor.
     * @property {module:model/FirewallRule}
     */
    FirewallRule,

    /**
     * The FirewallRuleBase model constructor.
     * @property {module:model/FirewallRuleBase}
     */
    FirewallRuleBase,

    /**
     * The FirewallRuleTarget model constructor.
     * @property {module:model/FirewallRuleTarget}
     */
    FirewallRuleTarget,

    /**
     * The FirewallRules model constructor.
     * @property {module:model/FirewallRules}
     */
    FirewallRules,

    /**
     * The FirewallsFirewallIdBody model constructor.
     * @property {module:model/FirewallsFirewallIdBody}
     */
    FirewallsFirewallIdBody,

    /**
     * The FloatingIp model constructor.
     * @property {module:model/FloatingIp}
     */
    FloatingIp,

    /**
     * The FloatingIpActionAssign model constructor.
     * @property {module:model/FloatingIpActionAssign}
     */
    FloatingIpActionAssign,

    /**
     * The FloatingIpActionType model constructor.
     * @property {module:model/FloatingIpActionType}
     */
    FloatingIpActionType,

    /**
     * The FloatingIpActionUnassign model constructor.
     * @property {module:model/FloatingIpActionUnassign}
     */
    FloatingIpActionUnassign,

    /**
     * The FloatingIpActionsBody model constructor.
     * @property {module:model/FloatingIpActionsBody}
     */
    FloatingIpActionsBody,

    /**
     * The FloatingIpCreate model constructor.
     * @property {module:model/FloatingIpCreate}
     */
    FloatingIpCreate,

    /**
     * The ForwardLinks model constructor.
     * @property {module:model/ForwardLinks}
     */
    ForwardLinks,

    /**
     * The ForwardingRule model constructor.
     * @property {module:model/ForwardingRule}
     */
    ForwardingRule,

    /**
     * The GarbageCollection model constructor.
     * @property {module:model/GarbageCollection}
     */
    GarbageCollection,

    /**
     * The HealthCheck model constructor.
     * @property {module:model/HealthCheck}
     */
    HealthCheck,

    /**
     * The Image model constructor.
     * @property {module:model/Image}
     */
    Image,

    /**
     * The ImageActionBase model constructor.
     * @property {module:model/ImageActionBase}
     */
    ImageActionBase,

    /**
     * The ImageActionTransfer model constructor.
     * @property {module:model/ImageActionTransfer}
     */
    ImageActionTransfer,

    /**
     * The ImageDescription model constructor.
     * @property {module:model/ImageDescription}
     */
    ImageDescription,

    /**
     * The ImageId model constructor.
     * @property {module:model/ImageId}
     */
    ImageId,

    /**
     * The ImageIdActionsBody model constructor.
     * @property {module:model/ImageIdActionsBody}
     */
    ImageIdActionsBody,

    /**
     * The ImageName model constructor.
     * @property {module:model/ImageName}
     */
    ImageName,

    /**
     * The ImageNewCustom model constructor.
     * @property {module:model/ImageNewCustom}
     */
    ImageNewCustom,

    /**
     * The ImageUpdate model constructor.
     * @property {module:model/ImageUpdate}
     */
    ImageUpdate,

    /**
     * The InlineResponse200 model constructor.
     * @property {module:model/InlineResponse200}
     */
    InlineResponse200,

    /**
     * The InlineResponse2001 model constructor.
     * @property {module:model/InlineResponse2001}
     */
    InlineResponse2001,

    /**
     * The InlineResponse20010 model constructor.
     * @property {module:model/InlineResponse20010}
     */
    InlineResponse20010,

    /**
     * The InlineResponse20011 model constructor.
     * @property {module:model/InlineResponse20011}
     */
    InlineResponse20011,

    /**
     * The InlineResponse20012 model constructor.
     * @property {module:model/InlineResponse20012}
     */
    InlineResponse20012,

    /**
     * The InlineResponse20013 model constructor.
     * @property {module:model/InlineResponse20013}
     */
    InlineResponse20013,

    /**
     * The InlineResponse20014 model constructor.
     * @property {module:model/InlineResponse20014}
     */
    InlineResponse20014,

    /**
     * The InlineResponse20015 model constructor.
     * @property {module:model/InlineResponse20015}
     */
    InlineResponse20015,

    /**
     * The InlineResponse20016 model constructor.
     * @property {module:model/InlineResponse20016}
     */
    InlineResponse20016,

    /**
     * The InlineResponse20017 model constructor.
     * @property {module:model/InlineResponse20017}
     */
    InlineResponse20017,

    /**
     * The InlineResponse20018 model constructor.
     * @property {module:model/InlineResponse20018}
     */
    InlineResponse20018,

    /**
     * The InlineResponse20019 model constructor.
     * @property {module:model/InlineResponse20019}
     */
    InlineResponse20019,

    /**
     * The InlineResponse2002 model constructor.
     * @property {module:model/InlineResponse2002}
     */
    InlineResponse2002,

    /**
     * The InlineResponse20020 model constructor.
     * @property {module:model/InlineResponse20020}
     */
    InlineResponse20020,

    /**
     * The InlineResponse20021 model constructor.
     * @property {module:model/InlineResponse20021}
     */
    InlineResponse20021,

    /**
     * The InlineResponse20022 model constructor.
     * @property {module:model/InlineResponse20022}
     */
    InlineResponse20022,

    /**
     * The InlineResponse20023 model constructor.
     * @property {module:model/InlineResponse20023}
     */
    InlineResponse20023,

    /**
     * The InlineResponse20024 model constructor.
     * @property {module:model/InlineResponse20024}
     */
    InlineResponse20024,

    /**
     * The InlineResponse20025 model constructor.
     * @property {module:model/InlineResponse20025}
     */
    InlineResponse20025,

    /**
     * The InlineResponse20026 model constructor.
     * @property {module:model/InlineResponse20026}
     */
    InlineResponse20026,

    /**
     * The InlineResponse20027 model constructor.
     * @property {module:model/InlineResponse20027}
     */
    InlineResponse20027,

    /**
     * The InlineResponse20028 model constructor.
     * @property {module:model/InlineResponse20028}
     */
    InlineResponse20028,

    /**
     * The InlineResponse20029 model constructor.
     * @property {module:model/InlineResponse20029}
     */
    InlineResponse20029,

    /**
     * The InlineResponse2003 model constructor.
     * @property {module:model/InlineResponse2003}
     */
    InlineResponse2003,

    /**
     * The InlineResponse20030 model constructor.
     * @property {module:model/InlineResponse20030}
     */
    InlineResponse20030,

    /**
     * The InlineResponse20031 model constructor.
     * @property {module:model/InlineResponse20031}
     */
    InlineResponse20031,

    /**
     * The InlineResponse20032 model constructor.
     * @property {module:model/InlineResponse20032}
     */
    InlineResponse20032,

    /**
     * The InlineResponse20033 model constructor.
     * @property {module:model/InlineResponse20033}
     */
    InlineResponse20033,

    /**
     * The InlineResponse20034 model constructor.
     * @property {module:model/InlineResponse20034}
     */
    InlineResponse20034,

    /**
     * The InlineResponse20035 model constructor.
     * @property {module:model/InlineResponse20035}
     */
    InlineResponse20035,

    /**
     * The InlineResponse20036 model constructor.
     * @property {module:model/InlineResponse20036}
     */
    InlineResponse20036,

    /**
     * The InlineResponse20037 model constructor.
     * @property {module:model/InlineResponse20037}
     */
    InlineResponse20037,

    /**
     * The InlineResponse20038 model constructor.
     * @property {module:model/InlineResponse20038}
     */
    InlineResponse20038,

    /**
     * The InlineResponse20039 model constructor.
     * @property {module:model/InlineResponse20039}
     */
    InlineResponse20039,

    /**
     * The InlineResponse2004 model constructor.
     * @property {module:model/InlineResponse2004}
     */
    InlineResponse2004,

    /**
     * The InlineResponse20040 model constructor.
     * @property {module:model/InlineResponse20040}
     */
    InlineResponse20040,

    /**
     * The InlineResponse20041 model constructor.
     * @property {module:model/InlineResponse20041}
     */
    InlineResponse20041,

    /**
     * The InlineResponse20042 model constructor.
     * @property {module:model/InlineResponse20042}
     */
    InlineResponse20042,

    /**
     * The InlineResponse20043 model constructor.
     * @property {module:model/InlineResponse20043}
     */
    InlineResponse20043,

    /**
     * The InlineResponse20044 model constructor.
     * @property {module:model/InlineResponse20044}
     */
    InlineResponse20044,

    /**
     * The InlineResponse20045 model constructor.
     * @property {module:model/InlineResponse20045}
     */
    InlineResponse20045,

    /**
     * The InlineResponse20046 model constructor.
     * @property {module:model/InlineResponse20046}
     */
    InlineResponse20046,

    /**
     * The InlineResponse20047 model constructor.
     * @property {module:model/InlineResponse20047}
     */
    InlineResponse20047,

    /**
     * The InlineResponse20048 model constructor.
     * @property {module:model/InlineResponse20048}
     */
    InlineResponse20048,

    /**
     * The InlineResponse20049 model constructor.
     * @property {module:model/InlineResponse20049}
     */
    InlineResponse20049,

    /**
     * The InlineResponse2005 model constructor.
     * @property {module:model/InlineResponse2005}
     */
    InlineResponse2005,

    /**
     * The InlineResponse20050 model constructor.
     * @property {module:model/InlineResponse20050}
     */
    InlineResponse20050,

    /**
     * The InlineResponse20051 model constructor.
     * @property {module:model/InlineResponse20051}
     */
    InlineResponse20051,

    /**
     * The InlineResponse20051Options model constructor.
     * @property {module:model/InlineResponse20051Options}
     */
    InlineResponse20051Options,

    /**
     * The InlineResponse20052 model constructor.
     * @property {module:model/InlineResponse20052}
     */
    InlineResponse20052,

    /**
     * The InlineResponse20053 model constructor.
     * @property {module:model/InlineResponse20053}
     */
    InlineResponse20053,

    /**
     * The InlineResponse20054 model constructor.
     * @property {module:model/InlineResponse20054}
     */
    InlineResponse20054,

    /**
     * The InlineResponse20055 model constructor.
     * @property {module:model/InlineResponse20055}
     */
    InlineResponse20055,

    /**
     * The InlineResponse20056 model constructor.
     * @property {module:model/InlineResponse20056}
     */
    InlineResponse20056,

    /**
     * The InlineResponse20057 model constructor.
     * @property {module:model/InlineResponse20057}
     */
    InlineResponse20057,

    /**
     * The InlineResponse20058 model constructor.
     * @property {module:model/InlineResponse20058}
     */
    InlineResponse20058,

    /**
     * The InlineResponse20059 model constructor.
     * @property {module:model/InlineResponse20059}
     */
    InlineResponse20059,

    /**
     * The InlineResponse2006 model constructor.
     * @property {module:model/InlineResponse2006}
     */
    InlineResponse2006,

    /**
     * The InlineResponse20060 model constructor.
     * @property {module:model/InlineResponse20060}
     */
    InlineResponse20060,

    /**
     * The InlineResponse20061 model constructor.
     * @property {module:model/InlineResponse20061}
     */
    InlineResponse20061,

    /**
     * The InlineResponse20062 model constructor.
     * @property {module:model/InlineResponse20062}
     */
    InlineResponse20062,

    /**
     * The InlineResponse2007 model constructor.
     * @property {module:model/InlineResponse2007}
     */
    InlineResponse2007,

    /**
     * The InlineResponse2008 model constructor.
     * @property {module:model/InlineResponse2008}
     */
    InlineResponse2008,

    /**
     * The InlineResponse2009 model constructor.
     * @property {module:model/InlineResponse2009}
     */
    InlineResponse2009,

    /**
     * The InlineResponse201 model constructor.
     * @property {module:model/InlineResponse201}
     */
    InlineResponse201,

    /**
     * The InlineResponse2011 model constructor.
     * @property {module:model/InlineResponse2011}
     */
    InlineResponse2011,

    /**
     * The InlineResponse20110 model constructor.
     * @property {module:model/InlineResponse20110}
     */
    InlineResponse20110,

    /**
     * The InlineResponse20111 model constructor.
     * @property {module:model/InlineResponse20111}
     */
    InlineResponse20111,

    /**
     * The InlineResponse20112 model constructor.
     * @property {module:model/InlineResponse20112}
     */
    InlineResponse20112,

    /**
     * The InlineResponse20113 model constructor.
     * @property {module:model/InlineResponse20113}
     */
    InlineResponse20113,

    /**
     * The InlineResponse20114 model constructor.
     * @property {module:model/InlineResponse20114}
     */
    InlineResponse20114,

    /**
     * The InlineResponse20115 model constructor.
     * @property {module:model/InlineResponse20115}
     */
    InlineResponse20115,

    /**
     * The InlineResponse20116 model constructor.
     * @property {module:model/InlineResponse20116}
     */
    InlineResponse20116,

    /**
     * The InlineResponse20117 model constructor.
     * @property {module:model/InlineResponse20117}
     */
    InlineResponse20117,

    /**
     * The InlineResponse2012 model constructor.
     * @property {module:model/InlineResponse2012}
     */
    InlineResponse2012,

    /**
     * The InlineResponse2013 model constructor.
     * @property {module:model/InlineResponse2013}
     */
    InlineResponse2013,

    /**
     * The InlineResponse2014 model constructor.
     * @property {module:model/InlineResponse2014}
     */
    InlineResponse2014,

    /**
     * The InlineResponse2015 model constructor.
     * @property {module:model/InlineResponse2015}
     */
    InlineResponse2015,

    /**
     * The InlineResponse2016 model constructor.
     * @property {module:model/InlineResponse2016}
     */
    InlineResponse2016,

    /**
     * The InlineResponse2017 model constructor.
     * @property {module:model/InlineResponse2017}
     */
    InlineResponse2017,

    /**
     * The InlineResponse2018 model constructor.
     * @property {module:model/InlineResponse2018}
     */
    InlineResponse2018,

    /**
     * The InlineResponse2019 model constructor.
     * @property {module:model/InlineResponse2019}
     */
    InlineResponse2019,

    /**
     * The InlineResponse202 model constructor.
     * @property {module:model/InlineResponse202}
     */
    InlineResponse202,

    /**
     * The InlineResponse2021 model constructor.
     * @property {module:model/InlineResponse2021}
     */
    InlineResponse2021,

    /**
     * The InlineResponse2022 model constructor.
     * @property {module:model/InlineResponse2022}
     */
    InlineResponse2022,

    /**
     * The InlineResponse2022Links model constructor.
     * @property {module:model/InlineResponse2022Links}
     */
    InlineResponse2022Links,

    /**
     * The InlineResponse2023 model constructor.
     * @property {module:model/InlineResponse2023}
     */
    InlineResponse2023,

    /**
     * The InlineResponse2024 model constructor.
     * @property {module:model/InlineResponse2024}
     */
    InlineResponse2024,

    /**
     * The InlineResponse2025 model constructor.
     * @property {module:model/InlineResponse2025}
     */
    InlineResponse2025,

    /**
     * The InlineResponse2026 model constructor.
     * @property {module:model/InlineResponse2026}
     */
    InlineResponse2026,

    /**
     * The InlineResponse2027 model constructor.
     * @property {module:model/InlineResponse2027}
     */
    InlineResponse2027,

    /**
     * The InlineResponse202Links model constructor.
     * @property {module:model/InlineResponse202Links}
     */
    InlineResponse202Links,

    /**
     * The InstanceSizeCpuType model constructor.
     * @property {module:model/InstanceSizeCpuType}
     */
    InstanceSizeCpuType,

    /**
     * The InvoiceItem model constructor.
     * @property {module:model/InvoiceItem}
     */
    InvoiceItem,

    /**
     * The InvoicePreview model constructor.
     * @property {module:model/InvoicePreview}
     */
    InvoicePreview,

    /**
     * The InvoiceSummary model constructor.
     * @property {module:model/InvoiceSummary}
     */
    InvoiceSummary,

    /**
     * The Kernel model constructor.
     * @property {module:model/Kernel}
     */
    Kernel,

    /**
     * The KeysSshKeyIdentifierBody model constructor.
     * @property {module:model/KeysSshKeyIdentifierBody}
     */
    KeysSshKeyIdentifierBody,

    /**
     * The KubernetesNodePool model constructor.
     * @property {module:model/KubernetesNodePool}
     */
    KubernetesNodePool,

    /**
     * The KubernetesNodePoolBase model constructor.
     * @property {module:model/KubernetesNodePoolBase}
     */
    KubernetesNodePoolBase,

    /**
     * The KubernetesNodePoolSize model constructor.
     * @property {module:model/KubernetesNodePoolSize}
     */
    KubernetesNodePoolSize,

    /**
     * The KubernetesNodePoolTaint model constructor.
     * @property {module:model/KubernetesNodePoolTaint}
     */
    KubernetesNodePoolTaint,

    /**
     * The KubernetesNodePoolUpdate model constructor.
     * @property {module:model/KubernetesNodePoolUpdate}
     */
    KubernetesNodePoolUpdate,

    /**
     * The KubernetesOptions model constructor.
     * @property {module:model/KubernetesOptions}
     */
    KubernetesOptions,

    /**
     * The KubernetesOptionsOptions model constructor.
     * @property {module:model/KubernetesOptionsOptions}
     */
    KubernetesOptionsOptions,

    /**
     * The KubernetesRegion model constructor.
     * @property {module:model/KubernetesRegion}
     */
    KubernetesRegion,

    /**
     * The KubernetesSize model constructor.
     * @property {module:model/KubernetesSize}
     */
    KubernetesSize,

    /**
     * The KubernetesVersion model constructor.
     * @property {module:model/KubernetesVersion}
     */
    KubernetesVersion,

    /**
     * The LbIdDropletsBody model constructor.
     * @property {module:model/LbIdDropletsBody}
     */
    LbIdDropletsBody,

    /**
     * The LbIdDropletsBody1 model constructor.
     * @property {module:model/LbIdDropletsBody1}
     */
    LbIdDropletsBody1,

    /**
     * The LbIdForwardingRulesBody model constructor.
     * @property {module:model/LbIdForwardingRulesBody}
     */
    LbIdForwardingRulesBody,

    /**
     * The LbIdForwardingRulesBody1 model constructor.
     * @property {module:model/LbIdForwardingRulesBody1}
     */
    LbIdForwardingRulesBody1,

    /**
     * The LinkToFirstPage model constructor.
     * @property {module:model/LinkToFirstPage}
     */
    LinkToFirstPage,

    /**
     * The LinkToLastPage model constructor.
     * @property {module:model/LinkToLastPage}
     */
    LinkToLastPage,

    /**
     * The LinkToNextPage model constructor.
     * @property {module:model/LinkToNextPage}
     */
    LinkToNextPage,

    /**
     * The LinkToPrevPage model constructor.
     * @property {module:model/LinkToPrevPage}
     */
    LinkToPrevPage,

    /**
     * The ListAlertPolicy model constructor.
     * @property {module:model/ListAlertPolicy}
     */
    ListAlertPolicy,

    /**
     * The LoadBalancer model constructor.
     * @property {module:model/LoadBalancer}
     */
    LoadBalancer,

    /**
     * The LoadBalancerBase model constructor.
     * @property {module:model/LoadBalancerBase}
     */
    LoadBalancerBase,

    /**
     * The LoadBalancerCreate model constructor.
     * @property {module:model/LoadBalancerCreate}
     */
    LoadBalancerCreate,

    /**
     * The MaintenancePolicy model constructor.
     * @property {module:model/MaintenancePolicy}
     */
    MaintenancePolicy,

    /**
     * The Meta model constructor.
     * @property {module:model/Meta}
     */
    Meta,

    /**
     * The MetaMeta model constructor.
     * @property {module:model/MetaMeta}
     */
    MetaMeta,

    /**
     * The MetaMeta1 model constructor.
     * @property {module:model/MetaMeta1}
     */
    MetaMeta1,

    /**
     * The Metrics model constructor.
     * @property {module:model/Metrics}
     */
    Metrics,

    /**
     * The MetricsData model constructor.
     * @property {module:model/MetricsData}
     */
    MetricsData,

    /**
     * The MetricsResult model constructor.
     * @property {module:model/MetricsResult}
     */
    MetricsResult,

    /**
     * The Model1Click model constructor.
     * @property {module:model/Model1Click}
     */
    Model1Click,

    /**
     * The Model1ClickCreate model constructor.
     * @property {module:model/Model1ClickCreate}
     */
    Model1ClickCreate,

    /**
     * The MysqlSettings model constructor.
     * @property {module:model/MysqlSettings}
     */
    MysqlSettings,

    /**
     * The NeighborIds model constructor.
     * @property {module:model/NeighborIds}
     */
    NeighborIds,

    /**
     * The NetworkV4 model constructor.
     * @property {module:model/NetworkV4}
     */
    NetworkV4,

    /**
     * The NetworkV6 model constructor.
     * @property {module:model/NetworkV6}
     */
    NetworkV6,

    /**
     * The NewVolumeExt4 model constructor.
     * @property {module:model/NewVolumeExt4}
     */
    NewVolumeExt4,

    /**
     * The NewVolumeXfs model constructor.
     * @property {module:model/NewVolumeXfs}
     */
    NewVolumeXfs,

    /**
     * The Node model constructor.
     * @property {module:model/Node}
     */
    Node,

    /**
     * The NodePoolIdRecycleBody model constructor.
     * @property {module:model/NodePoolIdRecycleBody}
     */
    NodePoolIdRecycleBody,

    /**
     * The NodeStatus model constructor.
     * @property {module:model/NodeStatus}
     */
    NodeStatus,

    /**
     * The OneOfdropletCreateImage model constructor.
     * @property {module:model/OneOfdropletCreateImage}
     */
    OneOfdropletCreateImage,

    /**
     * The OneOfdropletsActionsBody model constructor.
     * @property {module:model/OneOfdropletsActionsBody}
     */
    OneOfdropletsActionsBody,

    /**
     * The OneOffloatingIpCreate model constructor.
     * @property {module:model/OneOffloatingIpCreate}
     */
    OneOffloatingIpCreate,

    /**
     * The OneOfinlineResponse202 model constructor.
     * @property {module:model/OneOfinlineResponse202}
     */
    OneOfinlineResponse202,

    /**
     * The OneOfloadBalancerCreate model constructor.
     * @property {module:model/OneOfloadBalancerCreate}
     */
    OneOfloadBalancerCreate,

    /**
     * The OneOfv2CertificatesBody model constructor.
     * @property {module:model/OneOfv2CertificatesBody}
     */
    OneOfv2CertificatesBody,

    /**
     * The OneOfv2DropletsBody model constructor.
     * @property {module:model/OneOfv2DropletsBody}
     */
    OneOfv2DropletsBody,

    /**
     * The OnlineMigration model constructor.
     * @property {module:model/OnlineMigration}
     */
    OnlineMigration,

    /**
     * The PageLinks model constructor.
     * @property {module:model/PageLinks}
     */
    PageLinks,

    /**
     * The Pagination model constructor.
     * @property {module:model/Pagination}
     */
    Pagination,

    /**
     * The ProductChargeItem model constructor.
     * @property {module:model/ProductChargeItem}
     */
    ProductChargeItem,

    /**
     * The ProductUsageCharges model constructor.
     * @property {module:model/ProductUsageCharges}
     */
    ProductUsageCharges,

    /**
     * The Project model constructor.
     * @property {module:model/Project}
     */
    Project,

    /**
     * The ProjectAssignment model constructor.
     * @property {module:model/ProjectAssignment}
     */
    ProjectAssignment,

    /**
     * The ProjectBase model constructor.
     * @property {module:model/ProjectBase}
     */
    ProjectBase,

    /**
     * The ProjectsDefaultBody model constructor.
     * @property {module:model/ProjectsDefaultBody}
     */
    ProjectsDefaultBody,

    /**
     * The ProjectsProjectIdBody model constructor.
     * @property {module:model/ProjectsProjectIdBody}
     */
    ProjectsProjectIdBody,

    /**
     * The PurgeCache model constructor.
     * @property {module:model/PurgeCache}
     */
    PurgeCache,

    /**
     * The Region model constructor.
     * @property {module:model/Region}
     */
    Region,

    /**
     * The RegionSlug model constructor.
     * @property {module:model/RegionSlug}
     */
    RegionSlug,

    /**
     * The RegionsArray model constructor.
     * @property {module:model/RegionsArray}
     */
    RegionsArray,

    /**
     * The Registry model constructor.
     * @property {module:model/Registry}
     */
    Registry,

    /**
     * The RegistryCreate model constructor.
     * @property {module:model/RegistryCreate}
     */
    RegistryCreate,

    /**
     * The RegistrySubscriptionBody model constructor.
     * @property {module:model/RegistrySubscriptionBody}
     */
    RegistrySubscriptionBody,

    /**
     * The Repository model constructor.
     * @property {module:model/Repository}
     */
    Repository,

    /**
     * The RepositoryTag model constructor.
     * @property {module:model/RepositoryTag}
     */
    RepositoryTag,

    /**
     * The Resource model constructor.
     * @property {module:model/Resource}
     */
    Resource,

    /**
     * The ResourceLinks model constructor.
     * @property {module:model/ResourceLinks}
     */
    ResourceLinks,

    /**
     * The SimpleCharge model constructor.
     * @property {module:model/SimpleCharge}
     */
    SimpleCharge,

    /**
     * The Size model constructor.
     * @property {module:model/Size}
     */
    Size,

    /**
     * The SlackDetails model constructor.
     * @property {module:model/SlackDetails}
     */
    SlackDetails,

    /**
     * The Slug model constructor.
     * @property {module:model/Slug}
     */
    Slug,

    /**
     * The Snapshot model constructor.
     * @property {module:model/Snapshot}
     */
    Snapshot,

    /**
     * The SnapshotBase model constructor.
     * @property {module:model/SnapshotBase}
     */
    SnapshotBase,

    /**
     * The SnapshotId model constructor.
     * @property {module:model/SnapshotId}
     */
    SnapshotId,

    /**
     * The SourceDatabase model constructor.
     * @property {module:model/SourceDatabase}
     */
    SourceDatabase,

    /**
     * The SqlMode model constructor.
     * @property {module:model/SqlMode}
     */
    SqlMode,

    /**
     * The SshKey model constructor.
     * @property {module:model/SshKey}
     */
    SshKey,

    /**
     * The SshKeyFingerprint model constructor.
     * @property {module:model/SshKeyFingerprint}
     */
    SshKeyFingerprint,

    /**
     * The SshKeyId model constructor.
     * @property {module:model/SshKeyId}
     */
    SshKeyId,

    /**
     * The SshKeyIdentifier model constructor.
     * @property {module:model/SshKeyIdentifier}
     */
    SshKeyIdentifier,

    /**
     * The SshKeyName model constructor.
     * @property {module:model/SshKeyName}
     */
    SshKeyName,

    /**
     * The StickySessions model constructor.
     * @property {module:model/StickySessions}
     */
    StickySessions,

    /**
     * The Subscription model constructor.
     * @property {module:model/Subscription}
     */
    Subscription,

    /**
     * The SubscriptionTierBase model constructor.
     * @property {module:model/SubscriptionTierBase}
     */
    SubscriptionTierBase,

    /**
     * The SubscriptionTierExtended model constructor.
     * @property {module:model/SubscriptionTierExtended}
     */
    SubscriptionTierExtended,

    /**
     * The Tag model constructor.
     * @property {module:model/Tag}
     */
    Tag,

    /**
     * The TagMetadata model constructor.
     * @property {module:model/TagMetadata}
     */
    TagMetadata,

    /**
     * The TagResource model constructor.
     * @property {module:model/TagResource}
     */
    TagResource,

    /**
     * The TagResourceResources model constructor.
     * @property {module:model/TagResourceResources}
     */
    TagResourceResources,

    /**
     * The TagsArray model constructor.
     * @property {module:model/TagsArray}
     */
    TagsArray,

    /**
     * The UpdateEndpoint model constructor.
     * @property {module:model/UpdateEndpoint}
     */
    UpdateEndpoint,

    /**
     * The UpdateRegistry model constructor.
     * @property {module:model/UpdateRegistry}
     */
    UpdateRegistry,

    /**
     * The Urn model constructor.
     * @property {module:model/Urn}
     */
    Urn,

    /**
     * The User model constructor.
     * @property {module:model/User}
     */
    User,

    /**
     * The UserKubernetesClusterUser model constructor.
     * @property {module:model/UserKubernetesClusterUser}
     */
    UserKubernetesClusterUser,

    /**
     * The UsernameResetAuthBody model constructor.
     * @property {module:model/UsernameResetAuthBody}
     */
    UsernameResetAuthBody,

    /**
     * The V2CertificatesBody model constructor.
     * @property {module:model/V2CertificatesBody}
     */
    V2CertificatesBody,

    /**
     * The V2DatabasesBody model constructor.
     * @property {module:model/V2DatabasesBody}
     */
    V2DatabasesBody,

    /**
     * The V2DropletsBody model constructor.
     * @property {module:model/V2DropletsBody}
     */
    V2DropletsBody,

    /**
     * The V2FirewallsBody model constructor.
     * @property {module:model/V2FirewallsBody}
     */
    V2FirewallsBody,

    /**
     * The V2ProjectsBody model constructor.
     * @property {module:model/V2ProjectsBody}
     */
    V2ProjectsBody,

    /**
     * The V2VolumesBody model constructor.
     * @property {module:model/V2VolumesBody}
     */
    V2VolumesBody,

    /**
     * The V2VpcsBody model constructor.
     * @property {module:model/V2VpcsBody}
     */
    V2VpcsBody,

    /**
     * The ValidateRegistry model constructor.
     * @property {module:model/ValidateRegistry}
     */
    ValidateRegistry,

    /**
     * The VolumeAction model constructor.
     * @property {module:model/VolumeAction}
     */
    VolumeAction,

    /**
     * The VolumeActionDropletId model constructor.
     * @property {module:model/VolumeActionDropletId}
     */
    VolumeActionDropletId,

    /**
     * The VolumeActionPostAttach model constructor.
     * @property {module:model/VolumeActionPostAttach}
     */
    VolumeActionPostAttach,

    /**
     * The VolumeActionPostBase model constructor.
     * @property {module:model/VolumeActionPostBase}
     */
    VolumeActionPostBase,

    /**
     * The VolumeActionPostDetach model constructor.
     * @property {module:model/VolumeActionPostDetach}
     */
    VolumeActionPostDetach,

    /**
     * The VolumeActionPostResize model constructor.
     * @property {module:model/VolumeActionPostResize}
     */
    VolumeActionPostResize,

    /**
     * The VolumeBase model constructor.
     * @property {module:model/VolumeBase}
     */
    VolumeBase,

    /**
     * The VolumeFull model constructor.
     * @property {module:model/VolumeFull}
     */
    VolumeFull,

    /**
     * The VolumeIdActionsBody model constructor.
     * @property {module:model/VolumeIdActionsBody}
     */
    VolumeIdActionsBody,

    /**
     * The VolumeIdSnapshotsBody model constructor.
     * @property {module:model/VolumeIdSnapshotsBody}
     */
    VolumeIdSnapshotsBody,

    /**
     * The VolumeSnapshotId model constructor.
     * @property {module:model/VolumeSnapshotId}
     */
    VolumeSnapshotId,

    /**
     * The VolumeWriteFileSystemLabel model constructor.
     * @property {module:model/VolumeWriteFileSystemLabel}
     */
    VolumeWriteFileSystemLabel,

    /**
     * The VolumeWriteFileSystemType model constructor.
     * @property {module:model/VolumeWriteFileSystemType}
     */
    VolumeWriteFileSystemType,

    /**
     * The VolumesActionsBody model constructor.
     * @property {module:model/VolumesActionsBody}
     */
    VolumesActionsBody,

    /**
     * The Vpc model constructor.
     * @property {module:model/Vpc}
     */
    Vpc,

    /**
     * The VpcBase model constructor.
     * @property {module:model/VpcBase}
     */
    VpcBase,

    /**
     * The VpcCreate model constructor.
     * @property {module:model/VpcCreate}
     */
    VpcCreate,

    /**
     * The VpcDefault model constructor.
     * @property {module:model/VpcDefault}
     */
    VpcDefault,

    /**
     * The VpcMember model constructor.
     * @property {module:model/VpcMember}
     */
    VpcMember,

    /**
     * The VpcUpdatable model constructor.
     * @property {module:model/VpcUpdatable}
     */
    VpcUpdatable,

    /**
     * The VpcsVpcIdBody model constructor.
     * @property {module:model/VpcsVpcIdBody}
     */
    VpcsVpcIdBody,

    /**
     * The VpcsVpcIdBody1 model constructor.
     * @property {module:model/VpcsVpcIdBody1}
     */
    VpcsVpcIdBody1,

    /**
    * The AccountApi service constructor.
    * @property {module:api/AccountApi}
    */
    AccountApi,

    /**
    * The ActionsApi service constructor.
    * @property {module:api/ActionsApi}
    */
    ActionsApi,

    /**
    * The AppsApi service constructor.
    * @property {module:api/AppsApi}
    */
    AppsApi,

    /**
    * The BillingApi service constructor.
    * @property {module:api/BillingApi}
    */
    BillingApi,

    /**
    * The BlockStorageApi service constructor.
    * @property {module:api/BlockStorageApi}
    */
    BlockStorageApi,

    /**
    * The BlockStorageActionsApi service constructor.
    * @property {module:api/BlockStorageActionsApi}
    */
    BlockStorageActionsApi,

    /**
    * The CDNEndpointsApi service constructor.
    * @property {module:api/CDNEndpointsApi}
    */
    CDNEndpointsApi,

    /**
    * The CertificatesApi service constructor.
    * @property {module:api/CertificatesApi}
    */
    CertificatesApi,

    /**
    * The Class1ClickApplicationsApi service constructor.
    * @property {module:api/Class1ClickApplicationsApi}
    */
    Class1ClickApplicationsApi,

    /**
    * The ContainerRegistryApi service constructor.
    * @property {module:api/ContainerRegistryApi}
    */
    ContainerRegistryApi,

    /**
    * The DatabasesApi service constructor.
    * @property {module:api/DatabasesApi}
    */
    DatabasesApi,

    /**
    * The DomainRecordsApi service constructor.
    * @property {module:api/DomainRecordsApi}
    */
    DomainRecordsApi,

    /**
    * The DomainsApi service constructor.
    * @property {module:api/DomainsApi}
    */
    DomainsApi,

    /**
    * The DropletActionsApi service constructor.
    * @property {module:api/DropletActionsApi}
    */
    DropletActionsApi,

    /**
    * The DropletsApi service constructor.
    * @property {module:api/DropletsApi}
    */
    DropletsApi,

    /**
    * The FirewallsApi service constructor.
    * @property {module:api/FirewallsApi}
    */
    FirewallsApi,

    /**
    * The FloatingIPActionsApi service constructor.
    * @property {module:api/FloatingIPActionsApi}
    */
    FloatingIPActionsApi,

    /**
    * The FloatingIPsApi service constructor.
    * @property {module:api/FloatingIPsApi}
    */
    FloatingIPsApi,

    /**
    * The ImageActionsApi service constructor.
    * @property {module:api/ImageActionsApi}
    */
    ImageActionsApi,

    /**
    * The ImagesApi service constructor.
    * @property {module:api/ImagesApi}
    */
    ImagesApi,

    /**
    * The KubernetesApi service constructor.
    * @property {module:api/KubernetesApi}
    */
    KubernetesApi,

    /**
    * The LoadBalancersApi service constructor.
    * @property {module:api/LoadBalancersApi}
    */
    LoadBalancersApi,

    /**
    * The MonitoringApi service constructor.
    * @property {module:api/MonitoringApi}
    */
    MonitoringApi,

    /**
    * The ProjectResourcesApi service constructor.
    * @property {module:api/ProjectResourcesApi}
    */
    ProjectResourcesApi,

    /**
    * The ProjectsApi service constructor.
    * @property {module:api/ProjectsApi}
    */
    ProjectsApi,

    /**
    * The RegionsApi service constructor.
    * @property {module:api/RegionsApi}
    */
    RegionsApi,

    /**
    * The SSHKeysApi service constructor.
    * @property {module:api/SSHKeysApi}
    */
    SSHKeysApi,

    /**
    * The SizesApi service constructor.
    * @property {module:api/SizesApi}
    */
    SizesApi,

    /**
    * The SnapshotsApi service constructor.
    * @property {module:api/SnapshotsApi}
    */
    SnapshotsApi,

    /**
    * The TagsApi service constructor.
    * @property {module:api/TagsApi}
    */
    TagsApi,

    /**
    * The VPCsApi service constructor.
    * @property {module:api/VPCsApi}
    */
    VPCsApi
};
