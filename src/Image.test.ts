import { loadImage } from 'canvas';
import { expect } from 'chai';
import { promises as fs } from 'fs';
import sfs from 'fs';
import path from 'path';
import Image from './Image';

const ifFixtureExists = (filepath: string) => {
    try {
        sfs.statSync(filepath);
        return { it };
    } catch (err) {
        return { it: it.skip };
    }
};

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

    ifFixtureExists(path.join(__dirname, '__fixtures__', 'non-even-image.json')).it(
        'should crop not even image',
        async () => {
            const imageConfig = JSON.parse(
                await fs.readFile(path.join(__dirname, '__fixtures__', 'non-even-image.json'), 'utf8'),
            );
            const imageBuffer = Buffer.from(imageConfig.sourceImage);
            const image = new Image(imageBuffer, imageConfig.page, {
                X: 0,
                Y: 0,
                Height: 2560,
                Width: 1801,
            });
            const decodedImage = await image.decode();
            const imageInfo = await loadImage(decodedImage);
            expect(imageInfo.width).be.equal(1801);
        },
    );
});
