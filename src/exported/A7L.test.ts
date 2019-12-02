import path from 'path';
import A7L from './A7L';
import { createTA8jResult, isEqual, readJsonFile } from './index';
import processFilename from './processFilename';

describe('exported.A7L', () => {
    let example1: any;

    before(async () => {
        example1 = await readJsonFile(path.join(__dirname, '__fixtures__', 'example1.json'));
    });

    it('should work', () => {
        const filenameKey = processFilename(example1.filename);
        isEqual(A7L(filenameKey, createTA8jResult(example1.step3)), example1.step4);
    });
});
