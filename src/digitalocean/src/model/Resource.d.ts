/**
 * The Resource model module.
 * @module model/Resource
 * @version 2.0
 */
export class Resource {
    /**
     * Constructs a <code>Resource</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Resource} obj Optional instance to populate.
     * @return {module:model/Resource} The populated <code>Resource</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {module:model/Urn} urn
     */
    urn: any;
    /**
     * A time value given in ISO8601 combined date and time format that represents when the project was created.
     * @member {Date} assignedAt
     */
    assignedAt: any;
    /**
     * @member {module:model/ResourceLinks} links
     */
    links: any;
    /**
     * The status of assigning and fetching the resources.
     * @member {module:model/Resource.StatusEnum} status
     */
    status: any;
}
export namespace Resource {
    namespace StatusEnum {
        const ok: string;
        const notFound: string;
        const assigned: string;
        const alreadyAssigned: string;
        const serviceDown: string;
    }
    /**
     * *
     */
    type StatusEnum = string;
}
