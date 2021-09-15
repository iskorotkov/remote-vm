/**
 * The VpcUpdatable model module.
 * @module model/VpcUpdatable
 * @version 2.0
 */
export class VpcUpdatable {
    /**
     * Constructs a <code>VpcUpdatable</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/VpcUpdatable} obj Optional instance to populate.
     * @return {module:model/VpcUpdatable} The populated <code>VpcUpdatable</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * The name of the VPC. Must be unique and may only contain alphanumeric characters, dashes, and periods.
     * @member {String} name
     */
    name: any;
    /**
     * A free-form text field for describing the VPC's purpose. It may be a maximum of 255 characters.
     * @member {String} description
     */
    description: any;
}
