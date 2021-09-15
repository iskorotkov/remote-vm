/**
 * The V2ProjectsBody model module.
 * @module model/V2ProjectsBody
 * @version 2.0
 */
export class V2ProjectsBody extends ProjectBase {
    /**
     * Constructs a new <code>V2ProjectsBody</code>.
     * @alias module:model/V2ProjectsBody
     * @class
     * @extends module:model/ProjectBase
     * @param name {} The human-readable name for the project. The maximum length is 175 characters and the name must be unique.
     * @param purpose {} The purpose of the project. The maximum length is 255 characters. It can have one of the following values:  - Just trying out DigitalOcean - Class project / Educational purposes - Website or blog - Web Application - Service or API - Mobile Application - Machine learning / AI / Data processing - IoT - Operational / Developer tooling  If another value for purpose is specified, for example, \"your custom purpose\", your purpose will be stored as `Other: your custom purpose`.
     */
    constructor(name: any, purpose: any);
}
import { ProjectBase } from "./ProjectBase";
