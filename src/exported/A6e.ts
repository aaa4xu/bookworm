import { TA8jResult } from './index';

export default ([content, contentLength, key1, key2, key3]: TA8jResult): TA6eResult => {
    const decodedContent: number[] = [];

    for (let contentOffset = 0; contentOffset < contentLength; ) {
        const char = content[contentOffset++];

        if (char < 128) {
            decodedContent.push(char);
            continue;
        }

        const v_zgi = content[contentOffset];
        if (
            contentOffset >= contentLength ||
            char < 194 ||
            char > 244 ||
            !isPassCheck1(v_zgi) ||
            (char === 224 && v_zgi < 160) ||
            (char === 237 && v_zgi >= 160) ||
            (char === 240 && v_zgi < 144) ||
            (char === 244 && v_zgi >= 144)
        ) {
            decodedContent.push(65533);
            continue;
        }

        contentOffset++;
        if (char < 224) {
            decodedContent.push((v_zgi & 63) | ((char & 31) << 6));
            continue;
        }

        const v_0hi = content[contentOffset];
        if (contentOffset >= contentLength || !isPassCheck1(v_0hi)) {
            decodedContent.push(65533);
            continue;
        }

        contentOffset++;
        if (char < 240) {
            decodedContent.push((v_0hi & 63) | ((v_zgi & 63) << 6) | ((char & 15) << 12));
            continue;
        }

        const v_1hi = content[contentOffset];
        if (contentOffset >= contentLength || !isPassCheck1(v_1hi)) {
            decodedContent.push(65533);
            continue;
        }

        contentOffset++;
        const v_2hi = ((v_0hi & 48) >> 4) | ((v_zgi & 63) << 2) | ((char & 7) << 8);
        const v_3hi = (v_1hi & 63) | ((v_0hi & 15) << 6);
        decodedContent.push(55232 + v_2hi);
        decodedContent.push(56320 + v_3hi);
    }

    return [
        decodedContent.map(v => String.fromCharCode(v)).join(''),
        keyToStr(key1),
        keyToStr(key2),
        keyToStr(key3),
        key1,
        key2,
        key3,
    ];
};

export function keyToStr(key: number[]): string {
    const v_khi = new Array(64);

    for (let i = 0, offset = 0; i < 32; i++) {
        v_khi[offset++] = keyToStrProcessValue(key[i] >>> 4);
        v_khi[offset++] = keyToStrProcessValue(key[i] & 15);
    }

    return String.fromCharCode(...v_khi);
}

function keyToStrProcessValue(v_ihi: number) {
    return (v_ihi < 10 ? 48 : 87) + v_ihi;
}

const isPassCheck1 = (v_0hi: number) => (v_0hi & 192) === 128;

export type TA6eResult = [string, string, string, string, number[], number[], number[]];
