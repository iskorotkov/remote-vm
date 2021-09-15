/**
 * The MetricsData model module.
 * @module model/MetricsData
 * @version 2.0
 */
export class MetricsData {
    /**
     * Constructs a <code>MetricsData</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/MetricsData} obj Optional instance to populate.
     * @return {module:model/MetricsData} The populated <code>MetricsData</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>MetricsData</code>.
     * @alias module:model/MetricsData
     * @class
     * @param result {Array.<module:model/MetricsResult>} Result of query.
     * @param resultType {module:model/MetricsData.ResultTypeEnum}
     */
    constructor(result: Array<NodeModule>, resultType: any);
    result: NodeModule[];
    resultType: any;
}
export namespace MetricsData {
    namespace ResultTypeEnum {
        const matrix: string;
    }
    /**
     * *
     */
    type ResultTypeEnum = string;
}
