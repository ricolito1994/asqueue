import { AbstractApiService } from './AbstractApiService'
import { AUTH, USER, QUEUE_MANAGER } from "@constants/api";

export default class AuthenticationService extends AbstractApiService {
  protected auth: any;
  protected user: any;
  protected queueManager: any;

  constructor(
    accessToken: string | undefined | null,
    baseURL?: string | undefined | null,
    refreshToken?: string | undefined | null,
    onAuthTokenUpdate?: (data: any) => void,
  ) {
    super(accessToken, baseURL, refreshToken, onAuthTokenUpdate);
    this.auth = AUTH;
    this.user = USER;
    this.queueManager = QUEUE_MANAGER;
  }
  async login<T = any>(data: any, config?: any) {
    try {
      let response = await this.requestV2<T>(this.auth.login(), data, config);
      return response?.data;
    } catch (e: any) {
      throw e;
    }
  }

  async logout<T = any>(data: any, config?: any) {
    try {
      let response = await this.requestV2<T>(this.auth.logout(), data, config);
      return response?.data;
    } catch (e) {
      throw e;
    }
  }

  async refreshAccessToken<T = any>(data: any, config?: any) {
    try {
      let response = await this.requestV2<T>(this.auth.logout(), data, config);
      return response?.data;
    } catch (e) {
      throw e;
    }
  }

  async me<T = any>(data: any, config?: any) {
    try {
      let response = await this.requestV2<T>(this.auth.me(), data, config);
      return response?.data;
    } catch (e) {
      throw e;
    }
  }

  async department<T = any>(departmentId: number, data: any, config?: any) {
    try {
      let response = await this.requestV2<T>(
        this.auth.findDepartment(departmentId),
        data,
        config,
      );
      return response?.data;
    } catch (e: any) {
      throw e;
    }
  }

  async departmentIndex<T = any>(page: number, data?: any, config?: any) {
    try {
      let response = await this.requestV2<T>(
        this.auth.departmentIndex(page),
        data,
        config,
      );

      return response?.data;
    } catch (e: any) {
      throw e;
    }
  }

  async createDepartment<T = any>(data: any, config?: any) {
    try {
      let response = await this.requestV2<T>(
        this.auth.createDepartment(),
        data,
        config,
      );
      return response?.data;
    } catch (e: any) {
      throw e;
    }
  }

  async updateDepartment<T = any>(
    departmentId: number,
    data: any,
    config?: any,
  ) {
    try {
      let response = await this.requestV2<T>(
        this.auth.updateDepartment(departmentId),
        data,
        config,
      );
      return response?.data;
    } catch (e: any) {
      throw e;
    }
  }

  async departmentAll<T = any>(data?: any, config?: any) {
    try {
      let response = await this.requestV2<T>(
        this.auth.departmentAll(),
        data,
        config,
      );

      return response?.data;
    } catch (e: any) {
      throw e;
    }
  }

  async setActiveSession<T = any>(userId: number, data: any, config?: any) {
    try {
      let response = await this.requestV2<T>(
        this.user.setActiveUserSession(userId),
        data,
        config,
      );
      return response?.data;
    } catch (e: any) {
      throw e;
    }
  }
  async userIndex<T = any>(page: number, data?: any, config?: any) {
    try {
      let response = await this.requestV2<T>(
        this.user.index(page),
        data,
        config,
      );

      return response?.data;
    } catch (e: any) {
      throw e;
    }
  }

  async createUser<T = any>(data: any, config?: any) {
    try {
      const response = await this.requestV2<T>(
        this.user.create(),
        data,
        config,
      );

      return response?.data;
    } catch (e: any) {
      throw e;
    }
  }

  async updateUser<T = any>(userId: number, data: any, config?: any) {
    try {
      const response = await this.requestV2<T>(
        this.user.update(userId),
        data,
        config,
      );

      return response?.data;
    } catch (e: any) {
      throw e;
    }
  }

  async windowIndex<T = any>(page: number, data?: any, config?: any) {
    try {
      let response = await this.requestV2<T>(
        this.queueManager.windows(page),
        data,
        config,
      );

      return response?.data;
    } catch (e: any) {
      throw e;
    }
  }

  async windowAssignedTo<T = any>(userId: number, data?: any, config?: any) {
    try {
      const response = await this.requestV2<T>(
        this.queueManager["window-assigned-to"](userId),
        data,
        config,
      );

      return response?.data;
    } catch (e: any) {
      throw e;
    }
  }

  async createWindow<T = any>(data: any, config?: any) {
    try {
      const response = await this.requestV2<T>(
        this.queueManager["create-window"](),
        data,
        config,
      );

      return response?.data;
    } catch (e: any) {
      throw e;
    }
  }

  async updateWindow<T = any>(windowId: number, data: any, config?: any) {
    try {
      const response = await this.requestV2<T>(
        this.queueManager["update-window"](windowId),
        data,
        config,
      );

      return response?.data;
    } catch (e: any) {
      throw e;
    }
  }

  async assignWindow<T = any>(windowId: number, data: any, config?: any) {
    try {
      const response = await this.requestV2<T>(
        this.queueManager["assign-window"](windowId),
        data,
        config,
      );

      return response?.data;
    } catch (e: any) {
      throw e;
    }
  }

  async userAll<T = any>(data?: any, config?: any) {
    try {
      const response = await this.requestV2<T>(
        this.user["all"](),
        data,
        config,
      );

      return response?.data;
    } catch (e: any) {
      throw e;
    }
  }
}
