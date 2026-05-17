import { 
    useCallback, 
    useEffect, 
    useRef, 
    useState 
} from 'react';

export type FifoEvent<T = any> = T & {
    cb?: () => void | Promise<void>;
};

type UseFifoOptions = {
    delay?: number;
};

export default function useQueue <T = any>(
    options?: UseFifoOptions
) {

    const delay = options?.delay ?? 4000;

    const [queue, setQueue] = useState<FifoEvent<T>[]>([]);

    const processingRef = useRef(false);

    const enqueue = useCallback((item: FifoEvent<T>) => {
        setQueue((prev) => [...prev, item]);
    }, []);

    const dequeue = useCallback(() => {
        setQueue((prev) => prev.slice(1));
    }, []);

    const clear = useCallback(() => {
        setQueue([]);
    }, []);

    const processQueue = useCallback(async () => {

        if (processingRef.current) return;

        processingRef.current = true;

        try {

            while (queue.length > 0) {

                const currentEvent = queue[0];

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

    }, [queue, delay]);

    useEffect(() => {

        if (queue.length === 0) return;

        processQueue();

    }, [queue, processQueue]);

    return {
        queue,
        enqueue,
        dequeue,
        clear,
        isProcessing: processingRef.current,
        size: queue.length
    };
}