import { TA8jResult } from './exported';
import A2F from './exported/A2F';
import A3b from './exported/A3b';
import A6e, { TA6eResult } from './exported/A6e';
import A6I from './exported/A6I';
import A7L from './exported/A7L';
import A8j from './exported/A8j';
import B0L from './exported/B0L';
import B0p from './exported/B0p';
import processFilename from './exported/processFilename';
import tB0l from './exported/tB0l';

const DATA_STR = '"data":"';

export default class Config {
    private readonly filenameKey: number[];
    private readonly dataOffset: number;
    private readonly dataEndOffset: number;

    constructor(private readonly content: string, filename = 'configuration_pack.json') {
        this.dataOffset = content.indexOf(DATA_STR) + DATA_STR.length;
        this.dataEndOffset = content.indexOf('"', this.dataOffset);
        if (this.dataEndOffset - this.dataOffset < 128) throw new Error();

        this.filenameKey = processFilename(filename);
    }

    public decode(): TA6eResult {
        const state = this.createScript(this.filenameKey).reduce(
            (stepState: TA8jResult, fn: TA8jResultProcessor) => fn(stepState),
            A8j(this.content, this.dataOffset, this.dataEndOffset),
        );

        const result = A6e(state);
        result[0] = JSON.parse(result[0]);
        return result;
    }

    private createScript(filenameKey: number[]): TA8jResultProcessor[] {
        return [
            A3b.bind(null, 0),
            B0p.bind(null, filenameKey),
            A7L.bind(null, filenameKey),
            A6I.bind(null, filenameKey),
            A2F,
            B0L.bind(null, filenameKey),
            A3b.bind(null, 1),
            A3b.bind(null, 2),
            A3b.bind(null, 3),
            tB0l.bind(null, filenameKey),
        ];
    }
}

type TA8jResultProcessor = (state: TA8jResult) => TA8jResult;
