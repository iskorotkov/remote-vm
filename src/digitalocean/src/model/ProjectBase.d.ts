/**
 * The ProjectBase model module.
 * @module model/ProjectBase
 * @version 2.0
 */
export class ProjectBase {
    /**
     * Constructs a <code>ProjectBase</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ProjectBase} obj Optional instance to populate.
     * @return {module:model/ProjectBase} The populated <code>ProjectBase</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * The unique universal identifier of this project.
     * @member {String} id
     */
    id: any;
    /**
     * The unique universal identifier of the project owner.
     * @member {String} ownerUuid
     */
    ownerUuid: any;
    /**
     * The integer id of the project owner.
     * @member {Number} ownerId
     */
    ownerId: any;
    /**
     * The human-readable name for the project. The maximum length is 175 characters and the name must be unique.
     * @member {String} name
     */
    name: any;
    /**
     * The description of the project. The maximum length is 255 characters.
     * @member {String} description
     */
    description: any;
    /**
     * The purpose of the project. The maximum length is 255 characters. It can have one of the following values:  - Just trying out DigitalOcean - Class project / Educational purposes - Website or blog - Web Application - Service or API - Mobile Application - Machine learning / AI / Data processing - IoT - Operational / Developer tooling  If another value for purpose is specified, for example, \"your custom purpose\", your purpose will be stored as `Other: your custom purpose`.
     * @member {String} purpose
     */
    purpose: any;
    /**
     * The environment of the project's resources.
     * @member {module:model/ProjectBase.EnvironmentEnum} environment
     */
    environment: any;
    /**
     * A time value given in ISO8601 combined date and time format that represents when the project was created.
     * @member {Date} createdAt
     */
    createdAt: any;
    /**
     * A time value given in ISO8601 combined date and time format that represents when the project was updated.
     * @member {Date} updatedAt
     */
    updatedAt: any;
}
export namespace ProjectBase {
    namespace EnvironmentEnum {
        const development: string;
        const staging: string;
        const production: string;
    }
    /**
     * *
     */
    type EnvironmentEnum = string;
}
