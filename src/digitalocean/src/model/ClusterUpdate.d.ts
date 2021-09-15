/**
 * The ClusterUpdate model module.
 * @module model/ClusterUpdate
 * @version 2.0
 */
export class ClusterUpdate {
    /**
     * Constructs a <code>ClusterUpdate</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ClusterUpdate} obj Optional instance to populate.
     * @return {module:model/ClusterUpdate} The populated <code>ClusterUpdate</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>ClusterUpdate</code>.
     * @alias module:model/ClusterUpdate
     * @class
     * @param name {String} A human-readable name for a Kubernetes cluster.
     */
    constructor(name: string);
    name: string;
    /**
     * An array of tags applied to the Kubernetes cluster. All clusters are automatically tagged `k8s` and `k8s:$K8S_CLUSTER_ID`.
     * @member {Array.<String>} tags
     */
    tags: any;
    /**
     * @member {module:model/MaintenancePolicy} maintenancePolicy
     */
    maintenancePolicy: any;
    /**
     * A boolean value indicating whether the cluster will be automatically upgraded to new patch releases during its maintenance window.
     * @member {Boolean} autoUpgrade
     * @default false
     */
    autoUpgrade: boolean;
    /**
     * A boolean value indicating whether surge upgrade is enabled/disabled for the cluster. Surge upgrade makes cluster upgrades fast and reliable by bringing up new nodes before destroying the outdated nodes.
     * @member {Boolean} surgeUpgrade
     * @default false
     */
    surgeUpgrade: boolean;
}
