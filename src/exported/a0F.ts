import arraySwap from '../arraySwap';

type TInputGetter = (index: number) => number;

// a0F && a0FBin
export default (input: ReadonlyArray<number> | string): number[] => {
    const result = new Array(256).fill(0).map((_, index) => index);

    const getFromInput: TInputGetter = typeof input === 'string' ? input.charCodeAt.bind(input) : index => input[index];

    for (let c = 0, i = 0; i < 256; i++) {
        const index = i % input.length;

        c = (c + result[i] + getFromInput(index)) % 256;
        arraySwap(result, i, c);
    }

    return result;
};
