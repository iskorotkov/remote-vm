/**
 * The VolumeActionPostDetach model module.
 * @module model/VolumeActionPostDetach
 * @version 2.0
 */
export class VolumeActionPostDetach extends VolumeActionPostBase {
    /**
     * Constructs a new <code>VolumeActionPostDetach</code>.
     * @alias module:model/VolumeActionPostDetach
     * @class
     * @extends module:model/VolumeActionPostBase
     * @param type {} The volume action to initiate.
     * @param dropletId {}
     */
    constructor(type: any, dropletId: any);
    dropletId: any;
}
import { VolumeActionPostBase } from "./VolumeActionPostBase";
