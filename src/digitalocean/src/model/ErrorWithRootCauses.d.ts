/**
 * The ErrorWithRootCauses model module.
 * @module model/ErrorWithRootCauses
 * @version 2.0
 */
export class ErrorWithRootCauses {
    /**
     * Constructs a <code>ErrorWithRootCauses</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ErrorWithRootCauses} obj Optional instance to populate.
     * @return {module:model/ErrorWithRootCauses} The populated <code>ErrorWithRootCauses</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>ErrorWithRootCauses</code>.
     * @alias module:model/ErrorWithRootCauses
     * @class
     * @param error {String} A message providing information about the error.
     * @param rootCauses {Array.<String>} A list of underlying causes for the error, including details to help  resolve it when possible.
     */
    constructor(error: string, rootCauses: Array<string>);
    error: string;
    rootCauses: string[];
    /**
     * A list of legacy error messages.
     * @member {Array.<String>} messages
     */
    messages: any;
}
