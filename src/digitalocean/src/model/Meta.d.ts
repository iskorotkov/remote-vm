/**
 * The Meta model module.
 * @module model/Meta
 * @version 2.0
 */
export class Meta {
    /**
     * Constructs a <code>Meta</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Meta} obj Optional instance to populate.
     * @return {module:model/Meta} The populated <code>Meta</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>Meta</code>.
     * @alias module:model/Meta
     * @class
     * @param meta {module:model/MetaMeta1}
     */
    constructor(meta: any);
    meta: any;
}
