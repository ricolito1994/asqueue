export type HTTPMethod =  'get' | 'post' | 'patch' | 'delete';

export interface HTTPEnpointType <T = HTTPMethod> {    
    endpoint    : string,
    req         : T
}