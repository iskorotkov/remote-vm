/**
 * The AppSpec model module.
 * @module model/AppSpec
 * @version 2.0
 */
export class AppSpec {
    /**
     * Constructs a <code>AppSpec</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppSpec} obj Optional instance to populate.
     * @return {module:model/AppSpec} The populated <code>AppSpec</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>AppSpec</code>.
     * The desired configuration of an application.
     * @alias module:model/AppSpec
     * @class
     * @param name {String} The name of the app. Must be unique across all apps in the same account.
     */
    constructor(name: string);
    name: string;
    /**
     * The slug form of the geographical origin of the app. Default: `nearest available`
     * @member {module:model/AppSpec.RegionEnum} region
     */
    region: any;
    /**
     * A set of hostnames where the application will be available.
     * @member {Array.<module:model/AppDomainSpec>} domains
     */
    domains: any;
    /**
     * Workloads which expose publicy-accessible HTTP services.
     * @member {Array.<module:model/AppServiceSpec>} services
     */
    services: any;
    /**
     * Content which can be rendered to static web assets.
     * @member {Array.<module:model/AppStaticSiteSpec>} staticSites
     */
    staticSites: any;
    /**
     * Pre and post deployment workloads which do not expose publicly-accessible HTTP routes.
     * @member {Array.<module:model/AppJobSpec>} jobs
     */
    jobs: any;
    /**
     * Workloads which do not expose publicly-accessible HTTP services.
     * @member {Array.<module:model/AppWorkerSpec>} workers
     */
    workers: any;
    /**
     * Database instances which can provide persistence to workloads within the application.
     * @member {Array.<module:model/AppDatabaseSpec>} databases
     */
    databases: any;
}
export namespace AppSpec {
    namespace RegionEnum {
        const ams: string;
        const nyc: string;
        const fra: string;
    }
    /**
     * *
     */
    type RegionEnum = string;
}
