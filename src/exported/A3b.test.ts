import path from 'path';
import A3b from './A3b';
import { createTA8jResult, isEqual, readJsonFile } from './index';

describe('exported.A3b', () => {
    let example1: any;

    before(async () => {
        example1 = await readJsonFile(path.join(__dirname, '__fixtures__', 'example1.json'));
    });

    it('should work with v_ofi=0', () => {
        isEqual(A3b(0, createTA8jResult(example1.step1)), example1.step2);
    });

    it('should work with v_ofi=1', () => {
        isEqual(A3b(1, createTA8jResult(example1.step7)), example1.step8);
    });

    it('should work with v_ofi=2', () => {
        isEqual(A3b(2, createTA8jResult(example1.step8)), example1.step9);
    });

    it('should work with v_ofi=3', () => {
        isEqual(A3b(3, createTA8jResult(example1.step9)), example1.step10);
    });
});
