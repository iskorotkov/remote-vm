/**
 * The MetricsResult model module.
 * @module model/MetricsResult
 * @version 2.0
 */
export class MetricsResult {
    /**
     * Constructs a <code>MetricsResult</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/MetricsResult} obj Optional instance to populate.
     * @return {module:model/MetricsResult} The populated <code>MetricsResult</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>MetricsResult</code>.
     * @alias module:model/MetricsResult
     * @class
     * @param metric {Object.<String, String>} An object containing the metric labels.
     * @param values {Array.<Array.<Object>>}
     */
    constructor(metric: any, values: Array<Array<any>>);
    metric: any;
    values: any[][];
}
