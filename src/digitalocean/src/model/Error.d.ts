/**
 * The Error model module.
 * @module model/Error
 * @version 2.0
 */
export class Error {
    /**
     * Constructs a <code>Error</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Error} obj Optional instance to populate.
     * @return {module:model/Error} The populated <code>Error</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>Error</code>.
     * @alias module:model/Error
     * @class
     * @param id {String} A short identifier corresponding to the HTTP status code returned. For  example, the ID for a response returning a 404 status code would be \"not_found.\"
     * @param message {String} A message providing additional information about the error, including  details to help resolve it when possible.
     */
    constructor(id: string, message: string);
    id: string;
    message: string;
    /**
     * Optionally, some endpoints may include a request ID that should be  provided when reporting bugs or opening support tickets to help  identify the issue.
     * @member {String} requestId
     */
    requestId: any;
}
