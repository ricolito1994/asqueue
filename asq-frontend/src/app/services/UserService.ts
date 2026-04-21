import { AbstractApiService } from './AbstractApiService'
import { USER } from '@constants/api'

export default class AuthenticationService extends AbstractApiService {

    protected user: any;

    constructor (
        accessToken: string|undefined|null, 
        baseURL? : string|undefined|null, 
        refreshToken? : string|undefined|null,
        onAuthTokenUpdate? : (data:any) => void
    ) {
        super (accessToken, baseURL, refreshToken, onAuthTokenUpdate)
        this.user = USER;
    }

    async find <T=any> (userId: number, data: any, config?: any) {
        try {
            let response = await this.requestV2<T>(this.user.find(userId), data, config);
            return response?.data
        } catch (e: any) {
            throw e;
        }
    }

    async index <T=any> (page:number, data: any, config?: any) {
        try {
            let response = await this.requestV2<T>(this.user.index(page), data, config);
            return response?.data
        } catch (e: any) {
            throw e;
        }
    }

    async create <T=any> (data: any, config?: any) {
        try {
            let response = await this.requestV2<T>(this.user.create(), data, config);
            return response?.data
        } catch (e: any) {
            throw e;
        }
    }

    async update <T=any> (userId: number, data: any, config?: any) {
        try {
            let response = await this.requestV2<T>(this.user.update(userId), data, config);
            return response?.data
        } catch (e: any) {
            throw e;
        }
    }

    async destroy <T=any> (userId: number, data: any, config?: any) {
        try {
            let response = await this.requestV2<T>(this.user.delete(userId), data, config);
            return response?.data
        } catch (e: any) {
            throw e;
        }
    }

}