/**
 * The AppVariableDefinition model module.
 * @module model/AppVariableDefinition
 * @version 2.0
 */
export class AppVariableDefinition {
    /**
     * Constructs a <code>AppVariableDefinition</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppVariableDefinition} obj Optional instance to populate.
     * @return {module:model/AppVariableDefinition} The populated <code>AppVariableDefinition</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>AppVariableDefinition</code>.
     * @alias module:model/AppVariableDefinition
     * @class
     * @param key {String} The variable name
     */
    constructor(key: string);
    key: string;
    /**
     * - RUN_TIME: Made available only at run-time - BUILD_TIME: Made available only at build-time - RUN_AND_BUILD_TIME: Made available at both build and run-time
     * @member {module:model/AppVariableDefinition.ScopeEnum} scope
     * @default 'RUN_AND_BUILD_TIME'
     */
    scope: string;
    /**
     * - GENERAL: A plain-text environment variable - SECRET: A secret encrypted environment variable
     * @member {module:model/AppVariableDefinition.TypeEnum} type
     * @default 'GENERAL'
     */
    type: string;
    /**
     * The value. If the type is `SECRET`, the value will be encrypted on first submission. On following submissions, the encrypted value should be used.
     * @member {String} value
     */
    value: any;
}
export namespace AppVariableDefinition {
    namespace ScopeEnum {
        const UNSET: string;
        const RUN_TIME: string;
        const BUILD_TIME: string;
        const RUN_AND_BUILD_TIME: string;
    }
    /**
     * *
     */
    type ScopeEnum = string;
    namespace TypeEnum {
        const GENERAL: string;
        const SECRET: string;
    }
    /**
     * *
     */
    type TypeEnum = string;
}
