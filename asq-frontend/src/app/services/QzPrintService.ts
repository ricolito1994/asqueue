import qz from "qz-tray";
class QZPrintService {

    constructor () {
        /*qz.security.setSignatureAlgorithm("SHA512");
        qz.security.setSignaturePromise((toSign: string) => {
            return (resolve:any, reject:any) => {
                fetch(`${import.meta.env.VITE_APP_BASE_URL}/qz/sign`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        request: toSign
                    })
                })
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`HTTP ${res.status}`);
                    }

                    return res.text();
                })
                .then(signature => {
                    //console.log("Signature:", signature);
                    resolve(signature);
                })
                .catch(err => {
                    //console.error("Signing failed:", err);
                    reject(err);
                });

            };
            
        });
        qz.security.setCertificatePromise(() => {
            return fetch(`${import.meta.env.VITE_APP_BASE_URL}/qz/certificate`)
                .then(res => res.text())
                .then(cert => {
                    //console.log("CERT LENGTH:", cert.length);
                    //console.log(cert.substring(0, 30));
                    return cert;
                });
        });*/
    }

    async connect() {
        if (!qz.websocket.isActive()) {
            await qz.websocket.connect();
        }
    }

    async disconnect() {
        if (qz.websocket.isActive()) {
            await qz.websocket.disconnect();
        }
    }

    async printQueue(
        printerName: any, 
        queueNumber: any, 
        company: any, 
        dept: any,
        window: any,
        service: any,
    ) {
        //await this.connect();
        //await this.connectPromise;
        const config = qz.configs.create(printerName);

        const now = new Date();

        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString();

        const data = [
            "\x1B\x40",          // Initialize

            "\x1B\x61\x01",      // Center

             "\x1B\x61\x01",      // Center
            company+"\n",
            "QUEUE TICKET\n\n",

            "\x1B\x61\x00",      // Left
            "Service    : "+service+"\n",
            "Department : "+dept+"\n",
            "Window     : "+window+"\n\n",

            "\x1D\x21\x11",      // Quad size
            queueNumber + "\n\n",

            "\x1B\x21\x00",      // Normal
            "Please wait\n",
            "for your turn\n\n",

            "Date: " + date + "\n",
            "Time: " + time + "\n",

            "\n\n\n",

            "\x1D\x56\x00"       // Cut paper (if supported)
        ];
        await qz.print(config, data);
    }
}

export default QZPrintService;