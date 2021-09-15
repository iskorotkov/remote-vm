/**
 * The AppsDeploymentService model module.
 * @module model/AppsDeploymentService
 * @version 2.0
 */
export class AppsDeploymentService {
    /**
     * Constructs a <code>AppsDeploymentService</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppsDeploymentService} obj Optional instance to populate.
     * @return {module:model/AppsDeploymentService} The populated <code>AppsDeploymentService</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {String} name
     */
    name: any;
    /**
     * @member {String} sourceCommitHash
     */
    sourceCommitHash: any;
}
