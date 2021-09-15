/**
 * The MetaMeta1 model module.
 * @module model/MetaMeta1
 * @version 2.0
 */
export class MetaMeta1 {
    /**
     * Constructs a <code>MetaMeta1</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/MetaMeta1} obj Optional instance to populate.
     * @return {module:model/MetaMeta1} The populated <code>MetaMeta1</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>MetaMeta1</code>.
     * Information about the response itself.
     * @alias module:model/MetaMeta1
     * @class
     * @param total {Number} Number of objects returned by the request.
     */
    constructor(total: number);
    total: number;
}
