/**
 * The ClusterlintResultsDiagnostics model module.
 * @module model/ClusterlintResultsDiagnostics
 * @version 2.0
 */
export class ClusterlintResultsDiagnostics {
    /**
     * Constructs a <code>ClusterlintResultsDiagnostics</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ClusterlintResultsDiagnostics} obj Optional instance to populate.
     * @return {module:model/ClusterlintResultsDiagnostics} The populated <code>ClusterlintResultsDiagnostics</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * The clusterlint check that resulted in the diagnostic.
     * @member {String} checkName
     */
    checkName: any;
    /**
     * Can be one of error, warning or suggestion.
     * @member {String} severity
     */
    severity: any;
    /**
     * Feedback about the object for users to fix.
     * @member {String} message
     */
    message: any;
    /**
     * @member {module:model/ClusterlintResultsObject} _object
     */
    _object: any;
}
