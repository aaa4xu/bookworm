import arraySwap from '../arraySwap';
import { TA8jResult } from './index';

// tslint:disable-next-line:max-func-body-length
export default (v_ofi: number, [content, contentLength, key1, key2, key3]: TA8jResult): TA8jResult => {
    let v_jki: number[] | Uint8Array = [],
        v_kki: number = 0,
        v_lki: number[] = [],
        v_mki: number[] = [],
        v_nki: number[] | null = [],
        v_oki: number = 0;

    switch (v_ofi) {
        case 3:
            v_jki = key1;
            v_kki = 32;
            v_oki = 32;
            v_lki = key2;
            v_mki = key3;
            v_nki = null;
            break;
        case 2:
            v_jki = key2;
            v_kki = 32;
            v_oki = 32;
            v_lki = key1;
            v_mki = key3;
            v_nki = null;
            break;
        case 1:
            v_jki = key3;
            v_kki = 32;
            v_oki = 32;
            v_lki = key1;
            v_mki = key2;
            v_nki = null;
            break;
        case 0:
            v_jki = content;
            v_kki = contentLength;
            v_oki = 65536;
            v_lki = key1;
            v_mki = key2;
            v_nki = key3;
            break;
    }

    let [v_0li, v_1li] = process1(0, 0, v_lki);
    [v_0li, v_1li] = process1(v_0li, v_1li, v_mki);
    if (v_nki) [v_0li, v_1li] = process1(v_0li, v_1li, v_nki);

    const v_0liFlag2 = !check1(v_0li, 2),
        v_0liFlag4 = !check1(v_0li, 4),
        v_0liFlag8 = !check1(v_0li, 8),
        v_5li = v_1li >>> 5,
        v_6li = 8 - v_5li;
    let v_7li = 0;

    const v_gli: number[] = [];

    for (let v_pli = v_7li + 32, v_qli, v_rli, v_sli, v_tli, v_uli, v_wli, v_xli, v_zli; v_7li < v_kki; ) {
        for (
            v_pli = v_7li + 32,
                v_qli = v_pli > v_kki,
                v_qli ? ((v_pli = v_kki), (v_rli = v_pli - v_7li)) : (v_rli = 32),
                v_wli = v_0li,
                v_xli = v_1li,
                v_tli = 0,
                v_uli = v_7li;
            v_tli < v_rli;

        ) {
            v_sli = v_jki[v_uli++];
            if (v_0liFlag2) v_sli = ((v_sli & 85) << 1) | ((v_sli >>> 1) & 85);
            if (v_0liFlag4) v_sli = ((v_sli & 51) << 2) | ((v_sli >>> 2) & 51);
            if (v_0liFlag8) v_sli = ((v_sli & 15) << 4) | ((v_sli >>> 4) & 15);
            v_gli[v_tli++] = v_sli;
            v_wli = (v_wli + v_sli) & 255;
            v_xli ^= v_sli;
        }

        for (let j = 0; j < v_rli; j++) {
            for (let i = 1; i <= 6; i++) {
                const a = Math.pow(2, i);

                if (!check1(j, a - 1)) break;
                if (!check1(v_wli, a)) process2(j - Math.pow(2, i - 1), j, v_gli);
            }
        }

        v_zli = v_xli >>> 3;
        v_qli ? (v_zli %= v_rli) : (v_zli &= 31);

        if (v_5li === 0) {
            for (let i = v_7li, j = v_rli - v_zli; i < v_pli; ) {
                if (j === v_rli) j = 0;
                v_jki[i++] = v_gli[j++];
            }
        } else {
            for (let i = v_7li, j = v_rli - v_zli - 1; i < v_pli; ) {
                v_sli = v_gli[j] << v_6li;
                if (++j === v_rli) j = 0;
                v_sli |= v_gli[j] >>> v_5li;
                v_jki[i++] = v_sli & 255;
            }
        }

        v_7li = v_pli;
    }

    return [content, contentLength, key1, key2, key3];
};

function process1(v_0li: number, v_1li: number, key: number[]): [number, number] {
    for (let i = 0; i < 32; i++) {
        v_0li = (v_0li + key[i]) & 255;
        v_1li ^= key[i];
    }

    return [v_0li, v_1li];
}

function process2(v_yli: number, v_uli: number, v_gli: number[]) {
    for (let v_vli = v_yli; v_uli > v_yli; v_uli--, v_vli--) {
        arraySwap(v_gli, v_uli, v_vli);
    }
}

const check1 = (n: number, m: number) => (n & m) === m;
