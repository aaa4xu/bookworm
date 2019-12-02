import { expect } from 'chai';
import path from 'path';
import a0F from './a0F';
import { readJsonFile } from './index';

describe('exported.a0F', () => {
    it('should correct work with array', async () => {
        const testCase = await readJsonFile(path.join(__dirname, '__fixtures__', 'a0F-001.json'));
        expect(a0F(testCase.input)).be.deep.equal(testCase.output);
    });

    it('should correct work with string', async () => {
        const testCase = await readJsonFile(path.join(__dirname, '__fixtures__', 'a0F-001.json'));
        expect(a0F(testCase.input)).be.deep.equal(testCase.output);
    });
});
