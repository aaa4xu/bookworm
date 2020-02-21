import { CanvasRenderingContext2D, createCanvas, Image as CanvasImage, loadImage } from 'canvas';
import { IConfigBookPageSize } from './Config';
import A9p, { IA9pItem, IA9pPage } from './exported/A9p';

export default class Image {
    private image = loadImage(this.sourceImage);
    private script = this.image.then(image => this.createScript(this.page, image.width, image.height));

    public constructor(
        private readonly sourceImage: Buffer | string,
        private readonly page: IA9pPage,
        private readonly size?: IConfigBookPageSize,
    ) {}

    public decode(): Promise<Buffer> {
        return this.process(false);
    }

    public encode(): Promise<Buffer> {
        return this.process(true);
    }

    private async process(encode = true) {
        const [image, script] = await Promise.all([this.image, this.script]);
        let canvas = createCanvas(image.width, image.height);
        let ctx = canvas.getContext('2d');
        if (encode) {
            this.executeEncodeByScript(image, script, ctx);
        } else {
            this.executeDecodeByScript(image, script, ctx);
        }

        // Crop result image
        if (this.size && (image.width !== this.size.Width || image.height !== this.size.Height)) {
            const decodedCanvas = canvas;
            canvas = createCanvas(this.size.Width, this.size.Height);
            ctx = canvas.getContext('2d');
            ctx.drawImage(
                decodedCanvas,
                0,
                0,
                this.size.Width,
                this.size.Height,
                0,
                0,
                this.size.Width,
                this.size.Height,
            );
        }

        return canvas.toBuffer('image/png');
    }

    private createScript(page: IA9pPage, width: number, height: number) {
        return A9p(page, width, height);
    }

    private executeDecodeByScript(image: CanvasImage, script: IA9pItem[], ctx: CanvasRenderingContext2D) {
        script.forEach(block => {
            ctx.drawImage(
                image,
                block.destX,
                block.destY,
                block.width,
                block.height,
                block.srcX,
                block.srcY,
                block.width,
                block.height,
            );
        });
    }

    private executeEncodeByScript(image: CanvasImage, script: IA9pItem[], ctx: CanvasRenderingContext2D) {
        script.forEach(block => {
            ctx.drawImage(
                image,
                block.srcX,
                block.srcY,
                block.width,
                block.height,
                block.destX,
                block.destY,
                block.width,
                block.height,
            );
        });
    }
}
