import IHttpClient from '../IHttpClient';
import IHttpRequest from '../IHttpRequest';

export default class StartSession implements IHttpRequest<void> {
    public execute(client: IHttpClient): Promise<void> {
        return client.execute({ url: 'https://member.bookwalker.jp/app/03/login' });
    }
}
