import { IConfigBookPage } from './Config';
import { IA9pPage } from './exported/A9p';
import B2y from './exported/B2y';
import b8g from './exported/b8g';
import { ForbiddenHttpException } from './Http/Exceptions/ForbiddenHttpException';
import { Non2xxHttpException } from './Http/Exceptions/Non2xxHttpException';
import IContentAuth from './Http/IContentAuth';
import IHttpClient from './Http/IHttpClient';
import Image from './Image';

export default class Page implements IA9pPage {
    public readonly B0A: number;
    public readonly B0J: number;
    public readonly B0K: number;
    public readonly B0n: number;
    public readonly b6V: number;
    public readonly b8A: number;

    public constructor(
        public readonly index: number,
        public readonly pageId: string,
        private readonly config: IConfigBookPage,
        private readonly httpClient: IHttpClient,
        private readonly key1: number[],
        private readonly key2: number[],
        private readonly key3: number[],
        private readonly baseUrl: string,
    ) {
        const v_6if = this.pageConfig.NS,
            v_7if = this.pageConfig.PS,
            v_8if = this.pageConfig.RS;

        let v_0if = 47;
        for (let i = 0; i < this.pageId.length; i++) {
            v_0if += this.pageId.charCodeAt(i);
        }

        const fileName = this.pageConfig.No.toString(10);
        for (let i = 0; i < fileName.length; i++) {
            v_0if += fileName.charCodeAt(i);
        }

        v_0if += keySum(this.key1, this.key2, this.key3);

        let v_9if = v_0if & 255;
        v_9if |= v_9if << 8;
        v_9if |= v_9if << 16;

        this.B0A = v_0if % B2y.b4v;
        this.B0J = (v_9if ^ v_mhf(key1) ^ v_6if) >>> 0;
        this.B0K = (v_9if ^ v_mhf(key2) ^ v_7if) >>> 0;
        this.B0n = (v_9if ^ v_mhf(key3) ^ v_8if) >>> 0;
        this.b8A = this.pageConfig.BlockWidth;
        this.b6V = this.pageConfig.BlockHeight;
    }

    private get pageConfig() {
        return this.config.FileLinkInfo.PageLinkInfoList[0].Page;
    }

    public async image(auth: IContentAuth): Promise<Buffer> {
        const pageImageUrl = b8g(this.pageId, this.key1, this.key2, this.key3);

        const requestOptions = {
            url: this.baseUrl + pageImageUrl,
            qs: auth,
            encoding: null,
            resolveWithFullResponse: true,
        };
        const response = await this.httpClient.execute(requestOptions);

        if (response.statusCode === 403) {
            throw new ForbiddenHttpException(requestOptions, response);
        } else if (response.statusCode < 200 || response.statusCode >= 300) {
            throw new Non2xxHttpException(requestOptions, response);
        }

        return new Image(response.body, this, this.pageConfig.Size).decode();
    }
}

function keySum(key1: number[], key2: number[], key3: number[]) {
    return arraySum(key1) + arraySum(key2) + arraySum(key3);
}

function arraySum(key: number[], initValue = 0) {
    return key.reduce((acc, n) => acc + n, initValue);
}

function v_mhf($L_I_: number[]) {
    let v_nhf = 0,
        v_ohf = $L_I_.length & -4;

    v_ohf > 32 && (v_ohf = 32);

    for (let v_phf = 0; v_phf < v_ohf; ) {
        v_nhf ^= $L_I_[v_phf++] << 24;
        v_nhf ^= $L_I_[v_phf++] << 16;
        v_nhf ^= $L_I_[v_phf++] << 8;
        v_nhf ^= $L_I_[v_phf++] << 0;
    }

    return v_nhf >>> 0;
}
