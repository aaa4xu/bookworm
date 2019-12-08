import { expect } from 'chai';
import path from 'path';
import { readJsonFile } from './exported';
import Page from './Page';

describe('Page', () => {
    it('should create book object from data', async () => {
        const bc = await readJsonFile(path.join(__dirname, '__fixtures__', 'configuration_pack-001-decoded.json'));
        const pageId = 'OEBPS/text/p_0014.xhtml';
        const page = new Page(
            0,
            pageId,
            bc[0][pageId],
            {} as any,
            bc[4],
            bc[5],
            bc[6],
            'https://bw-bv-epubs.bookwalker.jp/3_product/3538a5d6-7dee-460f-9280-9e238d65b8ac/1/421659/',
        );

        expect(page.pageId).be.equal(pageId);
        expect(page.B0J).be.equal(2324693618);
        expect(page.B0K).be.equal(1661678956);
        expect(page.B0n).be.equal(4156093230);
        expect(page.B0A).be.equal(475);
    });
});
