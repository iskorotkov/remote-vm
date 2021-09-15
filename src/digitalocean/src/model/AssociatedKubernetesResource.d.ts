/**
 * The AssociatedKubernetesResource model module.
 * @module model/AssociatedKubernetesResource
 * @version 2.0
 */
export class AssociatedKubernetesResource {
    /**
     * Constructs a <code>AssociatedKubernetesResource</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AssociatedKubernetesResource} obj Optional instance to populate.
     * @return {module:model/AssociatedKubernetesResource} The populated <code>AssociatedKubernetesResource</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * The ID of a resource associated with a Kubernetes cluster.
     * @member {String} id
     */
    id: any;
    /**
     * The name of a resource associated with a Kubernetes cluster.
     * @member {String} name
     */
    name: any;
}
