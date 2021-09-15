/**
 * The Droplet model module.
 * @module model/Droplet
 * @version 2.0
 */
export class Droplet {
    /**
     * Constructs a <code>Droplet</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Droplet} obj Optional instance to populate.
     * @return {module:model/Droplet} The populated <code>Droplet</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>Droplet</code>.
     * @alias module:model/Droplet
     * @class
     * @param id {Number} A unique identifier for each Droplet instance. This is automatically generated upon Droplet creation.
     * @param name {String} The human-readable name set for the Droplet instance.
     * @param memory {Number} Memory of the Droplet in megabytes.
     * @param vcpus {Number} The number of virtual CPUs.
     * @param disk {Number} The size of the Droplet's disk in gigabytes.
     * @param locked {Boolean} A boolean value indicating whether the Droplet has been locked, preventing actions by users.
     * @param status {module:model/Droplet.StatusEnum} A status string indicating the state of the Droplet instance. This may be \"new\", \"active\", \"off\", or \"archive\".
     * @param kernel {module:model/Kernel}
     * @param createdAt {Date} A time value given in ISO8601 combined date and time format that represents when the Droplet was created.
     * @param features {Array.<String>} An array of features enabled on this Droplet.
     * @param backupIds {Array.<Number>} An array of backup IDs of any backups that have been taken of the Droplet instance.  Droplet backups are enabled at the time of the instance creation.
     * @param nextBackupWindow {module:model/DropletNextBackupWindow}
     * @param snapshotIds {Array.<Number>} An array of snapshot IDs of any snapshots created from the Droplet instance.
     * @param image {module:model/Image}
     * @param volumeIds {Array.<String>} A flat array including the unique identifier for each Block Storage volume attached to the Droplet.
     * @param size {module:model/Size}
     * @param sizeSlug {String} The unique slug identifier for the size of this Droplet.
     * @param networks {module:model/DropletNetworks}
     * @param region {module:model/Region}
     * @param tags {Array.<String>} An array of Tags the Droplet has been tagged with.
     */
    constructor(id: number, name: string, memory: number, vcpus: number, disk: number, locked: boolean, status: any, kernel: any, createdAt: Date, features: Array<string>, backupIds: Array<number>, nextBackupWindow: any, snapshotIds: Array<number>, image: any, volumeIds: Array<string>, size: any, sizeSlug: string, networks: any, region: any, tags: Array<string>);
    id: number;
    name: string;
    memory: number;
    vcpus: number;
    disk: number;
    locked: boolean;
    status: any;
    kernel: any;
    createdAt: Date;
    features: string[];
    backupIds: number[];
    nextBackupWindow: any;
    snapshotIds: number[];
    image: any;
    volumeIds: string[];
    size: any;
    sizeSlug: string;
    networks: any;
    region: any;
    tags: string[];
    /**
     * A string specifying the UUID of the VPC to which the Droplet is assigned.
     * @member {String} vpcUuid
     */
    vpcUuid: any;
}
export namespace Droplet {
    namespace StatusEnum {
        const _new: string;
        const active: string;
        const off: string;
        const archive: string;
    }
    /**
     * *
     */
    type StatusEnum = string;
}
