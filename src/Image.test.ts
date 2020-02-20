import { expect } from 'chai';
import { promises as fs } from 'fs';
import path from 'path';
import Image from './Image';
import sfs from 'fs';
import { KeyObject } from 'crypto';
import { loadImage } from 'canvas';

const ifFixtureExists = (path: string) => {
    try {
        sfs.statSync(path);
        return { it };
    } catch(err) {
        return { it: it.skip };
    }
}

const NOT_EVEN_IMAGE = path.join(__dirname, '__fixtures__', 'non-even-image.json');

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

    ifFixtureExists(NOT_EVEN_IMAGE).it('should crop not even image', async () => {
        const imageConfig = JSON.parse(await fs.readFile(NOT_EVEN_IMAGE, 'utf8'));
        const imageBuffer = Buffer.from(imageConfig.sourceImage);
        const image = new Image(imageBuffer, imageConfig.page);
        const decodedImage = await image.decode();
        const imageInfo = await loadImage(decodedImage);
        expect(imageInfo.width).be.equal(1801);
    });
});
