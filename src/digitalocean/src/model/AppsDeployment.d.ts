/**
 * The AppsDeployment model module.
 * @module model/AppsDeployment
 * @version 2.0
 */
export class AppsDeployment {
    /**
     * Constructs a <code>AppsDeployment</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppsDeployment} obj Optional instance to populate.
     * @return {module:model/AppsDeployment} The populated <code>AppsDeployment</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {String} cause
     */
    cause: any;
    /**
     * @member {String} clonedFrom
     */
    clonedFrom: any;
    /**
     * @member {Date} createdAt
     */
    createdAt: any;
    /**
     * @member {String} id
     */
    id: any;
    /**
     * @member {Array.<module:model/AppsDeploymentJob>} jobs
     */
    jobs: any;
    /**
     * @member {module:model/AppsDeploymentPhase} phase
     */
    phase: any;
    /**
     * @member {Date} phaseLastUpdatedAt
     */
    phaseLastUpdatedAt: any;
    /**
     * @member {module:model/AppsDeploymentProgress} progress
     */
    progress: any;
    /**
     * @member {Array.<module:model/AppsDeploymentService>} services
     */
    services: any;
    /**
     * @member {module:model/AppSpec} spec
     */
    spec: any;
    /**
     * @member {Array.<module:model/AppsDeploymentStaticSite>} staticSites
     */
    staticSites: any;
    /**
     * @member {String} tierSlug
     */
    tierSlug: any;
    /**
     * @member {Date} updatedAt
     */
    updatedAt: any;
    /**
     * @member {Array.<module:model/AppsDeploymentWorker>} workers
     */
    workers: any;
}
