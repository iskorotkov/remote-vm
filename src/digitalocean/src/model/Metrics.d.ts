/**
 * The Metrics model module.
 * @module model/Metrics
 * @version 2.0
 */
export class Metrics {
    /**
     * Constructs a <code>Metrics</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Metrics} obj Optional instance to populate.
     * @return {module:model/Metrics} The populated <code>Metrics</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>Metrics</code>.
     * @alias module:model/Metrics
     * @class
     * @param data {module:model/MetricsData}
     * @param status {module:model/Metrics.StatusEnum}
     */
    constructor(data: any, status: any);
    data: any;
    status: any;
}
export namespace Metrics {
    namespace StatusEnum {
        const success: string;
        const error: string;
    }
    /**
     * *
     */
    type StatusEnum = string;
}
