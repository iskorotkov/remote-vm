/**
 * *
 */
export type AppsDeploymentProgressStepStatus = string;
export namespace AppsDeploymentProgressStepStatus {
    const UNKNOWN: string;
    const PENDING: string;
    const RUNNING: string;
    const ERROR: string;
    const SUCCESS: string;
    function constructFromObject(object: any): any;
}
