import arraySwap from '../arraySwap';
import { TA8jResult } from './index';

export default ([content, contentLength, key1, key2, key3]: TA8jResult, key: number[], i: number): TA8jResult => {
    for (let v_7ki = 0, v_8ki = 0; i >= 0; i -= 2) {
        [v_7ki, v_8ki] = step(v_7ki, v_8ki, i, key, content);
    }

    return [content, contentLength, key1, key2, key3];
};

export function step(v_7ki: number, v_8ki: number, i: number, key: number[], content: TA8jResult[0]) {
    v_7ki = (v_7ki + 1) % 256;
    v_8ki = (v_8ki + key[v_7ki]) % 256;
    arraySwap(key, v_7ki, v_8ki);
    content[i] ^= key[(key[v_7ki] + key[v_8ki]) % 256];
    return [v_7ki, v_8ki];
}
