import path from 'path';
import A6I from './A6I';
import { createTA8jResult, isEqual, readJsonFile } from './index';
import processFilename from './processFilename';

describe('exported.A6I', () => {
    let example1: any;

    before(async () => {
        example1 = await readJsonFile(path.join(__dirname, '__fixtures__', 'example1.json'));
    });

    it('should work', () => {
        const filenameKey = processFilename(example1.filename);
        isEqual(A6I(filenameKey, createTA8jResult(example1.step4)), example1.step5);
    });
});
