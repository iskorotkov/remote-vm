/**
 * The DestroyedAssociatedResource model module.
 * @module model/DestroyedAssociatedResource
 * @version 2.0
 */
export class DestroyedAssociatedResource {
    /**
     * Constructs a <code>DestroyedAssociatedResource</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DestroyedAssociatedResource} obj Optional instance to populate.
     * @return {module:model/DestroyedAssociatedResource} The populated <code>DestroyedAssociatedResource</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * The unique identifier for the resource scheduled for deletion.
     * @member {String} id
     */
    id: any;
    /**
     * The name of the resource scheduled for deletion.
     * @member {String} name
     */
    name: any;
    /**
     * A time value given in ISO8601 combined date and time format indicating when the resource was destroyed if the request was successful.
     * @member {Date} destroyedAt
     */
    destroyedAt: any;
    /**
     * A string indicating that the resource was not successfully destroyed and providing additional information.
     * @member {String} errorMessage
     */
    errorMessage: any;
}
