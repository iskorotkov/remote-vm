/**
 * The AppsInstanceSize model module.
 * @module model/AppsInstanceSize
 * @version 2.0
 */
export class AppsInstanceSize {
    /**
     * Constructs a <code>AppsInstanceSize</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppsInstanceSize} obj Optional instance to populate.
     * @return {module:model/AppsInstanceSize} The populated <code>AppsInstanceSize</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {module:model/InstanceSizeCpuType} cpuType
     */
    cpuType: any;
    /**
     * @member {String} cpus
     */
    cpus: any;
    /**
     * @member {String} memoryBytes
     */
    memoryBytes: any;
    /**
     * @member {String} name
     */
    name: any;
    /**
     * @member {String} slug
     */
    slug: any;
    /**
     * @member {String} tierDowngradeTo
     */
    tierDowngradeTo: any;
    /**
     * @member {String} tierSlug
     */
    tierSlug: any;
    /**
     * @member {String} tierUpgradeTo
     */
    tierUpgradeTo: any;
    /**
     * @member {String} usdPerMonth
     */
    usdPerMonth: any;
    /**
     * @member {String} usdPerSecond
     */
    usdPerSecond: any;
}
