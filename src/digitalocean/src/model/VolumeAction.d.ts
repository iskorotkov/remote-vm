/**
 * The VolumeAction model module.
 * @module model/VolumeAction
 * @version 2.0
 */
export class VolumeAction {
    /**
     * Constructs a <code>VolumeAction</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/VolumeAction} obj Optional instance to populate.
     * @return {module:model/VolumeAction} The populated <code>VolumeAction</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * A unique numeric ID that can be used to identify and reference an action.
     * @member {Number} id
     */
    id: any;
    /**
     * The current status of the action. This can be \"in-progress\", \"completed\", or \"errored\".
     * @member {module:model/VolumeAction.StatusEnum} status
     * @default 'in-progress'
     */
    status: string;
    /**
     * This is the type of action that the object represents. For example, this could be \"transfer\" to represent the state of an image transfer action.
     * @member {String} type
     */
    type: any;
    /**
     * A time value given in ISO8601 combined date and time format that represents when the action was initiated.
     * @member {Date} startedAt
     */
    startedAt: any;
    /**
     * A time value given in ISO8601 combined date and time format that represents when the action was completed.
     * @member {Date} completedAt
     */
    completedAt: any;
    /**
     * A unique identifier for the resource that the action is associated with.
     * @member {Number} resourceId
     */
    resourceId: any;
    /**
     * The type of resource that the action is associated with.
     * @member {String} resourceType
     */
    resourceType: any;
    /**
     * @member {module:model/Region} region
     */
    region: any;
    /**
     * @member {Object} regionSlug
     */
    regionSlug: any;
}
export namespace VolumeAction {
    namespace StatusEnum {
        const inProgress: string;
        const completed: string;
        const errored: string;
    }
    /**
     * *
     */
    type StatusEnum = string;
}
