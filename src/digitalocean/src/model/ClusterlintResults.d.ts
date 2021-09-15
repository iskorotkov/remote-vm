/**
 * The ClusterlintResults model module.
 * @module model/ClusterlintResults
 * @version 2.0
 */
export class ClusterlintResults {
    /**
     * Constructs a <code>ClusterlintResults</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ClusterlintResults} obj Optional instance to populate.
     * @return {module:model/ClusterlintResults} The populated <code>ClusterlintResults</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Id of the clusterlint run that can be used later to fetch the diagnostics.
     * @member {String} runId
     */
    runId: any;
    /**
     * A time value given in ISO8601 combined date and time format that represents when the schedule clusterlint run request was made.
     * @member {Date} requestedAt
     */
    requestedAt: any;
    /**
     * A time value given in ISO8601 combined date and time format that represents when the schedule clusterlint run request was completed.
     * @member {Date} completedAt
     */
    completedAt: any;
    /**
     * An array of diagnostics reporting potential problems for the given cluster.
     * @member {Array.<module:model/ClusterlintResultsDiagnostics>} diagnostics
     */
    diagnostics: any;
}
