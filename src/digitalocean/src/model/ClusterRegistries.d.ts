/**
 * The ClusterRegistries model module.
 * @module model/ClusterRegistries
 * @version 2.0
 */
export class ClusterRegistries {
    /**
     * Constructs a <code>ClusterRegistries</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ClusterRegistries} obj Optional instance to populate.
     * @return {module:model/ClusterRegistries} The populated <code>ClusterRegistries</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * An array containing the UUIDs of Kubernetes clusters.
     * @member {Array.<String>} clusterUuids
     */
    clusterUuids: any;
}
