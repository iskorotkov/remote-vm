/**
 * The ImageNewCustom model module.
 * @module model/ImageNewCustom
 * @version 2.0
 */
export class ImageNewCustom extends ImageUpdate {
    /**
     * Constructs a new <code>ImageNewCustom</code>.
     * @alias module:model/ImageNewCustom
     * @class
     * @extends module:model/ImageUpdate
     * @param name {}
     * @param url {} A URL from which the custom Linux virtual machine image may be retrieved.  The image it points to must be in the raw, qcow2, vhdx, vdi, or vmdk format.  It may be compressed using gzip or bzip2 and must be smaller than 100 GB after being decompressed.
     * @param region {}
     */
    constructor(name: any, url: any, region: any);
    url: any;
    region: any;
    /**
     * @member {module:model/TagsArray} tags
     */
    tags: any;
}
import { ImageUpdate } from "./ImageUpdate";
