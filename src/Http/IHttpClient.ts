import { Options } from 'request-promise-native';

export default interface IHttpClient {
    browserId: string;

    execute<T = any>(options: Options): Promise<T>;
    getU1(): string;
}
