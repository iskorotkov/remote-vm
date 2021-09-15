/**
 * The VolumeActionPostAttach model module.
 * @module model/VolumeActionPostAttach
 * @version 2.0
 */
export class VolumeActionPostAttach extends VolumeActionPostBase {
    /**
     * Constructs a new <code>VolumeActionPostAttach</code>.
     * @alias module:model/VolumeActionPostAttach
     * @class
     * @extends module:model/VolumeActionPostBase
     * @param type {} The volume action to initiate.
     * @param dropletId {}
     */
    constructor(type: any, dropletId: any);
    dropletId: any;
    /**
     * @member {module:model/TagsArray} tags
     */
    tags: any;
}
import { VolumeActionPostBase } from "./VolumeActionPostBase";
