/**
 * The AppStaticSiteSpec model module.
 * @module model/AppStaticSiteSpec
 * @version 2.0
 */
export class AppStaticSiteSpec extends AppComponentBase {
    /**
     * Constructs a new <code>AppStaticSiteSpec</code>.
     * @alias module:model/AppStaticSiteSpec
     * @class
     * @extends module:model/AppComponentBase
     * @param name {} The name. Must be unique across all components within the same app.
     */
    constructor(name: any);
    /**
     * The name of the index document to use when serving this static site. Default: index.html
     * @member {String} indexDocument
     * @default 'index.html'
     */
    indexDocument: string;
    /**
     * The name of the error document to use when serving this static site. Default: 404.html. If no such file exists within the built assets, App Platform will supply one.
     * @member {String} errorDocument
     * @default '404.html'
     */
    errorDocument: string;
    /**
     * The name of the document to use as the fallback for any requests to documents that are not found when serving this static site. Only 1 of `catchall_document` or `error_document` can be set.
     * @member {String} catchallDocument
     */
    catchallDocument: any;
    /**
     * An optional path to where the built assets will be located, relative to the build context. If not set, App Platform will automatically scan for these directory names: `_static`, `dist`, `public`, `build`.
     * @member {String} outputDir
     */
    outputDir: any;
    /**
     * @member {module:model/AppsCorsPolicy} cors
     */
    cors: any;
    /**
     * A list of HTTP routes that should be routed to this component.
     * @member {Array.<module:model/AppRouteSpec>} routes
     */
    routes: any;
}
import { AppComponentBase } from "./AppComponentBase";
