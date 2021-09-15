/**
 * The AppsCreateDeploymentRequest model module.
 * @module model/AppsCreateDeploymentRequest
 * @version 2.0
 */
export class AppsCreateDeploymentRequest {
    /**
     * Constructs a <code>AppsCreateDeploymentRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppsCreateDeploymentRequest} obj Optional instance to populate.
     * @return {module:model/AppsCreateDeploymentRequest} The populated <code>AppsCreateDeploymentRequest</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {Boolean} forceBuild
     */
    forceBuild: any;
}
