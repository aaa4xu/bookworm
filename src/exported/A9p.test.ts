import { expect } from 'chai';
import path from 'path';
import A9p from './A9p';
import { readJsonFile } from './index';

describe('exported.A9p', () => {
    it('should work', async () => {
        const testCase = await readJsonFile(path.join(__dirname, '__fixtures__', 'A9p-001.json'));
        const actual = A9p(testCase.input[0], testCase.input[1], testCase.input[2]);
        expect(actual).be.deep.equal(testCase.output);
    });
});
