/**
 * The Tag model module.
 * @module model/Tag
 * @version 2.0
 */
export class Tag {
    /**
     * Constructs a <code>Tag</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Tag} obj Optional instance to populate.
     * @return {module:model/Tag} The populated <code>Tag</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * The name of the tag. Tags may contain letters, numbers, colons, dashes, and underscores. There is a limit of 255 characters per tag.  **Note:** Tag names are case stable, which means the capitalization you use when you first create a tag is canonical.  When working with tags in the API, you must use the tag's canonical capitalization. For example, if you create a tag named \"PROD\", the URL to add that tag to a resource would be `https://api.digitalocean.com/v2/tags/PROD/resources` (not `/v2/tags/prod/resources`).  Tagged resources in the control panel will always display the canonical capitalization. For example, if you create a tag named \"PROD\", you can tag resources in the control panel by entering \"prod\". The tag will still display with its canonical capitalization, \"PROD\".
     * @member {String} name
     */
    name: any;
    /**
     * An embedded object containing key value pairs of resource type and resource statistics. It also includes a count of the total number of resources tagged with the current tag as well as a `last_tagged_uri` attribute set to the last resource tagged with the current tag.
     * @member {Object} resources
     */
    resources: any;
}
