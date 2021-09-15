/**
 * The MetaMeta model module.
 * @module model/MetaMeta
 * @version 2.0
 */
export class MetaMeta {
    /**
     * Constructs a <code>MetaMeta</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/MetaMeta} obj Optional instance to populate.
     * @return {module:model/MetaMeta} The populated <code>MetaMeta</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>MetaMeta</code>.
     * Information about the response itself.
     * @alias module:model/MetaMeta
     * @class
     * @param total {Number} Number of objects returned by the request.
     */
    constructor(total: number);
    total: number;
}
