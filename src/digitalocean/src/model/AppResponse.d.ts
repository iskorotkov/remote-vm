/**
 * The AppResponse model module.
 * @module model/AppResponse
 * @version 2.0
 */
export class AppResponse {
    /**
     * Constructs a <code>AppResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppResponse} obj Optional instance to populate.
     * @return {module:model/AppResponse} The populated <code>AppResponse</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {module:model/App} app
     */
    app: any;
}
