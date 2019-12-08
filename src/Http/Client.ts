import requestPromiseNative, { Options, RequestPromiseAPI, RequestPromiseOptions } from 'request-promise-native';
import IHttpClient from './IHttpClient';

export default class Client implements IHttpClient {
    public static readonly DEFAULT_UA =
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36';

    public readonly jar = requestPromiseNative.jar();
    public browserIdSuffix: string = 'NFBR';
    private readonly httpClient: RequestPromiseAPI;
    private _browserId: string | null = null;

    public constructor(options: RequestPromiseOptions = {}) {
        this.httpClient = requestPromiseNative.defaults({
            jar: this.jar,
            followRedirect: true,
            headers: {
                'User-Agent': Client.DEFAULT_UA,
                ...(options.headers || {}),
            },
            simple: false,
            timeout: 120000,
            ...options,
        });
    }

    public get browserId(): string {
        return this._browserId || this.generateBrowserId();
    }

    public set browserId(value: string) {
        this._browserId = value;
    }

    public async execute<T = any>(options: Options): Promise<T> {
        return this.httpClient(options).promise();
    }

    public getU1(): string {
        const u1 = this.jar
            .getCookieString('https://viewer.bookwalker.jp')
            .split('; ')
            .find((cookie: string) => cookie.startsWith('u1='));

        if (!u1) throw new Error('u1 cookie not found in jar');

        return u1.substr(3);
    }

    protected generateBrowserId(): string {
        // tslint:disable-next-line:insecure-random
        const id = Math.floor(1e8 * Math.random())
            .toString()
            .padStart(8, '0');

        return Date.now() + id + this.browserIdSuffix;
    }
}
