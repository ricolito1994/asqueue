import { AbstractApiService } from './AbstractApiService'
import { AUTH, USER } from '@constants/api'

export default class AuthenticationService extends AbstractApiService {

    protected auth: any;
    protected user: any;

    constructor (
        accessToken: string|undefined|null, 
        baseURL? : string|undefined|null, 
        refreshToken? : string|undefined|null,
        onAuthTokenUpdate? : (data:any) => void
    ) {
        super (accessToken, baseURL, refreshToken, onAuthTokenUpdate)
        this.auth = AUTH;
        this.user = USER;
    }

    async login <T=any> (data: any, config?: any) {
        try {
            let response = await this.requestV2<T>(this.auth.login(), data, config);
            return response?.data
        } catch (e: any) {
            throw e;
        }
    }

    async logout <T=any> (data: any, config?: any) {
        try {
            let response = await this.requestV2<T>(this.auth.logout(), data, config);
            return response?.data
        } catch (e) {
            throw e;
        }
    }

    async refreshAccessToken <T=any> (data: any, config?: any) {
        try {
            let response = await this.requestV2<T>(this.auth.logout(), data, config);
            return response?.data
        } catch (e) {
            throw e;
        }
    }

    async me <T=any> (data: any, config?: any) {
        try {
            let response = await this.requestV2<T>(this.auth.me(), data, config);
            return response?.data
        } catch (e) {
            throw e;
        }
    }

    async department <T=any> (departmentId: number, data: any, config?: any) {
        try {
            let response = await this.requestV2<T>(this.auth.findDepartment(departmentId), data, config);
            return response?.data
        } catch (e: any) {
            throw e;
        }
    }

    async setActiveSession <T=any> (userId: number, data: any, config?: any) {
        try {
            let response = await this.requestV2<T>(this.user.setActiveUserSession(userId), data, config);
            return response?.data
        } catch (e: any) {
            throw e;
        }
    }
    
}
