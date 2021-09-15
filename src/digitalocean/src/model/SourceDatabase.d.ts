/**
 * The SourceDatabase model module.
 * @module model/SourceDatabase
 * @version 2.0
 */
export class SourceDatabase {
    /**
     * Constructs a <code>SourceDatabase</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SourceDatabase} obj Optional instance to populate.
     * @return {module:model/SourceDatabase} The populated <code>SourceDatabase</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {Object} source
     */
    source: any;
    /**
     * Enables SSL encryption when connecting to the source database.
     * @member {Boolean} disableSsl
     */
    disableSsl: any;
}
