/**
 * The DropletSingleCreate model module.
 * @module model/DropletSingleCreate
 * @version 2.0
 */
export class DropletSingleCreate {
    /**
     * Constructs a <code>DropletSingleCreate</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DropletSingleCreate} obj Optional instance to populate.
     * @return {module:model/DropletSingleCreate} The populated <code>DropletSingleCreate</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>DropletSingleCreate</code>.
     * @alias module:model/DropletSingleCreate
     * @class
     * @param region {} The slug identifier for the region that you wish to deploy the Droplet in.
     * @param size {} The slug identifier for the size that you wish to select for this Droplet.
     * @param image {} The image ID of a public or private image or the slug identifier for a public image. This image will be the base image for your Droplet.
     */
    constructor(region: any, size: any, image: any);
    region: any;
    size: any;
    image: any;
    /**
     * An array containing the IDs or fingerprints of the SSH keys that you wish to embed in the Droplet's root account upon creation.
     * @member {Array.<Object>} sshKeys
     */
    sshKeys: any;
    /**
     * A boolean indicating whether automated backups should be enabled for the Droplet.
     * @member {Boolean} backups
     * @default false
     */
    backups: boolean;
    /**
     * A boolean indicating whether to enable IPv6 on the Droplet.
     * @member {Boolean} ipv6
     * @default false
     */
    ipv6: boolean;
    /**
     * A boolean indicating whether to install the DigitalOcean agent for monitoring.
     * @member {Boolean} monitoring
     * @default false
     */
    monitoring: boolean;
    /**
     * A flat array of tag names as strings to apply to the Droplet after it is created. Tag names can either be existing or new tags.
     * @member {Array.<String>} tags
     */
    tags: any;
    /**
     * A string containing 'user data' which may be used to configure the Droplet on first boot, often a 'cloud-config' file or Bash script. It must be plain text and may not exceed 64 KiB in size.
     * @member {String} userData
     */
    userData: any;
    /**
     * This parameter has been deprecated. Use `vpc_uuid` instead to specify a VPC network for the Droplet. If no `vpc_uuid` is provided, the Droplet will be placed in your account's default VPC for the region.
     * @member {Boolean} privateNetworking
     * @default false
     */
    privateNetworking: boolean;
    /**
     * A string specifying the UUID of the VPC to which the Droplet will be assigned. If excluded, the Droplet will be assigned to your account's default VPC for the region.
     * @member {String} vpcUuid
     */
    vpcUuid: any;
    /**
     * A boolean indicating whether to install the DigitalOcean agent used for providing access to the Droplet web console in the control panel. By default, the agent is installed on new Droplets but installation errors (i.e. OS not supported) are ignored. To prevent it from being installed, set to `false`. To make installation errors fatal, explicitly set it to `true`.
     * @member {Boolean} withDropletAgent
     */
    withDropletAgent: any;
}
