/*
 *
 * This is an abstract class
 * pre requisite:
 *
 * install axios in your project
 * npm i axios / npm install axios --legacy-peer-deps
 * 
 * No need to instantiate :
 * `let api = new ApiService(accessToken)`
 * we just need to extend this:
 * export class MyService extends ApiService
 * when you are extending a class
 * you must inherit also the constructor
 * by using super keyword
 * and then supply the parameters
 * defined by your abstract class that you
 * want to extend
 * super(accessToken)
 * 
 * this is just a template class
 * 
 * so that we dont need to
 * explicitly define the code to
 * create an axios instance
 * everytime we request to server
 * 
*/
import { HTTPRequestableInterface } from "./HTTPRequestableInterface";
import axios, { 
    AxiosInstance, 
    AxiosResponse, 
    AxiosRequestConfig  
} from 'axios';
import {
    HTTPMethod, 
    HTTPEnpointType
} 
from "@models/api.model";

export abstract class AbstractApiService implements HTTPRequestableInterface 
{
    public abortController: any;
    public abortControllerSignal: any | null;
    public accessToken: string |undefined|null;
    public apiClient: AxiosInstance;
    public baseUrl: string|undefined|null;
    public refreshToken: string|undefined|null;
    public methodMap: Record<HTTPMethod, Function>;
    public onAuthTokenUpdate: Function | undefined | null;

    public constructor(
        accessToken: string|undefined|null, 
        baseURL? : string|undefined|null, 
        refreshToken? : string|undefined|null,
        onAuthTokenUpdate? : (data:any) => void
    ) {
        this.accessToken = accessToken;
        this.baseUrl = baseURL ?? (import.meta.env.VITE_APP_BASE_URL ?? '');
        this.apiClient = (this.accessToken === '' || ! this.accessToken) ? 
        this.getApiClientWithoutAuthentication() : this.getApiClient();
        this.refreshToken = refreshToken ?? null;
        this.onAuthTokenUpdate = onAuthTokenUpdate

        this.apiClient.interceptors.response.use(
            response => response,
            async error => {
                let errStatus = [
                    'Token is Expired',
                    'Invalid Token'
                ]

                let isAcceptedErrorMessage = errStatus.includes(error.response?.data?.status)

                if (this.refreshToken && isAcceptedErrorMessage) {
                    try {
                        await this.refreshAccessTokenOnTheGo();
                        
                        // retry request
                        const config = error.config;
                        config.headers['Authorization'] = `Bearer ${this.accessToken}`
                        return this.apiClient.request(config)

                    } catch (e) {
                        console.log(e)
                        return Promise.reject(e)
                    }
                }
                return Promise.reject(error)
            }
        );

        this.methodMap = {
            get     : this.apiClient.get.bind(this.apiClient),
            post    : this.apiClient.post.bind(this.apiClient),
            patch   : this.apiClient.patch.bind(this.apiClient),
            delete  : this.apiClient.delete.bind(this.apiClient),
        };
    }

    protected async refreshAccessTokenOnTheGo() : Promise<void>
    {
        if (! this.refreshToken) throw new Error ("No refresh token found")

        try {
            const response = await axios.post (`${this.baseUrl}/auth/refresh`, {
                'refresh_token' : this.refreshToken
            })

            this.accessToken = response.data.access_token

            this.refreshToken = response.data.refresh_token

            if (this.onAuthTokenUpdate) {
                this.onAuthTokenUpdate(response.data)
            }

        } catch (e) {
            throw e;
        }
    }

