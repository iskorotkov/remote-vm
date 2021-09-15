/**
 * The ImageActionBase model module.
 * @module model/ImageActionBase
 * @version 2.0
 */
export class ImageActionBase {
    /**
     * Constructs a <code>ImageActionBase</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ImageActionBase} obj Optional instance to populate.
     * @return {module:model/ImageActionBase} The populated <code>ImageActionBase</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>ImageActionBase</code>.
     * @alias module:model/ImageActionBase
     * @class
     * @param type {module:model/ImageActionBase.TypeEnum} The action to be taken on the image. Can be either `convert` or `transfer`.
     */
    constructor(type: any);
    type: any;
}
export namespace ImageActionBase {
    namespace TypeEnum {
        const convert: string;
        const transfer: string;
    }
    /**
     * *
     */
    type TypeEnum = string;
}
