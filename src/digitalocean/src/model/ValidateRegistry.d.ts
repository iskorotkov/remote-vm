/**
 * The ValidateRegistry model module.
 * @module model/ValidateRegistry
 * @version 2.0
 */
export class ValidateRegistry {
    /**
     * Constructs a <code>ValidateRegistry</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ValidateRegistry} obj Optional instance to populate.
     * @return {module:model/ValidateRegistry} The populated <code>ValidateRegistry</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>ValidateRegistry</code>.
     * @alias module:model/ValidateRegistry
     * @class
     * @param name {String} A globally unique name for the container registry. Must be lowercase and be composed only of numbers, letters and `-`, up to a limit of 63 characters.
     */
    constructor(name: string);
    name: string;
}
