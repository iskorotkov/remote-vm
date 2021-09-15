/**
* DropletActions service.
* @module api/DropletActionsApi
* @version 2.0
*/
export class DropletActionsApi {
    /**
    * Constructs a new DropletActionsApi.
    * @alias module:api/DropletActionsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient?: any);
    apiClient: any;
    /**
     * Callback function to receive the result of the getDropletAction operation.
     * @callback moduleapi/DropletActionsApi~getDropletActionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2005{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve a Droplet Action
     * To retrieve a Droplet action, send a GET request to &#x60;/v2/droplets/$DROPLET_ID/actions/$ACTION_ID&#x60;.  The response will be a JSON object with a key called &#x60;action&#x60;. The value will be a Droplet action object.
     * @param {Number} dropletId A unique identifier for a Droplet instance.
     * @param {Number} actionId A unique numeric ID that can be used to identify and reference an action.
     * @param {module:api/DropletActionsApi~getDropletActionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getDropletAction(dropletId: number, actionId: number, callback: any): any;
    /**
     * Callback function to receive the result of the listDropletActions operation.
     * @callback moduleapi/DropletActionsApi~listDropletActionsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2004{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List Actions for a Droplet
     * To retrieve a list of all actions that have been executed for a Droplet, send a GET request to &#x60;/v2/droplets/$DROPLET_ID/actions&#x60;.  The results will be returned as a JSON object with an &#x60;actions&#x60; key. This will be set to an array filled with &#x60;action&#x60; objects containing the standard &#x60;action&#x60; attributes.
     * @param {Number} dropletId A unique identifier for a Droplet instance.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.perPage Number of items returned per page (default to <.>)
     * @param {Number} opts.page Which &#x27;page&#x27; of paginated results to return. (default to <.>)
     * @param {module:api/DropletActionsApi~listDropletActionsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listDropletActions(dropletId: number, opts: {
        perPage: number;
        page: number;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the postDropletAction operation.
     * @callback moduleapi/DropletActionsApi~postDropletActionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2005{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Initiate a Droplet Action
     * To initiate an action on a Droplet send a POST request to &#x60;/v2/droplets/$DROPLET_ID/actions&#x60;. In the JSON body to the request, set the &#x60;type&#x60; attribute to on of the supported action types:  | Action                                   | Details | | ---------------------------------------- | ----------- | | &lt;nobr&gt;&#x60;enable_backups&#x60;&lt;/nobr&gt;            | Enables backups for a Droplet | | &lt;nobr&gt;&#x60;disable_backups&#x60;&lt;/nobr&gt;           | Disables backups for a Droplet | | &lt;nobr&gt;&#x60;reboot&#x60;&lt;/nobr&gt;                    | Reboots a Droplet. A &#x60;reboot&#x60; action is an attempt to reboot the Droplet in a graceful way, similar to using the &#x60;reboot&#x60; command from the console. | | &lt;nobr&gt;&#x60;power_cycle&#x60;&lt;/nobr&gt;               | Power cycles a Droplet. A &#x60;powercycle&#x60; action is similar to pushing the reset button on a physical machine, it&#x27;s similar to booting from scratch. | | &lt;nobr&gt;&#x60;shutdown&#x60;&lt;/nobr&gt;                  | Shutsdown a Droplet. A shutdown action is an attempt to shutdown the Droplet in a graceful way, similar to using the &#x60;shutdown&#x60; command from the console. Since a &#x60;shutdown&#x60; command can fail, this action guarantees that the command is issued, not that it succeeds. The preferred way to turn off a Droplet is to attempt a shutdown, with a reasonable timeout, followed by a &#x60;power_off&#x60; action to ensure the Droplet is off. | | &lt;nobr&gt;&#x60;power_off&#x60;&lt;/nobr&gt;                 | Powers off a Droplet. A &#x60;power_off&#x60; event is a hard shutdown and should only be used if the &#x60;shutdown&#x60; action is not successful. It is similar to cutting the power on a server and could lead to complications. | | &lt;nobr&gt;&#x60;power_on&#x60;&lt;/nobr&gt;                  | Powers on a Droplet. | | &lt;nobr&gt;&#x60;restore&#x60;&lt;/nobr&gt;                   | Restore a Droplet using a backup image. The image ID that is passed in must be a backup of the current Droplet instance. The operation will leave any embedded SSH keys intact. | | &lt;nobr&gt;&#x60;password_reset&#x60;&lt;/nobr&gt;            | Resets the root password for a Droplet. A new password will be provided via email. It must be changed after first use. | | &lt;nobr&gt;&#x60;resize&#x60;&lt;/nobr&gt;                    | Resizes a Droplet. Set the &#x60;size&#x60; attribute to a size slug. If a permanent resize with disk changes included is desired, set the &#x60;disk&#x60; attribute to &#x60;true&#x60;. | | &lt;nobr&gt;&#x60;rebuild&#x60;&lt;/nobr&gt;                   | Rebuilds a Droplet from a new base image. Set the &#x60;image&#x60; attribute to an image ID or slug. | | &lt;nobr&gt;&#x60;rename&#x60;&lt;/nobr&gt;                    | Renames a Droplet. | | &lt;nobr&gt;&#x60;change_kernel&#x60;&lt;/nobr&gt;             | Changes a Droplet&#x27;s kernel. Only applies to Droplets with externally managed kernels. All Droplets created after March 2017 use internal kernels by default. | | &lt;nobr&gt;&#x60;enable_ipv6&#x60;&lt;/nobr&gt;               | Enables IPv6 for a Droplet. | | &lt;nobr&gt;&#x60;snapshot&#x60;&lt;/nobr&gt;                  | Takes a snapshot of a Droplet. |
     * @param {Number} dropletId A unique identifier for a Droplet instance.
     * @param {Object} opts Optional parameters
     * @param {module:model/DropletIdActionsBody} opts.body The &#x60;type&#x60; attribute set in the request body will specify the  action that
will be taken on the Droplet. Some actions will require additional
attributes to be set as well.

     * @param {module:api/DropletActionsApi~postDropletActionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    postDropletAction(dropletId: number, opts: {
        body: any;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the postDropletActionByTag operation.
     * @callback moduleapi/DropletActionsApi~postDropletActionByTagCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20110{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Acting on Tagged Droplets
     * Some actions can be performed in bulk on tagged Droplets. The actions can be initiated by sending a POST to &#x60;/v2/droplets/actions?tag_name&#x3D;$TAG_NAME&#x60; with the action arguments.  Only a sub-set of action types are supported:  - &#x60;power_cycle&#x60; - &#x60;power_on&#x60; - &#x60;power_off&#x60; - &#x60;shutdown&#x60; - &#x60;enable_ipv6&#x60; - &#x60;enable_backups&#x60; - &#x60;disable_backups&#x60; - &#x60;snapshot&#x60;
     * @param {Object} opts Optional parameters
     * @param {module:model/DropletsActionsBody} opts.body The &#x60;type&#x60; attribute set in the request body will specify the  action that
will be taken on the Droplet. Some actions will require additional
attributes to be set as well.

     * @param {String} opts.tagName Used to filter Droplets by a specific tag.
     * @param {module:api/DropletActionsApi~postDropletActionByTagCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    postDropletActionByTag(opts: {
        body: any;
        tagName: string;
    }, callback: any): any;
}
/**
 * /DropletActionsApi~getDropletActionCallback
 */
export type moduleapi = (error: string, data: any, response: string) => any;
