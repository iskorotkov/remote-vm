/**
 * The AppsDeploymentWorker model module.
 * @module model/AppsDeploymentWorker
 * @version 2.0
 */
export class AppsDeploymentWorker {
    /**
     * Constructs a <code>AppsDeploymentWorker</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppsDeploymentWorker} obj Optional instance to populate.
     * @return {module:model/AppsDeploymentWorker} The populated <code>AppsDeploymentWorker</code> instance.
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
