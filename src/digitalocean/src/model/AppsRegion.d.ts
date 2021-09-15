/**
 * The AppsRegion model module.
 * @module model/AppsRegion
 * @version 2.0
 */
export class AppsRegion {
    /**
     * Constructs a <code>AppsRegion</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppsRegion} obj Optional instance to populate.
     * @return {module:model/AppsRegion} The populated <code>AppsRegion</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {String} continent
     */
    continent: any;
    /**
     * @member {Array.<String>} dataCenters
     */
    dataCenters: any;
    /**
     * Whether or not the region is presented as the default.
     * @member {Boolean} _default
     */
    _default: any;
    /**
     * @member {Boolean} disabled
     */
    disabled: any;
    /**
     * @member {String} flag
     */
    flag: any;
    /**
     * @member {String} label
     */
    label: any;
    /**
     * @member {String} reason
     */
    reason: any;
    /**
     * @member {String} slug
     */
    slug: any;
}
