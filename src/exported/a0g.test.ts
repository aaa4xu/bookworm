import { expect } from 'chai';
import path from 'path';
import a0g from './a0g';
import { readJsonFile } from './index';

describe('exported.a0g', () => {
    it('should work', async () => {
        const testCase = await readJsonFile(path.join(__dirname, '__fixtures__', 'a0g-001.json'));

        expect(a0g(testCase.input[0], testCase.input[1])).be.deep.equal(testCase.output);
    });
});
