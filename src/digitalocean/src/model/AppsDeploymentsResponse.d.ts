/**
 * The AppsDeploymentsResponse model module.
 * @module model/AppsDeploymentsResponse
 * @version 2.0
 */
export class AppsDeploymentsResponse {
    /**
     * Constructs a <code>AppsDeploymentsResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppsDeploymentsResponse} obj Optional instance to populate.
     * @return {module:model/AppsDeploymentsResponse} The populated <code>AppsDeploymentsResponse</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {Array.<module:model/AppsDeployment>} deployments
     */
    deployments: any;
    /**
     * @member {module:model/PageLinks} links
     */
    links: any;
    /**
     * @member {module:model/MetaMeta} meta
     */
    meta: any;
}
