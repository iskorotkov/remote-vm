/**
 * The AppComponentBase model module.
 * @module model/AppComponentBase
 * @version 2.0
 */
export class AppComponentBase {
    /**
     * Constructs a <code>AppComponentBase</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppComponentBase} obj Optional instance to populate.
     * @return {module:model/AppComponentBase} The populated <code>AppComponentBase</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * The name. Must be unique across all components within the same app.
     * @member {String} name
     */
    name: any;
    /**
     * @member {module:model/AppsGitSourceSpec} git
     */
    git: any;
    /**
     * @member {module:model/AppsGithubSourceSpec} github
     */
    github: any;
    /**
     * @member {module:model/AppsGitlabSourceSpec} gitlab
     */
    gitlab: any;
    /**
     * @member {module:model/AppsImageSourceSpec} image
     */
    image: any;
    /**
     * The path to the Dockerfile relative to the root of the repo. If set, it will be used to build this component. Otherwise, App Platform will attempt to build it using buildpacks.
     * @member {String} dockerfilePath
     */
    dockerfilePath: any;
    /**
     * An optional build command to run while building this component from source.
     * @member {String} buildCommand
     */
    buildCommand: any;
    /**
     * An optional run command to override the component's default.
     * @member {String} runCommand
     */
    runCommand: any;
    /**
     * An optional path to the working directory to use for the build. For Dockerfile builds, this will be used as the build context. Must be relative to the root of the repo.
     * @member {String} sourceDir
     */
    sourceDir: any;
    /**
     * A list of environment variables made available to the component.
     * @member {Array.<module:model/AppVariableDefinition>} envs
     */
    envs: any;
    /**
     * An environment slug describing the type of this app. For a full list, please refer to [the product documentation](https://www.digitalocean.com/docs/app-platform/).
     * @member {String} environmentSlug
     */
    environmentSlug: any;
}
