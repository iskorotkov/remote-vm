/**
 * The AppsGitlabSourceSpec model module.
 * @module model/AppsGitlabSourceSpec
 * @version 2.0
 */
export class AppsGitlabSourceSpec {
    /**
     * Constructs a <code>AppsGitlabSourceSpec</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppsGitlabSourceSpec} obj Optional instance to populate.
     * @return {module:model/AppsGitlabSourceSpec} The populated <code>AppsGitlabSourceSpec</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * The name of the branch to use
     * @member {String} branch
     */
    branch: any;
    /**
     * Whether to automatically deploy new commits made to the repo
     * @member {Boolean} deployOnPush
     */
    deployOnPush: any;
    /**
     * The name of the repo in the format owner/repo. Example: `digitalocean/sample-golang`
     * @member {String} repo
     */
    repo: any;
}
