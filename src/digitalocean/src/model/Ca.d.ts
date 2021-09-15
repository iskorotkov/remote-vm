/**
 * The Ca model module.
 * @module model/Ca
 * @version 2.0
 */
export class Ca {
    /**
     * Constructs a <code>Ca</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Ca} obj Optional instance to populate.
     * @return {module:model/Ca} The populated <code>Ca</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>Ca</code>.
     * @alias module:model/Ca
     * @class
     * @param certificate {String} Certificate used to secure database connections
     */
    constructor(certificate: string);
    certificate: string;
}
