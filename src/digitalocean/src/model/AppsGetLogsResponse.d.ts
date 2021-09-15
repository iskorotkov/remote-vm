/**
 * The AppsGetLogsResponse model module.
 * @module model/AppsGetLogsResponse
 * @version 2.0
 */
export class AppsGetLogsResponse {
    /**
     * Constructs a <code>AppsGetLogsResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppsGetLogsResponse} obj Optional instance to populate.
     * @return {module:model/AppsGetLogsResponse} The populated <code>AppsGetLogsResponse</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {Array.<String>} historicUrls
     */
    historicUrls: any;
    /**
     * A URL of the real-time live logs. This URL may use either the `https://` or `wss://` protocols and will keep pushing live logs as they become available.
     * @member {String} liveUrl
     */
    liveUrl: any;
}
