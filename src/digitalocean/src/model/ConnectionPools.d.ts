/**
 * The ConnectionPools model module.
 * @module model/ConnectionPools
 * @version 2.0
 */
export class ConnectionPools {
    /**
     * Constructs a <code>ConnectionPools</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ConnectionPools} obj Optional instance to populate.
     * @return {module:model/ConnectionPools} The populated <code>ConnectionPools</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * An array of connection pool objects.
     * @member {Array.<module:model/ConnectionPool>} pools
     */
    pools: any;
}
