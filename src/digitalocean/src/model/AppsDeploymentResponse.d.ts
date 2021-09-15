/**
 * The AppsDeploymentResponse model module.
 * @module model/AppsDeploymentResponse
 * @version 2.0
 */
export class AppsDeploymentResponse {
    /**
     * Constructs a <code>AppsDeploymentResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppsDeploymentResponse} obj Optional instance to populate.
     * @return {module:model/AppsDeploymentResponse} The populated <code>AppsDeploymentResponse</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {module:model/AppsDeployment} deployment
     */
    deployment: any;
}
