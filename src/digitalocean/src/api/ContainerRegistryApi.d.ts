/**
* ContainerRegistry service.
* @module api/ContainerRegistryApi
* @version 2.0
*/
export class ContainerRegistryApi {
    /**
    * Constructs a new ContainerRegistryApi.
    * @alias module:api/ContainerRegistryApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient?: any);
    apiClient: any;
    /**
     * Callback function to receive the result of the createRegistry operation.
     * @callback moduleapi/ContainerRegistryApi~createRegistryCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20046{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Create Container Registry
     * To create your container registry, send a POST request to &#x60;/v2/registry&#x60;.  The &#x60;name&#x60; becomes part of the URL for images stored in the registry. For example, if your registry is called &#x60;example&#x60;, an image in it will have the URL &#x60;registry.digitalocean.com/example/image:tag&#x60;.
     * @param {module:model/RegistryCreate} body
     * @param {module:api/ContainerRegistryApi~createRegistryCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    createRegistry(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the deleteRegistry operation.
     * @callback moduleapi/ContainerRegistryApi~deleteRegistryCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Delete Container Registry
     * To delete your container registry, destroying all container image data stored in it, send a DELETE request to &#x60;/v2/registry&#x60;.
     * @param {module:api/ContainerRegistryApi~deleteRegistryCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteRegistry(callback: any): any;
    /**
     * Callback function to receive the result of the deleteRepositoryManifest operation.
     * @callback moduleapi/ContainerRegistryApi~deleteRepositoryManifestCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Delete Container Registry Repository Manifest
     * To delete a container repository manifest by digest, send a DELETE request to &#x60;/v2/registry/$REGISTRY_NAME/repositories/$REPOSITORY_NAME/digests/$MANIFEST_DIGEST&#x60;.  Note that if your repository name contains &#x60;/&#x60; characters, it must be URL-encoded in the request URL. For example, to delete &#x60;registry.digitalocean.com/example/my/repo@sha256:abcd&#x60;, the path would be &#x60;/v2/registry/example/repositories/my%2Frepo/digests/sha256:abcd&#x60;.  A successful request will receive a 204 status code with no body in response. This indicates that the request was processed successfully.
     * @param {String} registryName The name of a container registry.
     * @param {String} repositoryName The name of a container registry repository. If the name contains &#x60;/&#x60; characters, they must be URL-encoded, e.g. &#x60;%2F&#x60;.
     * @param {String} manifestDigest The manifest digest of a container registry repository tag.
     * @param {module:api/ContainerRegistryApi~deleteRepositoryManifestCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteRepositoryManifest(registryName: string, repositoryName: string, manifestDigest: string, callback: any): any;
    /**
     * Callback function to receive the result of the deleteRepositoryTag operation.
     * @callback moduleapi/ContainerRegistryApi~deleteRepositoryTagCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Delete Container Registry Repository Tag
     * To delete a container repository tag, send a DELETE request to &#x60;/v2/registry/$REGISTRY_NAME/repositories/$REPOSITORY_NAME/tags/$TAG&#x60;.  Note that if your repository name contains &#x60;/&#x60; characters, it must be URL-encoded in the request URL. For example, to delete &#x60;registry.digitalocean.com/example/my/repo:mytag&#x60;, the path would be &#x60;/v2/registry/example/repositories/my%2Frepo/tags/mytag&#x60;.  A successful request will receive a 204 status code with no body in response. This indicates that the request was processed successfully.
     * @param {String} registryName The name of a container registry.
     * @param {String} repositoryName The name of a container registry repository. If the name contains &#x60;/&#x60; characters, they must be URL-encoded, e.g. &#x60;%2F&#x60;.
     * @param {String} repositoryTag The name of a container registry repository tag.
     * @param {module:api/ContainerRegistryApi~deleteRepositoryTagCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteRepositoryTag(registryName: string, repositoryName: string, repositoryTag: string, callback: any): any;
    /**
     * Callback function to receive the result of the getDockerCredentials operation.
     * @callback moduleapi/ContainerRegistryApi~getDockerCredentialsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/DockerCredentials{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Docker Credentials for Container Registry
     * In order to access your container registry with the Docker client or from a Kubernetes cluster, you will need to configure authentication. The necessary JSON configuration can be retrieved by sending a GET request to &#x60;/v2/registry/docker-credentials&#x60;.  The response will be in the format of a Docker &#x60;config.json&#x60; file. To use the config in your Kubernetes cluster, create a Secret with:      kubectl create secret generic docr \\       --from-file&#x3D;.dockerconfigjson&#x3D;config.json \\       --type&#x3D;kubernetes.io/dockerconfigjson  By default, the returned credentials have read-only access to your registry and cannot be used to push images. This is appropriate for most Kubernetes clusters. To retrieve read/write credentials, suitable for use with the Docker client or in a CI system, read_write may be provided as query parameter. For example: &#x60;/v2/registry/docker-credentials?read_write&#x3D;true&#x60;  By default, the returned credentials will not expire. To retrieve credentials with an expiry set, expiry_seconds may be provided as a query parameter. For example: &#x60;/v2/registry/docker-credentials?expiry_seconds&#x3D;3600&#x60; will return credentials that expire after one hour.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.expirySeconds The duration in seconds that the returned registry credentials will be valid. If not set or 0, the credentials will not expire. (default to <.>)
     * @param {Boolean} opts.readWrite By default, the registry credentials allow for read-only access. Set this query parameter to &#x60;true&#x60; to obtain read-write credentials. (default to <.>)
     * @param {module:api/ContainerRegistryApi~getDockerCredentialsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getDockerCredentials(opts: {
        expirySeconds: number;
        readWrite: boolean;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the getGarbageCollection operation.
     * @callback moduleapi/ContainerRegistryApi~getGarbageCollectionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20049{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Active Garbage Collection
     * To get information about the currently-active garbage collection for a registry, send a GET request to &#x60;/v2/registry/$REGISTRY_NAME/garbage-collection&#x60;.
     * @param {String} registryName The name of a container registry.
     * @param {module:api/ContainerRegistryApi~getGarbageCollectionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getGarbageCollection(registryName: string, callback: any): any;
    /**
     * Callback function to receive the result of the getRegistry operation.
     * @callback moduleapi/ContainerRegistryApi~getRegistryCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20046{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Container Registry Information
     * To get information about your container registry, send a GET request to &#x60;/v2/registry&#x60;.
     * @param {module:api/ContainerRegistryApi~getRegistryCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getRegistry(callback: any): any;
    /**
     * Callback function to receive the result of the getRegistryOptions operation.
     * @callback moduleapi/ContainerRegistryApi~getRegistryOptionsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20051{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List Available Subscription Tiers
     * There are multiple subscription tiers available for container registry. Each tier allows a different number of image repositories to be created in your registry, and has a different amount of storage and transfer included. To list the available subscription tiers, send a GET request to &#x60;/v2/registry/options&#x60;.
     * @param {module:api/ContainerRegistryApi~getRegistryOptionsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getRegistryOptions(callback: any): any;
    /**
     * Callback function to receive the result of the getRegistrySubscription operation.
     * @callback moduleapi/ContainerRegistryApi~getRegistrySubscriptionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Subscription{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Subscription Information
     * A subscription is automatically created when you configure your container registry. To get information about your subscription, send a GET request to &#x60;/v2/registry/subscription&#x60;.
     * @param {module:api/ContainerRegistryApi~getRegistrySubscriptionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getRegistrySubscription(callback: any): any;
    /**
     * Callback function to receive the result of the listGarbageCollections operation.
     * @callback moduleapi/ContainerRegistryApi~listGarbageCollectionsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20050{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List Garbage Collections
     * To get information about past garbage collections for a registry, send a GET request to &#x60;/v2/registry/$REGISTRY_NAME/garbage-collections&#x60;.
     * @param {String} registryName The name of a container registry.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.perPage Number of items returned per page (default to <.>)
     * @param {Number} opts.page Which &#x27;page&#x27; of paginated results to return. (default to <.>)
     * @param {module:api/ContainerRegistryApi~listGarbageCollectionsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listGarbageCollections(registryName: string, opts: {
        perPage: number;
        page: number;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the listRegistryRepositories operation.
     * @callback moduleapi/ContainerRegistryApi~listRegistryRepositoriesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20047{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List All Container Registry Repositories
     * To list all repositories in your container registry, send a GET request to &#x60;/v2/registry/$REGISTRY_NAME/repositories&#x60;.
     * @param {String} registryName The name of a container registry.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.perPage Number of items returned per page (default to <.>)
     * @param {Number} opts.page Which &#x27;page&#x27; of paginated results to return. (default to <.>)
     * @param {module:api/ContainerRegistryApi~listRegistryRepositoriesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listRegistryRepositories(registryName: string, opts: {
        perPage: number;
        page: number;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the listRepositoryTags operation.
     * @callback moduleapi/ContainerRegistryApi~listRepositoryTagsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20048{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List All Container Registry Repository Tags
     * To list all tags in your container registry repository, send a GET request to &#x60;/v2/registry/$REGISTRY_NAME/repositories/$REPOSITORY_NAME/tags&#x60;.  Note that if your repository name contains &#x60;/&#x60; characters, it must be URL-encoded in the request URL. For example, to list tags for &#x60;registry.digitalocean.com/example/my/repo&#x60;, the path would be &#x60;/v2/registry/example/repositories/my%2Frepo/tags&#x60;.
     * @param {String} registryName The name of a container registry.
     * @param {String} repositoryName The name of a container registry repository. If the name contains &#x60;/&#x60; characters, they must be URL-encoded, e.g. &#x60;%2F&#x60;.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.perPage Number of items returned per page (default to <.>)
     * @param {Number} opts.page Which &#x27;page&#x27; of paginated results to return. (default to <.>)
     * @param {module:api/ContainerRegistryApi~listRepositoryTagsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listRepositoryTags(registryName: string, repositoryName: string, opts: {
        perPage: number;
        page: number;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the postRegistrySubscription operation.
     * @callback moduleapi/ContainerRegistryApi~postRegistrySubscriptionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Subscription{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Update Subscription Tier
     * After creating your registry, you can switch to a different subscription tier to better suit your needs. To do this, send a POST request to &#x60;/v2/registry/subscription&#x60;.
     * @param {Object} opts Optional parameters
     * @param {module:model/RegistrySubscriptionBody} opts.body
     * @param {module:api/ContainerRegistryApi~postRegistrySubscriptionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    postRegistrySubscription(opts: {
        body: any;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the runGarbageCollection operation.
     * @callback moduleapi/ContainerRegistryApi~runGarbageCollectionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20049{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Start Garbage Collection
     * Garbage collection enables users to clear out unreferenced blobs (layer &amp; manifest data) after deleting one or more manifests from a repository. If there are no unreferenced blobs resulting from the deletion of one or more manifests, garbage collection is effectively a noop. [See here for more information](https://www.digitalocean.com/docs/container-registry/how-to/clean-up-container-registry/) about how and why you should clean up your container registry periodically.  To request a garbage collection run on your registry, send a POST request to &#x60;/v2/registry/$REGISTRY_NAME/garbage-collection&#x60;. This will initiate the following sequence of events on your registry.  * Set the registry to read-only mode, meaning no further write-scoped   JWTs will be issued to registry clients. Existing write-scoped JWTs will   continue to work until they expire which can take up to 15 minutes. * Wait until all existing write-scoped JWTs have expired. * Scan all registry manifests to determine which blobs are unreferenced. * Delete all unreferenced blobs from the registry. * Record the number of blobs deleted and bytes freed, mark the garbage   collection status as &#x60;success&#x60;. * Remove the read-only mode restriction from the registry, meaning write-scoped   JWTs will once again be issued to registry clients.
     * @param {String} registryName The name of a container registry.
     * @param {module:api/ContainerRegistryApi~runGarbageCollectionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    runGarbageCollection(registryName: string, callback: any): any;
    /**
     * Callback function to receive the result of the updateGarbageCollection operation.
     * @callback moduleapi/ContainerRegistryApi~updateGarbageCollectionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20049{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Update Garbage Collection
     * To cancel the currently-active garbage collection for a registry, send a PUT request to &#x60;/v2/registry/$REGISTRY_NAME/garbage-collection/$GC_UUID&#x60; and specify one or more of the attributes below.
     * @param {module:model/UpdateRegistry} body
     * @param {String} registryName The name of a container registry.
     * @param {String} garbageCollectionUuid The UUID of a garbage collection run.
     * @param {module:api/ContainerRegistryApi~updateGarbageCollectionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    updateGarbageCollection(body: any, registryName: string, garbageCollectionUuid: string, callback: any): any;
    /**
     * Callback function to receive the result of the validateRegistryName operation.
     * @callback moduleapi/ContainerRegistryApi~validateRegistryNameCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Validate a Container Registry Name
     * To validate that a container registry name is available for use, send a POST request to &#x60;/v2/registry/validate-name&#x60;.  If the name is both formatted correctly and available, the response code will be 204 and contain no body. If the name is already in use, the response will be a 409 Conflict.
     * @param {module:model/ValidateRegistry} body
     * @param {module:api/ContainerRegistryApi~validateRegistryNameCallback} callback The callback function, accepting three arguments: error, data, response
     */
    validateRegistryName(body: any, callback: any): any;
}
/**
 * /ContainerRegistryApi~createRegistryCallback
 */
export type moduleapi = (error: string, data: any, response: string) => any;
