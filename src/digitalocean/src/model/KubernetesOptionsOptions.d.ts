/**
 * The KubernetesOptionsOptions model module.
 * @module model/KubernetesOptionsOptions
 * @version 2.0
 */
export class KubernetesOptionsOptions {
    /**
     * Constructs a <code>KubernetesOptionsOptions</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/KubernetesOptionsOptions} obj Optional instance to populate.
     * @return {module:model/KubernetesOptionsOptions} The populated <code>KubernetesOptionsOptions</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {Array.<module:model/KubernetesRegion>} regions
     */
    regions: any;
    /**
     * @member {Array.<module:model/KubernetesVersion>} versions
     */
    versions: any;
    /**
     * @member {Array.<module:model/KubernetesSize>} sizes
     */
    sizes: any;
}
