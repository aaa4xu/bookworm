import { expect } from 'chai';
import path from 'path';
import { readJsonFile } from './index';
import processFilename from './processFilename';

describe('exported.processFilename', () => {
    let example1: any;

    before(async () => {
        example1 = await readJsonFile(path.join(__dirname, '__fixtures__', 'example1.json'));
    });

    it('should work', () => {
        expect(processFilename('configuration_pack.json')).be.deep.equal([
            99,
            111,
            110,
            102,
            105,
            103,
            117,
            114,
            97,
            116,
            105,
            111,
            110,
            95,
            112,
            97,
            99,
            107,
            46,
            106,
            115,
            111,
            110,
        ]);
    });
});
