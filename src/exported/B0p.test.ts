import path from 'path';
import B0p from './B0p';
import { createTA8jResult, isEqual, readJsonFile } from './index';
import processFilename from './processFilename';

describe('exported.B0p', () => {
    let example1: any;

    before(async () => {
        example1 = await readJsonFile(path.join(__dirname, '__fixtures__', 'example1.json'));
    });

    it('should work', () => {
        const filenameKey = processFilename(example1.filename);
        isEqual(B0p(filenameKey, createTA8jResult(example1.step2)), example1.step3);
    });
});
