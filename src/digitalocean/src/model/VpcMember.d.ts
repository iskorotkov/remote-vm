/**
 * The VpcMember model module.
 * @module model/VpcMember
 * @version 2.0
 */
export class VpcMember {
    /**
     * Constructs a <code>VpcMember</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/VpcMember} obj Optional instance to populate.
     * @return {module:model/VpcMember} The populated <code>VpcMember</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * The name of the resource.
     * @member {String} name
     */
    name: any;
    /**
     * @member {module:model/Urn} urn
     */
    urn: any;
    /**
     * A time value given in ISO8601 combined date and time format that represents when the resource was created.
     * @member {String} createdAt
     */
    createdAt: any;
}
