import IHttpClient from './IHttpClient';

export default interface IHttpRequest<T = any> {
    execute(client: IHttpClient): Promise<T>;
}
