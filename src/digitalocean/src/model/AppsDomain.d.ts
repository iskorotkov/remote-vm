/**
 * The AppsDomain model module.
 * @module model/AppsDomain
 * @version 2.0
 */
export class AppsDomain {
    /**
     * Constructs a <code>AppsDomain</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppsDomain} obj Optional instance to populate.
     * @return {module:model/AppsDomain} The populated <code>AppsDomain</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {String} id
     */
    id: any;
    /**
     * @member {module:model/AppsDomainPhase} phase
     */
    phase: any;
    /**
     * @member {module:model/AppsDomainProgress} progress
     */
    progress: any;
    /**
     * @member {module:model/AppDomainSpec} spec
     */
    spec: any;
}
