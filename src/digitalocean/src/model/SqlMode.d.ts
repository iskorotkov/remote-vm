/**
 * The SqlMode model module.
 * @module model/SqlMode
 * @version 2.0
 */
export class SqlMode {
    /**
     * Constructs a <code>SqlMode</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SqlMode} obj Optional instance to populate.
     * @return {module:model/SqlMode} The populated <code>SqlMode</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>SqlMode</code>.
     * @alias module:model/SqlMode
     * @class
     * @param sqlMode {String} A string specifying the configured SQL modes for the MySQL cluster.
     */
    constructor(sqlMode: string);
    sqlMode: string;
}
