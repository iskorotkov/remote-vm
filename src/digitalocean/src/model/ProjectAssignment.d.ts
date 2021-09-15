/**
 * The ProjectAssignment model module.
 * @module model/ProjectAssignment
 * @version 2.0
 */
export class ProjectAssignment {
    /**
     * Constructs a <code>ProjectAssignment</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ProjectAssignment} obj Optional instance to populate.
     * @return {module:model/ProjectAssignment} The populated <code>ProjectAssignment</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * A list of uniform resource names (URNs) to be added to a project.
     * @member {Array.<module:model/Urn>} resources
     */
    resources: any;
}
