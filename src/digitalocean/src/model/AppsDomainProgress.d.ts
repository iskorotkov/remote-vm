/**
 * The AppsDomainProgress model module.
 * @module model/AppsDomainProgress
 * @version 2.0
 */
export class AppsDomainProgress {
    /**
     * Constructs a <code>AppsDomainProgress</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppsDomainProgress} obj Optional instance to populate.
     * @return {module:model/AppsDomainProgress} The populated <code>AppsDomainProgress</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {Array.<Object>} steps
     */
    steps: any;
}
