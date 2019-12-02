import arraySwap from '../arraySwap';
import a0F from './a0F';

export default (key: ReadonlyArray<number>, b: ReadonlyArray<number>) => {
    const result: number[] = [];
    const g = a0F(b);

    for (let i = 0, c = 0, d = 0; i < key.length; i++) {
        c = (c + 1) % 256;
        d = (d + g[c]) % 256;

        arraySwap(g, c, d);

        const e = (g[c] + g[d]) % 256;
        result.push(key[i] ^ g[e]);
    }

    return result;
};
