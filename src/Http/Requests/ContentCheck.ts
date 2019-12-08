import IContentCheckResponse from '../IContentCheckResponse';
import IHttpClient from '../IHttpClient';
import IHttpRequest from '../IHttpRequest';

export default class ContentCheck implements IHttpRequest<IContentCheckResponse> {
    public constructor(private readonly contentId: string) {}

    public execute(client: IHttpClient): Promise<IContentCheckResponse> {
        return client.execute({
            // config.SERVER_DOMAIN + config.WEBAPI_CONTENT_CHECK
            url: 'https://viewer.bookwalker.jp/browserWebApi/c',
            qs: {
                cid: this.contentId,
                u1: client.getU1(),
                BID: client.browserId,
            },
            headers: {
                Referer: `https://viewer.bookwalker.jp/03/9/viewer.html?cid=${this.contentId}&cty=1`,
            },
            json: true,
        });
    }
}
