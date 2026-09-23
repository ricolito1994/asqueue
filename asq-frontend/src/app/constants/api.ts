import { HTTPEnpointType } from "@models/api.model";
/**
 * api routes
 * 
 * scheme:
 * each index at the most parent
 * are the prefix to contain
 * each individual route
 * according to its specific
 * business logic.
 * 
 * in the backend, we 
 * must acheive these or we map
 * our routes according to
 * this scheme.
 * 
 * for ex., user
 * under user there are
 * auth and get_users so the parent
 * is user as the prefix
 * 
 * endpoint ex: 
 * http://localhost:8080/user/auth or 
 * http://localhost:8080/user/get_user  
 * 
 */

const BASE_URL = import.meta.env.VITE_APP_BASE_URL ?? '';
/*
*
* Use this pattern if you create your own endpoint
* and include it on the export 
* so that you can use it outside
* this file
* 
* EndpointType is a model that defines
* the return type of each endpoint object
* @return
* endpoint: string
* req: HTTPMethod - get | post | patch | delete 
* basic CRUD
*
*/
const AUTH: Object = {
    'login'     : () :   HTTPEnpointType => ({endpoint: `${BASE_URL}/auth/login`,      req: "post"}),
    'logout'    : () :   HTTPEnpointType => ({endpoint: `${BASE_URL}/auth/logout`,     req: "post"}),
    'refresh'   : () :   HTTPEnpointType => ({endpoint: `${BASE_URL}/auth/refresh`,    req: "post"}), 
    'me'        : () :   HTTPEnpointType => ({endpoint: `${BASE_URL}/auth/me`,         req: "post"}),

    'departmentIndex': (page: number): HTTPEnpointType => ({endpoint: `${BASE_URL}/auth/department?page=${page}`,req: "get"}),
    'departmentAll': (): HTTPEnpointType => ({ endpoint: `${BASE_URL}/auth/department/all`, req: "get" }),
    'findDepartment' : (departmentId: number)  :   HTTPEnpointType => ({endpoint: `${BASE_URL}/auth/department/${departmentId}`, req: "get"}), createDepartment: () => ({endpoint: `${BASE_URL}/auth/department`,req: "post"}),
    'updateDepartment': (departmentId: number) => ({endpoint: `${BASE_URL}/auth/department/${departmentId}`,req: "patch"}),   
    'findCompany' : (companyId: number)  :   HTTPEnpointType => ({endpoint: `${BASE_URL}/auth/company/${companyId}`, req: "get"}),    
}

const USER: Object = {
    'all': () => ({ endpoint: `${BASE_URL}/auth/user/all`, req: "get", }),
    'find'  : (userId: number)  :   HTTPEnpointType => ({endpoint: `${BASE_URL}/auth/user/${userId}`, req: "get"}),    
    'index' : (page: number)  :   HTTPEnpointType => ({endpoint: `${BASE_URL}/auth/user?page=${page}`, req: "get"}),  
    'create' : ()  :   HTTPEnpointType => ({endpoint: `${BASE_URL}/auth/user`, req: "post"}),    
    'update' : (userId: number)  :   HTTPEnpointType => ({endpoint: `${BASE_URL}/auth/user/${userId}`, req: "patch"}), 
    'delete'  : (userId: number)  :   HTTPEnpointType => ({endpoint: `${BASE_URL}/auth/user/${userId}`, req: "delete"}),   

    'setActiveUserSession' : (userId: number)  :   HTTPEnpointType => ({endpoint: `${BASE_URL}/auth/user/set-active-session/${userId}`, req: "post"}),   
}

const LOG: Object = {
    'index'   : (page: Number) :   HTTPEnpointType => ({endpoint: `${BASE_URL}/logs?page=${page}`,  req: "get"}),
    'store'   : ()             :   HTTPEnpointType => ({endpoint: `${BASE_URL}/logs`,       req: "post"}),
    'show'    : (id: Number)   :   HTTPEnpointType => ({endpoint: `${BASE_URL}/logs/${id}`, req: "get"}),
    'patch'   : (id: Number)   :   HTTPEnpointType => ({endpoint: `${BASE_URL}/logs/${id}`, req: "patch"}), 
    'delete'  : (id: Number)   :   HTTPEnpointType => ({endpoint: `${BASE_URL}/logs/${id}`, req: "delete"}),                  
}

const QUEUE_MANAGER: Object = {
    'index'   : (page: Number):   HTTPEnpointType => ({endpoint: `${BASE_URL}/queue/transaction?page=${page}`,  req: "get"}),
    'create'  : ():   HTTPEnpointType => ({endpoint: `${BASE_URL}/queue/transaction`,req: "post"}),
    'show'    : (id: Number) :   HTTPEnpointType => ({endpoint: `${BASE_URL}/queue/transaction/${id}`, req: "get"}),
    'patch'   : (id: Number, userId: Number) :   HTTPEnpointType => ({endpoint: `${BASE_URL}/queue/transaction/${id}/${userId}`, req: "patch"}), 
    'delete'  : (id: Number, userId: Number) :   HTTPEnpointType => ({endpoint: `${BASE_URL}/queue/transaction/${id}/${userId}`, req: "delete"}),
    
    'windows' : (page: Number): HTTPEnpointType => ({endpoint: `${BASE_URL}/queue/windows?page=${page}`,  req: "get"}),
    'create-window': (): HTTPEnpointType => ({endpoint: `${BASE_URL}/queue/windows`,req: "post"}),
    'update-window': (windowId: Number): HTTPEnpointType => ({endpoint: `${BASE_URL}/queue/windows/${windowId}`,req: "patch"}),
    'assign-window': (windowId: Number): HTTPEnpointType => ({ endpoint: `${BASE_URL}/queue/windows/${windowId}/assign`, req: "patch" }),
    'concerns' : (page: Number): HTTPEnpointType => ({endpoint: `${BASE_URL}/queue/concerns?page=${page}`,  req: "get"}),
    'admin-concerns': (page: Number): HTTPEnpointType => ({  endpoint: `${BASE_URL}/queue/concerns/admin?page=${page}`,  req: "get" }),
    'window-assigned-to' : (userId: Number): HTTPEnpointType => ({endpoint: `${BASE_URL}/queue/windows/assignedto/${userId}`,  req: "get"}),

    'process-queue-number'  : ():   HTTPEnpointType => ({endpoint: `${BASE_URL}/queue/transaction/process`,req: "post"}),
    'recall-queue-number'  : (queueNumber: number):   HTTPEnpointType => ({endpoint: `${BASE_URL}/queue/transaction/recall/${queueNumber}`,req: "get"}),

    
}

export { 
    AUTH,
    QUEUE_MANAGER,
    LOG,
    USER
};