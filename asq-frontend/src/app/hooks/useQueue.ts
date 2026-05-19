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
    delay?: number
}

type UseFifoOptions <T> = {
    options? : T
};

const useQueue =  <T=any> ({options} : UseFifoOptions<QueueOptions>)  => {

    const delay = options?.delay ?? 4000;

    const queueEvent = useRef<FifoEvent<T>[]>([]);

    const processingRef = useRef(false);

    const processQueue = useCallback(async () => {

        if (processingRef.current || queueEvent.current.length === 0) return;

        processingRef.current = true;

        try {
            while (queueEvent.current.length > 0) {
                const currentEvent = queueEvent.current[0];

                await currentEvent.cb?.();

                await new Promise((resolve) =>
                    setTimeout(resolve, delay)
                );

                dequeue();

                await new Promise((resolve) =>
                    setTimeout(resolve, 0)
                );
            }
        } catch (e: any) {
            console.error(e)
        } finally {
            processingRef.current = false;
        }

    }, [delay]);

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