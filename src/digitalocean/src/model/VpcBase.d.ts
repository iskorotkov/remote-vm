/**
 * The VpcBase model module.
 * @module model/VpcBase
 * @version 2.0
 */
export class VpcBase {
    /**
     * Constructs a <code>VpcBase</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/VpcBase} obj Optional instance to populate.
     * @return {module:model/VpcBase} The populated <code>VpcBase</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * A unique ID that can be used to identify and reference the VPC.
     * @member {String} id
     */
    id: any;
    /**
     * @member {module:model/Urn} urn
     */
    urn: any;
    /**
     * A time value given in ISO8601 combined date and time format.
     * @member {Date} createdAt
     */
    createdAt: any;
}
