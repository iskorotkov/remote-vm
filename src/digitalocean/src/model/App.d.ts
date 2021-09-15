/**
 * The App model module.
 * @module model/App
 * @version 2.0
 */
export class App {
    /**
     * Constructs a <code>App</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/App} obj Optional instance to populate.
     * @return {module:model/App} The populated <code>App</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>App</code>.
     * An application&#x27;s configuration and status.
     * @alias module:model/App
     * @class
     * @param spec {module:model/AppSpec}
     */
    constructor(spec: any);
    spec: any;
    /**
     * @member {module:model/AppsDeployment} activeDeployment
     */
    activeDeployment: any;
    /**
     * @member {Date} createdAt
     */
    createdAt: any;
    /**
     * @member {String} defaultIngress
     */
    defaultIngress: any;
    /**
     * @member {Array.<module:model/AppsDomain>} domains
     */
    domains: any;
    /**
     * @member {String} id
     */
    id: any;
    /**
     * @member {module:model/AppsDeployment} inProgressDeployment
     */
    inProgressDeployment: any;
    /**
     * @member {Date} lastDeploymentCreatedAt
     */
    lastDeploymentCreatedAt: any;
    /**
     * @member {String} liveDomain
     */
    liveDomain: any;
    /**
     * @member {String} liveUrl
     */
    liveUrl: any;
    /**
     * @member {String} liveUrlBase
     */
    liveUrlBase: any;
    /**
     * @member {String} ownerUuid
     */
    ownerUuid: any;
    /**
     * @member {module:model/AppsRegion} region
     */
    region: any;
    /**
     * @member {String} tierSlug
     */
    tierSlug: any;
    /**
     * @member {Date} updatedAt
     */
    updatedAt: any;
}
