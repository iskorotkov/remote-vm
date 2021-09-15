/**
 * The NeighborIds model module.
 * @module model/NeighborIds
 * @version 2.0
 */
export class NeighborIds {
    /**
     * Constructs a <code>NeighborIds</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/NeighborIds} obj Optional instance to populate.
     * @return {module:model/NeighborIds} The populated <code>NeighborIds</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * An array of arrays. Each array will contain a set of Droplet IDs for Droplets that share a physical server.
     * @member {Array.<Array.<Number>>} neighborIds
     */
    neighborIds: any;
}
