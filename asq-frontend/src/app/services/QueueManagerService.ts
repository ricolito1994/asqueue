import { AbstractApiService } from '@services/AbstractApiService'
import { QUEUE_MANAGER } from '@constants/api'

export class QueueManagerService extends AbstractApiService {
  protected queueManager: any;

  public constructor(
    accessToken: string | undefined | null,
    baseURL?: string | undefined | null,
    refreshToken?: string | undefined | null,
    onAuthTokenUpdate?: (data: any) => void,
  ) {
    super(accessToken, baseURL, refreshToken, onAuthTokenUpdate);
    this.queueManager = QUEUE_MANAGER;
  }

  async indexTransactions<T = any>(page: number, data: any, config?: any) {
    try {
      let response = await this.requestV2<T>(
        this.queueManager.index(page),
        data,
        config,
      );
      return response?.data;
    } catch (e: any) {
      throw e;
    }
  }

  async concerns<T = any>(page: number, data: any, config?: any) {
    try {
      let response = await this.requestV2<T>(
        this.queueManager.concerns(page),
        data,
        config,
      );
      return response?.data;
    } catch (e: any) {
      throw e;
    }
  }

  async adminConcerns<T = any>(page: number, data?: any, config?: any) {
    try {
      let response = await this.requestV2<T>(
        this.queueManager["admin-concerns"](page),
        data,
        config,
      );
      return response?.data;
    } catch (e: any) {
      throw e;
    }
  }

  async updateConcern<T = any>(concernId: number, data: any, config?: any) {
    try {
      let response = await this.requestV2<T>(
        this.queueManager["update-concern"](concernId),
        data,
        config,
      );

      return response?.data;
    } catch (e: any) {
      throw e;
    }
  }

  async createConcern<T = any>(
    data: {
      name: string;
      description: string;
      department_id: number;
    },
    config?: any,
  ) {
    try {
      let response = await this.requestV2<T>(
        this.queueManager["create-concern"](),
        data,
        config,
      );

      return response?.data;
    } catch (e: any) {
      throw e;
    }
  }

  async deleteConcern<T = any>(concernId: number, config?: any) {
    try {
      let response = await this.requestV2<T>(
        this.queueManager["delete-concern"](concernId),
        null,
        config,
      );

      return response?.data;
    } catch (e: any) {
      throw e;
    }
  }

  async assignConcernWindows<T = any>(
    concernId: number,
    data: {
      window_ids: number[];
    },
    config?: any,
  ) {
    try {
      let response = await this.requestV2<T>(
        this.queueManager["assign-concern-windows"](concernId),
        data,
        config,
      );

      return response?.data;
    } catch (e: any) {
      throw e;
    }
  }

  async windows<T = any>(page: number, data: any, config?: any) {
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

  async findWindowByAssignedTo<T = any>(
    userId: number,
    data: any,
    config?: any,
  ) {
    try {
      let response = await this.requestV2<T>(
        this.queueManager["window-assigned-to"](userId),
        data,
        config,
      );
      return response?.data;
    } catch (e: any) {
      throw e;
    }
  }

  async createQueue<T = any>(data: any, config?: any) {
    try {
      let response = await this.requestV2<T>(
        this.queueManager.create(),
        data,
        config,
      );
      return response?.data;
    } catch (e: any) {
      throw e;
    }
  }

  async processQueueNumber<T = any>(data: any, config?: any) {
    try {
      let response = await this.requestV2<T>(
        this.queueManager["process-queue-number"](),
        data,
        config,
      );
      return response?.data;
    } catch (e: any) {
      throw e;
    }
  }

  async recallQueueNumber<T = any>(
    queueNumber: number,
    data: any,
    config?: any,
  ) {
    try {
      let response = await this.requestV2<T>(
        this.queueManager["recall-queue-number"](queueNumber),
        data,
        config,
      );
      return response?.data;
    } catch (e: any) {
      throw e;
    }
  }
}
