/**
 * The AlertPolicy model module.
 * @module model/AlertPolicy
 * @version 2.0
 */
export class AlertPolicy {
    /**
     * Constructs a <code>AlertPolicy</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AlertPolicy} obj Optional instance to populate.
     * @return {module:model/AlertPolicy} The populated <code>AlertPolicy</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>AlertPolicy</code>.
     * @alias module:model/AlertPolicy
     * @class
     * @param alerts {module:model/Alerts}
     * @param compare {module:model/AlertPolicy.CompareEnum}
     * @param description {String}
     * @param enabled {Boolean}
     * @param entities {Array.<String>}
     * @param tags {Array.<String>}
     * @param type {module:model/AlertPolicy.TypeEnum}
     * @param uuid {String}
     * @param value {Number}
     * @param window {module:model/AlertPolicy.WindowEnum}
     */
    constructor(alerts: any, compare: any, description: string, enabled: boolean, entities: Array<string>, tags: Array<string>, type: any, uuid: string, value: number, window: any);
    alerts: any;
    compare: any;
    description: string;
    enabled: boolean;
    entities: string[];
    tags: string[];
    type: any;
    uuid: string;
    value: number;
    window: any;
}
export namespace AlertPolicy {
    namespace CompareEnum {
        const greaterThan: string;
        const lessThan: string;
    }
    /**
     * *
     */
    type CompareEnum = string;
    namespace TypeEnum {
        const load1: string;
        const load5: string;
        const load15: string;
        const memoryUtilizationPercent: string;
        const diskUtilizationPercent: string;
        const cpu: string;
        const diskRead: string;
        const diskWrite: string;
        const publicOutboundBandwidth: string;
        const publicInboundBandwidth: string;
        const privateOutboundBandwidth: string;
        const privateInboundBandwidth: string;
    }
    /**
     * *
     */
    type TypeEnum = string;
    namespace WindowEnum {
        const _5m: string;
        const _10m: string;
        const _30m: string;
        const _1h: string;
    }
    /**
     * *
     */
    type WindowEnum = string;
}
