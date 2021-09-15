/**
 * The AssociatedKubernetesResources model module.
 * @module model/AssociatedKubernetesResources
 * @version 2.0
 */
export class AssociatedKubernetesResources {
    /**
     * Constructs a <code>AssociatedKubernetesResources</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AssociatedKubernetesResources} obj Optional instance to populate.
     * @return {module:model/AssociatedKubernetesResources} The populated <code>AssociatedKubernetesResources</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * A list of names and IDs for associated load balancers that can be destroyed along with the cluster.
     * @member {Array.<module:model/AssociatedKubernetesResource>} loadBalancers
     */
    loadBalancers: any;
    /**
     * A list of names and IDs for associated volumes that can be destroyed along with the cluster.
     * @member {Array.<module:model/AssociatedKubernetesResource>} volumes
     */
    volumes: any;
    /**
     * A list of names and IDs for associated volume snapshots that can be destroyed along with the cluster.
     * @member {Array.<module:model/AssociatedKubernetesResource>} volumeSnapshots
     */
    volumeSnapshots: any;
}
