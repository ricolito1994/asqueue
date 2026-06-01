import React, { 
    useCallback, 
    useEffect, 
    useRef, 
    useState 
} from 'react';

export type FifoEvent<T = any> = T & {
    cb?: () => void | Promise<void>;
};

type QueueOptions = {
    delay?: number,
    maxRetries?: number
}

type UseFifoOptions <T> = {
    options? : T
};

const useQueue =  <T=any> ({options} : UseFifoOptions<QueueOptions>)  => {

    const delay = options?.delay ?? 4000;

    const maxRetries = options?.maxRetries ?? 2;

    const queueEvent = useRef<FifoEvent<T>[]>([]);

    const processingRef = useRef(false);

    const processQueue = useCallback(async () => {

        if (processingRef.current || queueEvent.current.length === 0) return;

        processingRef.current = true;

        try {
            while (queueEvent.current.length > 0) {

                const currentEvent = queueEvent.current.shift()

                if (! currentEvent?.cb) continue;
                
                let retry = 0;

                while (retry <= maxRetries) {
                    try {
                        await currentEvent?.cb?.();
                        break;
                    } catch (e) {
                        retry++;
                        
                        if (retry == maxRetries) {
                            console.error (`Reached ${maxRetries} retries operation failed: ${e}`)
                        }

                        const backOff = delay * Math.pow(2, retry)

                        await sleep(backOff)
                    }
                }
                await sleep(delay)
            }
        } finally {
            processingRef.current = false;
        }

    }, [delay]);

    const sleep = useCallback((ms: number) => {
        return new Promise<void>((resolve) => {
            setTimeout(resolve, ms)
        });
    }, [])

    const enqueue = useCallback((item: FifoEvent<T>) => {
        queueEvent.current.push(item)
        processQueue()
    }, [processQueue]);

    const dequeue = useCallback(() => {
        queueEvent.current.shift()
    }, []);

    const clear = useCallback(() => {
        queueEvent.current = [];
    }, []);

    return {
        queue: queueEvent.current,
        enqueue,
        dequeue,
        clear,
        isProcessing: processingRef.current,
        size: queueEvent.current.length
    };
}

export default useQueue;