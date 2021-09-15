/**
 * The ImageActionTransfer model module.
 * @module model/ImageActionTransfer
 * @version 2.0
 */
export class ImageActionTransfer extends ImageActionBase {
    /**
     * Constructs a new <code>ImageActionTransfer</code>.
     * @alias module:model/ImageActionTransfer
     * @class
     * @extends module:model/ImageActionBase
     * @param type {} The action to be taken on the image. Can be either `convert` or `transfer`.
     * @param region {}
     */
    constructor(type: any, region: any);
    region: any;
}
import { ImageActionBase } from "./ImageActionBase";
