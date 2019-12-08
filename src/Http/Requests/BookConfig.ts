import IContentAuth from '../IContentAuth';
import IHttpClient from '../IHttpClient';
import IHttpRequest from '../IHttpRequest';

export default class BookConfig implements IHttpRequest<string> {
    public static readonly FILENAME = 'configuration_pack.json';

    public constructor(private readonly baseUrl: string, private readonly auth: IContentAuth) {}

    public execute(client: IHttpClient): Promise<string> {
        return client.execute({
            url: `${this.baseUrl}${BookConfig.FILENAME}`,
            qs: this.auth,
        });
    }
}
