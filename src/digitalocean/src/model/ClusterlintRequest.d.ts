/**
 * The ClusterlintRequest model module.
 * @module model/ClusterlintRequest
 * @version 2.0
 */
export class ClusterlintRequest {
    /**
     * Constructs a <code>ClusterlintRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ClusterlintRequest} obj Optional instance to populate.
     * @return {module:model/ClusterlintRequest} The populated <code>ClusterlintRequest</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * An array of check groups that will be run when clusterlint executes checks.
     * @member {Array.<String>} includeGroups
     */
    includeGroups: any;
    /**
     * An array of checks that will be run when clusterlint executes checks.
     * @member {Array.<String>} includeChecks
     */
    includeChecks: any;
    /**
     * An array of check groups that will be omitted when clusterlint executes checks.
     * @member {Array.<String>} excludeGroups
     */
    excludeGroups: any;
    /**
     * An array of checks that will be run when clusterlint executes checks.
     * @member {Array.<String>} excludeChecks
     */
    excludeChecks: any;
}
