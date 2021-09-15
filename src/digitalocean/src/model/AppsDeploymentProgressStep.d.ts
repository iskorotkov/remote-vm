/**
 * The AppsDeploymentProgressStep model module.
 * @module model/AppsDeploymentProgressStep
 * @version 2.0
 */
export class AppsDeploymentProgressStep {
    /**
     * Constructs a <code>AppsDeploymentProgressStep</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppsDeploymentProgressStep} obj Optional instance to populate.
     * @return {module:model/AppsDeploymentProgressStep} The populated <code>AppsDeploymentProgressStep</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {String} componentName
     */
    componentName: any;
    /**
     * @member {Date} endedAt
     */
    endedAt: any;
    /**
     * The base of a human-readable description of the step intended to be combined with the component name for presentation. For example:  `message_base` = \"Building service\" `component_name` = \"api\"
     * @member {String} messageBase
     */
    messageBase: any;
    /**
     * @member {String} name
     */
    name: any;
    /**
     * @member {module:model/AppsDeploymentProgressStepReason} reason
     */
    reason: any;
    /**
     * @member {Date} startedAt
     */
    startedAt: any;
    /**
     * @member {module:model/AppsDeploymentProgressStepStatus} status
     */
    status: any;
    /**
     * @member {Array.<Object>} steps
     */
    steps: any;
}
