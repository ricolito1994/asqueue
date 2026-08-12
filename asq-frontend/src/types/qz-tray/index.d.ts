declare module "qz-tray" {
    interface QZConfigOptions {
        size?: {
            width: number;
            height: number;
        };
        units?: string;
        margins?: {
            top: number;
            right: number;
            bottom: number;
            left: number;
        };
    }

    const qz: {
        security: {
            setCertificatePromise(
                callback: () => Promise<string>
            ): void;

            setSignaturePromise(
                callback: (
                    toSign: string
                ) => (
                    resolve: (value: string) => void,
                    reject: (reason?: any) => void
                ) => void
            ): void;

            setSignatureAlgorithm(
                algorithm: "SHA1" | "SHA256" | "SHA512"
            ): void;
        };
        
        websocket: {
            connect(): Promise<void>;
            disconnect(): Promise<void>;
            isActive(): boolean;
        };

        printers: {
            find(name?: string): Promise<any>;
            details(): Promise<any>;
        };

        configs: {
            create(printer: string, options?: QZConfigOptions): any;
        };

        print(config: any, data: any[]): Promise<void>;
    };

    export default qz;
}