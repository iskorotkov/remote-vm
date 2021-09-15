/**
 * The Kernel model module.
 * @module model/Kernel
 * @version 2.0
 */
export class Kernel {
    /**
     * Constructs a <code>Kernel</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Kernel} obj Optional instance to populate.
     * @return {module:model/Kernel} The populated <code>Kernel</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * A unique number used to identify and reference a specific kernel.
     * @member {Number} id
     */
    id: any;
    /**
     * The display name of the kernel. This is shown in the web UI and is generally a descriptive title for the kernel in question.
     * @member {String} name
     */
    name: any;
    /**
     * A standard kernel version string representing the version, patch, and release information.
     * @member {String} version
     */
    version: any;
}
