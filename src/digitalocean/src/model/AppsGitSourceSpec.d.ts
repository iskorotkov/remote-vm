/**
 * The AppsGitSourceSpec model module.
 * @module model/AppsGitSourceSpec
 * @version 2.0
 */
export class AppsGitSourceSpec {
    /**
     * Constructs a <code>AppsGitSourceSpec</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppsGitSourceSpec} obj Optional instance to populate.
     * @return {module:model/AppsGitSourceSpec} The populated <code>AppsGitSourceSpec</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * The name of the branch to use
     * @member {String} branch
     */
    branch: any;
    /**
     * The clone URL of the repo. Example: `https://github.com/digitalocean/sample-golang.git`
     * @member {String} repoCloneUrl
     */
    repoCloneUrl: any;
}
