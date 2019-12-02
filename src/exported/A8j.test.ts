import path from 'path';
import A8j from './A8j';
import { isEqual, readJsonFile } from './index';

describe('exported.A8j', () => {
    let example1: any;

    before(async () => {
        example1 = await readJsonFile(path.join(__dirname, '__fixtures__', 'example1.json'));
    });

    it('should work', () => {
        const result = A8j(example1.content, 25, 195789);

        isEqual(result, example1.step1);
    });
});
