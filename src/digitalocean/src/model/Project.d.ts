/**
 * The Project model module.
 * @module model/Project
 * @version 2.0
 */
export class Project extends ProjectBase {
    /**
     * If true, all resources will be added to this project if no project is specified.
     * @member {Boolean} isDefault
     */
    isDefault: any;
}
import { ProjectBase } from "./ProjectBase";
