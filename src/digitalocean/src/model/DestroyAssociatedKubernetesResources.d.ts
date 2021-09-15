/**
 * The DestroyAssociatedKubernetesResources model module.
 * @module model/DestroyAssociatedKubernetesResources
 * @version 2.0
 */
export class DestroyAssociatedKubernetesResources {
    /**
     * Constructs a <code>DestroyAssociatedKubernetesResources</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DestroyAssociatedKubernetesResources} obj Optional instance to populate.
     * @return {module:model/DestroyAssociatedKubernetesResources} The populated <code>DestroyAssociatedKubernetesResources</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * A list of IDs for associated load balancers to destroy along with the cluster.
     * @member {Array.<String>} loadBalancers
     */
    loadBalancers: any;
    /**
     * A list of IDs for associated volumes to destroy along with the cluster.
     * @member {Array.<String>} volumes
     */
    volumes: any;
    /**
     * A list of IDs for associated volume snapshots to destroy along with the cluster.
     * @member {Array.<String>} volumeSnapshots
     */
    volumeSnapshots: any;
}
