/**
 * The KubernetesOptions model module.
 * @module model/KubernetesOptions
 * @version 2.0
 */
export class KubernetesOptions {
    /**
     * Constructs a <code>KubernetesOptions</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/KubernetesOptions} obj Optional instance to populate.
     * @return {module:model/KubernetesOptions} The populated <code>KubernetesOptions</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {module:model/KubernetesOptionsOptions} options
     */
    options: any;
}
