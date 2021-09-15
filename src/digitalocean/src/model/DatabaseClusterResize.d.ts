/**
 * The DatabaseClusterResize model module.
 * @module model/DatabaseClusterResize
 * @version 2.0
 */
export class DatabaseClusterResize {
    /**
     * Constructs a <code>DatabaseClusterResize</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DatabaseClusterResize} obj Optional instance to populate.
     * @return {module:model/DatabaseClusterResize} The populated <code>DatabaseClusterResize</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>DatabaseClusterResize</code>.
     * @alias module:model/DatabaseClusterResize
     * @class
     * @param size {String} A slug identifier representing desired the size of the nodes in the database cluster.
     * @param numNodes {Number} The number of nodes in the database cluster. Valid values are are 1-3. In addition to the primary node, up to two standby nodes may be added for highly available configurations.
     */
    constructor(size: string, numNodes: number);
    size: string;
    numNodes: number;
}
