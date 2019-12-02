import a3f from './a3f';
// @ts-ignore
import B2y from './B2y';

export default (page: IA9pPage, width: number, height: number) => {
    const blockWidth = page.b8A,
        blockHeight = page.b6V;

    const v_r3j = page.B0J,
        v_s3j = page.B0K,
        v_t3j = page.B0n,
        v_u3j = page.B0A,
        v_v3j = B2y.b6o,
        v_w3j = B2y.b6b,
        blocksX = Math.floor(width / blockWidth),
        blocksY = Math.floor(height / blockHeight),
        lastBlockWidth = width % blockWidth,
        lastBlockHeight = height % blockHeight,
        v_14j = (blocksX + 1) << 1,
        v_24j = (blocksY + 1) << 1,
        lastBlockXVS = (blocksX + 1) * blockWidth - lastBlockWidth,
        lastBlockYVS = (blocksY + 1) * blockHeight - lastBlockHeight,
        v_54j = new B2y(),
        v_64j = v_u3j ^ blocksX ^ blocksY,
        v_74j = v_64j % v_w3j,
        v_84j = ((v_64j - v_74j) / v_w3j) % v_v3j,
        v_o3j: IA9pItem[] = [];

    v_54j.b9es(v_84j, v_74j);
    v_54j.B0o(v_r3j ^ v_s3j ^ v_t3j);

    const v_94j = v_54j.b4K(65536) + v_54j.b4K(65536) * 65536 + v_54j.b4K(512) * 4294967296;

    const v_a4j = blocksX * 4294967296 + v_r3j,
        v_b4j = blocksY * 4294967296 + v_s3j,
        v_c4j = v_u3j * 4294967296 + v_t3j,
        v_d4j = a3f(v_94j, v_a4j, v_b4j, v_c4j),
        v_e4j = (index: number, total: number, stepBlockWidth: number, stepBlockHeight: number) => {
            if (stepBlockWidth !== 0 && stepBlockHeight !== 0) {
                for (; index < total; ) {
                    const v_f4j = v_d4j[index++],
                        v_g4j = v_d4j[index++],
                        v_h4j = v_f4j % v_14j,
                        v_i4j = v_g4j % v_24j,
                        v_j4j = (v_g4j - v_i4j) / v_24j,
                        v_k4j = (v_f4j - v_h4j) / v_14j;

                    v_o3j.push({
                        srcX: v_h4j * blockWidth - (v_h4j > blocksX ? lastBlockXVS : 0),
                        srcY: v_i4j * blockHeight - (v_i4j > blocksY ? lastBlockYVS : 0),
                        destX: v_j4j * blockWidth - (v_j4j > blocksX ? lastBlockXVS : 0),
                        destY: v_k4j * blockHeight - (v_k4j > blocksY ? lastBlockYVS : 0),
                        width: stepBlockWidth,
                        height: stepBlockHeight,
                    });
                }
            }
        };

    let v_x4j = 0,
        v_y4j = blocksX * blocksY * 2;

    v_e4j(v_x4j, v_y4j, blockWidth, blockHeight);
    v_x4j = v_y4j;
    v_y4j += 2;
    v_e4j(v_x4j, v_y4j, lastBlockWidth, lastBlockHeight);
    v_x4j = v_y4j;
    v_y4j += blocksX * 2;
    v_e4j(v_x4j, v_y4j, blockWidth, lastBlockHeight);
    v_x4j = v_y4j;
    v_y4j += blocksY * 2;
    v_e4j(v_x4j, v_y4j, lastBlockWidth, blockHeight);

    return v_o3j;
};

export interface IA9pPage {
    b8A: number; // blockWidth
    b6V: number; // blockHeight

    B0A: number;

    B0J: number;
    B0K: number;
    B0n: number;
}

export interface IA9pItem {
    srcX: number;
    srcY: number;
    destX: number;
    destY: number;
    width: number;
    height: number;
}
