import { TA8jResult, v_qmi } from './index';
import { step } from './processContentStep';

export default function(filenameKey: number[], [content, contentLength, key1, key2, key3]: TA8jResult): TA8jResult {
    const key = v_qmi(key3, key2, filenameKey);

    for (let i = 0, v_7ki = 0, v_8ki = 0; i < contentLength; i++) {
        [v_7ki, v_8ki] = step(v_7ki, v_8ki, i, key, content);
    }

    return [content, contentLength, key1, key2, key3];
}
