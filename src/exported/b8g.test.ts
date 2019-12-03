import { expect } from 'chai';
import path from 'path';
import b8g from './b8g';
import { readJsonFile } from './index';

describe('exported.b8g', () => {
    let config: any;
    before(async () => {
        config = await readJsonFile(path.join(__dirname, '..', '__fixtures__', 'configuration_pack-001-decoded.json'));
    });

    it('should generate corrent image filename 1', () => {
        const actual = b8g('OEBPS/text/p_0014.xhtml', config[4], config[5], config[6]);
        expect(actual).be.equal('OEBPS/text/p_0014.xhtml/10f69c413a67b3b482.jpeg');
    });

    it('should generate corrent image filename 2', () => {
        const actual = b8g('OEBPS/text/p_0015.xhtml', config[4], config[5], config[6]);
        expect(actual).be.equal('OEBPS/text/p_0015.xhtml/10fc724e76ba97c581.jpeg');
    });
});
