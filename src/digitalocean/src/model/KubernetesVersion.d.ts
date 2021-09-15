/**
 * The KubernetesVersion model module.
 * @module model/KubernetesVersion
 * @version 2.0
 */
export class KubernetesVersion {
    /**
     * Constructs a <code>KubernetesVersion</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/KubernetesVersion} obj Optional instance to populate.
     * @return {module:model/KubernetesVersion} The populated <code>KubernetesVersion</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * The slug identifier for an available version of Kubernetes for use when creating or updating a cluster. The string contains both the upstream version of Kubernetes as well as the DigitalOcean revision.
     * @member {String} slug
     */
    slug: any;
    /**
     * The upstream version string for the version of Kubernetes provided by a given slug.
     * @member {String} kubernetesVersion
     */
    kubernetesVersion: any;
}
