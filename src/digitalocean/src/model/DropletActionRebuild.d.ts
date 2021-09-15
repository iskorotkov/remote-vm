/**
 * The DropletActionRebuild model module.
 * @module model/DropletActionRebuild
 * @version 2.0
 */
export class DropletActionRebuild extends DropletActionType {
    /**
     * The image ID of a public or private image or the slug identifier for a public image. The Droplet will be rebuilt using this image as its base.
     * @member {Object} image
     */
    image: any;
}
import { DropletActionType } from "./DropletActionType";
