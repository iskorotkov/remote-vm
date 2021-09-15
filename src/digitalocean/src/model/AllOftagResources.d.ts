/**
 * The AllOftagResources model module.
 * @module model/AllOftagResources
 * @version 2.0
 */
export class AllOftagResources extends TagMetadata {
    /**
     * @member {module:model/TagMetadata} droplets
     */
    droplets: any;
    /**
     * @member {module:model/TagMetadata} imgages
     */
    imgages: any;
    /**
     * @member {module:model/TagMetadata} volumes
     */
    volumes: any;
    /**
     * @member {module:model/TagMetadata} volumeSnapshots
     */
    volumeSnapshots: any;
    /**
     * @member {module:model/TagMetadata} databases
     */
    databases: any;
}
import { TagMetadata } from "./TagMetadata";
