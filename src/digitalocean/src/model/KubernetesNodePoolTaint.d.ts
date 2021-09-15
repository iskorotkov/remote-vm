/**
 * The KubernetesNodePoolTaint model module.
 * @module model/KubernetesNodePoolTaint
 * @version 2.0
 */
export class KubernetesNodePoolTaint {
    /**
     * Constructs a <code>KubernetesNodePoolTaint</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/KubernetesNodePoolTaint} obj Optional instance to populate.
     * @return {module:model/KubernetesNodePoolTaint} The populated <code>KubernetesNodePoolTaint</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * An arbitrary string. The `key` and `value` fields of the `taint` object form a key-value pair. For example, if the value of the `key` field is \"special\" and the value of the `value` field is \"gpu\", the key value pair would be `special=gpu`.
     * @member {String} key
     */
    key: any;
    /**
     * An arbitrary string. The `key` and `value` fields of the `taint` object form a key-value pair. For example, if the value of the `key` field is \"special\" and the value of the `value` field is \"gpu\", the key value pair would be `special=gpu`.
     * @member {String} value
     */
    value: any;
    /**
     * How the node reacts to pods that it won't tolerate. Available effect values are `NoSchedule`, `PreferNoSchedule`, and `NoExecute`.
     * @member {module:model/KubernetesNodePoolTaint.EffectEnum} effect
     */
    effect: any;
}
export namespace KubernetesNodePoolTaint {
    namespace EffectEnum {
        const noSchedule: string;
        const preferNoSchedule: string;
        const noExecute: string;
    }
    /**
     * *
     */
    type EffectEnum = string;
}
