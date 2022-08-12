export declare const BRAND: string;
declare type optionsInit = {
    welcomeScreen: true;
    license: string;
    decryptUrl?: string;
    retries?: number;
    connectTest?: number;
    logQr: true;
};
export declare class create {
    constructor(session?: string, options?: optionsInit, qrcode?: (base64Image: any, asciiQR: any, urlCode: any) => void, statusFind?: (...args: any[]) => void, client?: any);
}
export {};
