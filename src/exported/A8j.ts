import A8f from './A8f';
import { TA8jResult } from './index';

// tslint:no-shadowed-variable

export default (content: string, dataOffset: number, dataEndOffset: number): TA8jResult => {
    const arrayLength = 32;
    const keyDataLength = 128;

    const payloadOffset = dataOffset + keyDataLength,
        payloadLength = dataEndOffset - payloadOffset;

    if (payloadLength & 3) throw new Error();

    const v_4ii = new Array<number>(arrayLength),
        v_5ii = new Array<number>(arrayLength),
        v_6ii = new Array<number>(arrayLength);

    for (let i = dataOffset, activeArray = v_4ii, activeArrayIndex = 0; i < payloadOffset; ) {
        const a = content.charCodeAt(i++),
            b = content.charCodeAt(i++),
            c = content.charCodeAt(i++),
            d = content.charCodeAt(i++);

        if (!(A8f[6][a] && A8f[6][b] && A8f[6][c] && A8f[6][d])) throw new Error();

        activeArray[activeArrayIndex++] = A8f[1][a] | A8f[5][b];
        if (i === dataOffset + 88) {
            activeArray = v_6ii;
            activeArrayIndex = 0;
        }

        activeArray[activeArrayIndex++] = A8f[2][b] | A8f[4][c];
        if (i === dataOffset + 44) {
            activeArray = v_5ii;
            activeArrayIndex = 0;
        }

        activeArray[activeArrayIndex++] = A8f[3][c] | A8f[0][d];
    }

    if (payloadLength === 0) {
        return [new Uint8Array(0), 0, v_4ii, v_5ii, v_6ii];
    }

    let resultLength = (payloadLength * 3) >> 2;
    if (content.charCodeAt(dataEndOffset - 2) === 61) {
        resultLength -= 2;
    } else if (content.charCodeAt(dataEndOffset - 1) === 61) {
        resultLength -= 1;
    }

    const result = new Uint8Array(resultLength);

    let chuckOffset = payloadOffset,
        index = 0;

    for (; chuckOffset < dataEndOffset - 4; ) {
        const c1 = content.charCodeAt(chuckOffset++),
            c2 = content.charCodeAt(chuckOffset++),
            c3 = content.charCodeAt(chuckOffset++),
            c4 = content.charCodeAt(chuckOffset++);

        if (!(A8f[6][c1] && A8f[6][c2] && A8f[6][c3] && A8f[6][c4])) throw new Error();

        result[index++] = A8f[1][c1] | A8f[5][c2];
        result[index++] = A8f[2][c2] | A8f[4][c3];
        result[index++] = A8f[3][c3] | A8f[0][c4];
    }

    const v_uii = content.charCodeAt(chuckOffset++),
        v_vii = content.charCodeAt(chuckOffset++),
        v_wii = content.charCodeAt(chuckOffset++),
        v_xii = content.charCodeAt(chuckOffset++);

    if (!A8f[6][v_uii] || !A8f[6][v_vii]) throw new Error();

    result[index++] = A8f[1][v_uii] | A8f[5][v_vii];
    if (A8f[6][v_wii]) {
        result[index++] = A8f[2][v_vii] | A8f[4][v_wii];
        if (A8f[6][v_xii]) {
            result[index++] = A8f[3][v_wii] | A8f[0][v_xii];
        } else if (v_xii !== 61) {
            throw new Error();
        }
    } else if (v_wii !== 61 || v_xii !== 61) {
        throw new Error();
    }

    return [result, resultLength, v_4ii, v_5ii, v_6ii];
};
