import { expect } from 'chai';
import path from 'path';
import A6e from './A6e';
import { createTA8jResult, readJsonFile } from './index';

describe('exported.A6e', () => {
    let example1: any;

    before(async () => {
        example1 = await readJsonFile(path.join(__dirname, '__fixtures__', 'example1.json'));
    });

    it('should work', () => {
        const actual = A6e(createTA8jResult(example1.step11));

        expect(actual[0]).be.equal(example1.step12[0]);
        expect(actual[1]).be.equal(example1.step12[1]);
        expect(actual[2]).be.equal(example1.step12[2]);
        expect(actual[3]).be.equal(example1.step12[3]);

        expect(actual[4]).be.deep.equal(example1.step12[4]);
        expect(actual[5]).be.deep.equal(example1.step12[5]);
        expect(actual[6]).be.deep.equal(example1.step12[6]);
    });
});
