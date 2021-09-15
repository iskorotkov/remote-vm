/**
 * The AppsDeploymentProgress model module.
 * @module model/AppsDeploymentProgress
 * @version 2.0
 */
export class AppsDeploymentProgress {
    /**
     * Constructs a <code>AppsDeploymentProgress</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppsDeploymentProgress} obj Optional instance to populate.
     * @return {module:model/AppsDeploymentProgress} The populated <code>AppsDeploymentProgress</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {Number} errorSteps
     */
    errorSteps: any;
    /**
     * @member {Number} pendingSteps
     */
    pendingSteps: any;
    /**
     * @member {Number} runningSteps
     */
    runningSteps: any;
    /**
     * @member {Array.<module:model/AppsDeploymentProgressStep>} steps
     */
    steps: any;
    /**
     * @member {Number} successSteps
     */
    successSteps: any;
    /**
     * @member {Array.<module:model/AppsDeploymentProgressStep>} summarySteps
     */
    summarySteps: any;
    /**
     * @member {Number} totalSteps
     */
    totalSteps: any;
}
