import { expect } from 'chai';
import { promises as fs } from 'fs';
import path from 'path';
import Image from './Image';

// tslint:disable:non-literal-fs-path
// tslint:disable:mocha-no-side-effect-code

describe('Image', () => {
    it(`should correct encode image`, async () => {
        const image = new Image(path.join(__dirname, '__fixtures__', 'image-001-decoded.png'), {
            B0A: 414,
            B0J: 1946715582,
            B0K: 3306745463,
            B0n: 3416958222,
            b6V: 32,
            b8A: 32,
        });

        expect(await image.encode()).be.deep.equal(
            await fs.readFile(path.join(__dirname, '__fixtures__', 'image-001-encoded.png')),
        );
    });

    it(`should correct decode image`, async () => {
        const image = new Image(path.join(__dirname, '__fixtures__', 'image-001-encoded.png'), {
            B0A: 414,
            B0J: 1946715582,
            B0K: 3306745463,
            B0n: 3416958222,
            b6V: 32,
            b8A: 32,
        });

        expect(await image.decode()).be.deep.equal(
            await fs.readFile(path.join(__dirname, '__fixtures__', 'image-001-decoded.png')),
        );
    });
});
