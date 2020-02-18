import { Options } from 'request-promise-native';
import HttpException from './Exceptions/HttpException';
import IHttpClient from './IHttpClient';

const sleep = (d: number) => new Promise(r => setTimeout(r, d));

export default class ClientWithRetries implements IHttpClient {
    public constructor(private readonly httpClient: IHttpClient, private readonly options: IClientWithRetriesOptions) {}

    public get browserId() {
        return this.httpClient.browserId;
    }

    public async execute<T = any>(options: Options): Promise<T> {
        for (let i = 0; ; i++) {
            try {
                return this.httpClient.execute<T>(options);
            } catch (err) {
                if (err instanceof HttpException && i + 1 < this.options.max) {
                    await sleep(this.options.delay);
                    continue;
                }

                throw err;
            }
        }
    }

    public getU1(): string {
        return this.httpClient.getU1();
    }
}

export interface IClientWithRetriesOptions {
    max: number;
    delay: number;
}
