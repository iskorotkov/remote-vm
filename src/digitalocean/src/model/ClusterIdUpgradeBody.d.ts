/**
 * The ClusterIdUpgradeBody model module.
 * @module model/ClusterIdUpgradeBody
 * @version 2.0
 */
export class ClusterIdUpgradeBody {
    /**
     * Constructs a <code>ClusterIdUpgradeBody</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ClusterIdUpgradeBody} obj Optional instance to populate.
     * @return {module:model/ClusterIdUpgradeBody} The populated <code>ClusterIdUpgradeBody</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * The slug identifier for the version of Kubernetes that the cluster will be upgraded to.
     * @member {String} version
     */
    version: any;
}
