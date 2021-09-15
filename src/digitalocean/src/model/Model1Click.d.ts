/**
 * The Model1Click model module.
 * @module model/Model1Click
 * @version 2.0
 */
export class Model1Click {
    /**
     * Constructs a <code>Model1Click</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Model1Click} obj Optional instance to populate.
     * @return {module:model/Model1Click} The populated <code>Model1Click</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>Model1Click</code>.
     * @alias module:model/Model1Click
     * @class
     * @param slug {String} The slug identifier for the 1-Click application.
     * @param type {String} The type of the 1-Click application.
     */
    constructor(slug: string, type: string);
    slug: string;
    type: string;
}