    /**
     * 
     * @returns AxiosInstance
     * 
     * used for endpoints with
     * JWT Authentication or needs of
     * access token
     * 
     */
    protected getApiClientWithoutAuthentication(): AxiosInstance {
        return axios.create({
            baseURL: this.baseUrl ?? '',
            headers: {
                'Content-type': 'application/json',
                Accept: 'application/json',
            },
        });
    }
    /**
     * 
     * @returns AxiosInstance
     * 
     * used for 
     */
    protected getApiClient(): AxiosInstance {
        return axios.create({
            baseURL: this.baseUrl ?? '',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json',
                Authorization: `Bearer ${this.accessToken}`,
                Accept: 'application/json',
            },
        });
    }

    /**
     * 
     * @param fn 
     * @param fallback 
     * @returns Promise
     * 
     * a rescue function from laravel
     * typescript implementation
     * 
     */
    protected async rescueAsync<T> (
        fn: () => Promise<T>,
        fallback: T | ((error: unknown) => T | Promise<T>)
    ): Promise<T> {
        try {
            return await fn();
        } catch (error) {
            if (typeof fallback === "function") {
                return await (fallback as (e: unknown) => T | Promise<T>)(error);
            }
            return fallback;
        }
    }

    /**
     * chain this function to set abortcontroller signal
     * to your service class if you want your request
     * to be aborted at some point.
     */
    protected setAbortControllerSignal(signal: any | null): this {
        if (!signal) throw 'what? where is your abort signal?';
        this.abortControllerSignal = signal;
        return this;
    }

    public enableAbort (): this {
        const abortController = new AbortController;
        const abortSignal = abortController.signal;
        this.abortController = abortController;
        return this.setAbortControllerSignal(abortSignal);
    }

    // deprecated
    public request<T = any>(
        endPoint  : HTTPEnpointType,
        data?     : any,
        config?   : AxiosRequestConfig
    ): Promise<AxiosResponse <T>> | void {
        try {
            if (this.abortControllerSignal) {
                config = config ? { ...config, signal: this.abortControllerSignal } : 
                    { signal: this.abortControllerSignal }
            }
            return (endPoint.req === 'get' || endPoint.req === 'delete') ? 
                this.methodMap[endPoint.req](endPoint.endpoint, config): 
                this.methodMap[endPoint.req](endPoint.endpoint, data, config);
        } catch (e:any) {
            if (axios.isAxiosError(e) && e.code === "ERR_CANCELED") {
                // Request was cancelled, return nothing
                return;
            }
            throw e;
        }
    }
    /**
     * 
     * @param endPoint : HTTPEnpointType
     * @param data : any/object
     * @param config : AxiosRequestConfig
     * @returns Promise
     * 
     * version2 of request:
     * uses rescue function for
     * cleaner api request and
     * error handling mechanism
     * 
     * only accepts HTTP
     * GET : for retrieval of database doc/s
     * POST : for store or create
     * DELETE : for removing database doc/s
     * PATCH: for update
     * 
     */
    public requestV2 <T = any> (
        endPoint  : HTTPEnpointType,
        data?     : any,
        config?   : AxiosRequestConfig
    ): Promise<AxiosResponse <T>> | void  { 
        return this.rescueAsync<AxiosResponse <T>>(async () => {
            if (this.abortControllerSignal) {
                config = config ? { ...config, signal: this.abortControllerSignal } : 
                    { signal: this.abortControllerSignal }
            }

            const httpRequest = this[endPoint.req as keyof this];

            const args =  (endPoint.req === 'get' || endPoint.req === 'delete') ? [endPoint.endpoint, config] :
                [endPoint.endpoint, data, config];

            if (typeof httpRequest === "function") {
                return await httpRequest.call(this, ...args)
            }
        }, (e:any) => {
            throw e;
        })
    }

    /**
     * HTTP request implemented from HTTPRequestable Interface
     * you must never name your functions
     * same with these inherited functions
     * from HTTPRequestableInterface
     */
    public get <T = any> (url: string, config?: any) : Promise<AxiosResponse <T>> {
        return this.apiClient.get(url, config)
    }

    public post <T = any> (url: string, data?:any, config?: any) : Promise<AxiosResponse <T>> {
        return this.apiClient.post(url, data, config)
    }

    public patch <T = any> (url: string, data?:any, config?: any) : Promise<AxiosResponse <T>> {
        return this.apiClient.patch(url, data, config)
    }

    public delete <T = any> (url: string, config?: any) : Promise<AxiosResponse <T>> {
        return this.apiClient.delete(url, config)
    }
}