import { AxiosResponse } from 'axios';
export interface HTTPRequestableInterface {
    get     <T = any> (url: string,            config?: any) : Promise<AxiosResponse <T>>,
    post    <T = any> (url: string, data?:any, config?: any) : Promise<AxiosResponse <T>>,
    patch   <T = any> (url: string, data?:any, config?: any) : Promise<AxiosResponse <T>>,
    delete  <T = any> (url: string,            config?: any) : Promise<AxiosResponse <T>>,
}