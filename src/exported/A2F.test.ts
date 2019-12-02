import path from 'path';
import A2F from './A2F';
import { createTA8jResult, isEqual, readJsonFile } from './index';

describe('exported.A2F', () => {
    let example1: any;

    before(async () => {
        example1 = await readJsonFile(path.join(__dirname, '__fixtures__', 'example1.json'));
    });

    it('should work', () => {
        isEqual(A2F(createTA8jResult(example1.step5)), example1.step6);
    });
});
