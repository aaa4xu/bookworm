import path from 'path';
import { createTA8jResult, isEqual, readJsonFile } from './index';
import processFilename from './processFilename';
import tB0l from './tB0l';

describe('exported.B0l', () => {
    let example1: any;

    before(async () => {
        example1 = await readJsonFile(path.join(__dirname, '__fixtures__', 'example1.json'));
    });

    it('should work', () => {
        const filenameKey = processFilename(example1.filename);
        isEqual(tB0l(filenameKey, createTA8jResult(example1.step10)), example1.step11);
    });
});
