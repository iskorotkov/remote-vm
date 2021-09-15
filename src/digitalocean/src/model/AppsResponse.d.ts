/**
 * The AppsResponse model module.
 * @module model/AppsResponse
 * @version 2.0
 */
export class AppsResponse {
    /**
     * Constructs a <code>AppsResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppsResponse} obj Optional instance to populate.
     * @return {module:model/AppsResponse} The populated <code>AppsResponse</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {Array.<module:model/App>} apps
     */
    apps: any;
    /**
     * @member {module:model/PageLinks} links
     */
    links: any;
    /**
     * @member {module:model/MetaMeta} meta
     */
    meta: any;
}
