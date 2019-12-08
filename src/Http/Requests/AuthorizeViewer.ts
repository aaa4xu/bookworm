import IHttpClient from '../IHttpClient';
import IHttpRequest from '../IHttpRequest';

export default class AuthorizeViewer implements IHttpRequest<void> {
    public static readonly READER_TYPE = 'BROWSER_VIEWER';
    public static readonly REFERER = 'https://global.bookwalker.jp/holdBooks/';

    public constructor(private readonly contentId: string) {}

    public execute(client: IHttpClient): Promise<void> {
        return client.execute({
            url: 'https://member.bookwalker.jp/app/03/webstore/cooperation',
            qs: {
                r: [AuthorizeViewer.READER_TYPE, this.contentId, encodeURIComponent(AuthorizeViewer.REFERER)].join('/'),
            },
            headers: {
                Referer: AuthorizeViewer.REFERER,
            },
        });
    }
}
