// @ts-ignore
import B2y from './B2y';

export default (p1: number, p2: number, p3: number, p4: number) => {
    const v_tog = new B2y(),
        v_uog = p2 ^ p3 ^ p4,
        v_vog = Math.floor(p1 / 65536),
        v_wog = Math.floor(p2 / 65536),
        v_xog = Math.floor(p3 / 65536),
        v_yog = Math.floor(p4 / 65536),
        v_zog = B2y.b6o,
        v_0pg = B2y.b6b;

    let v_1pg = v_wog ^ v_xog ^ v_yog,
        v_2pg = v_vog ^ v_yog,
        v_3pg = p1 ^ p2,
        v_4pg = p1 ^ p3,
        v_5pg = p1 ^ p4;

    v_1pg >>>= 16;
    const v_6pg = v_1pg % v_0pg,
        v_7pg = ((v_1pg - v_6pg) / v_0pg) % v_zog,
        v_tog__b4k = v_tog.b4K.bind(v_tog);

    v_tog.b9es(v_7pg, v_6pg);
    v_tog.B0o(v_uog);
    const v_9pg = v_tog.b4K(65536) | (v_tog.b4K(65536) << 16),
        v_apg = v_tog.b4K(512),
        v_bpg = v_wog >>> 16,
        v_cpg = v_xog >>> 16;

    v_2pg = (v_2pg >>> 16) ^ v_apg;
    v_3pg = (v_3pg ^ v_9pg) >>> 0;
    v_4pg = (v_4pg ^ v_9pg) >>> 0;
    v_5pg = (v_5pg ^ v_9pg) >>> 0;

    const v_dpg = v_2pg % v_0pg,
        v_epg = ((v_2pg - v_dpg) / v_0pg) % v_zog;

    v_tog.b9es(v_epg, v_dpg);
    v_tog.B0o(v_3pg);
    const v_fpg = v_mqg(v_tog__b4k, v_bpg * v_cpg);
    v_tog.B0o(v_4pg);

    const v_gpg = v_6qg(v_tog__b4k, v_bpg),
        v_hpg = v_6qg(v_tog__b4k, v_cpg),
        v_ipg = v_7qg(v_tog__b4k, v_gpg, v_bpg),
        v_jpg = v_7qg(v_tog__b4k, v_hpg, v_cpg);
    v_tog.B0o(v_5pg);

    const v_kpg: number[] = [],
        v_lpg: number[] = [];
    v_9qg(v_tog__b4k, v_kpg, v_lpg, v_gpg, v_hpg, v_bpg, v_cpg);
    const v_mpg = v_mqg(v_tog__b4k, v_bpg),
        v_npg = v_mqg(v_tog__b4k, v_cpg),
        v_opg: number[] = [],
        v_ppg: number[] = [];

    v_9qg(v_tog__b4k, v_ppg, v_opg, v_ipg, v_jpg, v_bpg, v_cpg);

    return v_qpg(v_bpg, v_cpg, v_fpg, v_mpg, v_npg, v_opg, v_ppg, v_ipg, v_jpg, v_lpg, v_kpg, v_gpg, v_hpg);
};

function v_mqg(fn: (n: number) => number, total: number) {
    const v_oqg: number[] = [];

    for (let i = 0; i < total; i++) {
        const v_nqg = fn(i + 1);
        v_oqg[i] = v_oqg[v_nqg];
        v_oqg[v_nqg] = i;
    }

    return v_oqg;
}

function v_6qg(fn: (n: number) => number, v: number) {
    return v < 4 ? fn(v + 1) : fn(v - 1) + 1;
}

function v_7qg(fn: (n: number) => number, ye_e_: number, _e_e_: number) {
    if (_e_e_ <= 0) return 0;
    const v_8qg = fn(_e_e_);

    return v_8qg < ye_e_ ? v_8qg : v_8qg + 1;
}

function v_9qg(fn: (n: number) => number, p2: number[], p3: number[], p4: number, p5: number, p6: number, p7: number) {
    for (
        let v_aqg, v_bqg, v_cqg, v_dqg = p6, v_eqg = p7, v_fqg = p4, v_gqg = p5, v_hqg = 0, v_iqg = 0, v_jqg = -1;
        v_dqg + v_eqg > 0;

    ) {
        const v_kqg = 0,
            v_lqg = v_jqg;

        v_aqg = fn(v_dqg + v_eqg);
        if (v_aqg < v_dqg) {
            if (v_aqg < v_fqg) {
                for (v_bqg = v_iqg; v_bqg > v_kqg && !(v_hqg >= p2[v_bqg + v_lqg]); v_bqg--);
                for (v_cqg = v_iqg + v_eqg; v_cqg < p7 && !(v_hqg >= p2[v_cqg]); v_cqg++);
                p3[v_hqg] = fn(v_cqg - v_bqg) + v_bqg;
                v_hqg++;
                v_fqg--;
            } else {
                for (v_bqg = v_iqg; v_bqg > v_kqg && !(v_hqg + v_dqg <= p2[v_bqg + v_lqg]); v_bqg--);
                for (v_cqg = v_iqg + v_eqg; v_cqg < p7 && !(v_hqg + v_dqg <= p2[v_cqg]); v_cqg++);
                p3[v_hqg + v_dqg + v_lqg] = fn(v_cqg - v_bqg) + v_bqg;
            }
            v_dqg--;
        } else {
            if (v_aqg - v_dqg < v_gqg) {
                for (v_bqg = v_hqg; v_bqg > v_kqg && !(v_iqg >= p3[v_bqg + v_lqg]); v_bqg--);
                for (v_cqg = v_hqg + v_dqg; v_cqg < p6 && !(v_iqg >= p3[v_cqg]); v_cqg++);
                p2[v_iqg] = fn(v_cqg - v_bqg) + v_bqg;
                v_iqg++;
                v_gqg--;
            } else {
                for (v_bqg = v_hqg; v_bqg > v_kqg && !(v_iqg + v_eqg <= p3[v_bqg + v_lqg]); v_bqg--);
                for (v_cqg = v_hqg + v_dqg; v_cqg < p6 && !(v_iqg + v_eqg <= p3[v_cqg]); v_cqg++);
                p2[v_iqg + v_eqg + v_lqg] = fn(v_cqg - v_bqg) + v_bqg;
            }
            v_eqg--;
        }
    }
}

function v_qpg(
    p1: number,
    p2: number,
    p3: number[],
    p4: number[],
    p5: number[],
    p6: number[],
    p7: number[],
    p8: number,
    p9: number,
    p10: number[],
    p11: number[],
    p12: number,
    p13: number,
) {
    const result: number[] = [],
        v_1qg = p1 + 1,
        v_2qg = p2 + 1,
        v_3qg = v_1qg << 1,
        v_4qg = v_2qg << 1;

    for (let v_vpg = 0; v_vpg < p1; v_vpg++) {
        for (let v_wpg = 0; v_wpg < p2; v_wpg++) {
            const v_zpg = p3[v_vpg + v_wpg * p1];
            const v_xpg = v_zpg % p1;
            const v_ypg = (v_zpg - v_xpg) / p1;
            const v_rpg = v_vpg < p11[v_wpg] ? v_vpg : v_vpg + v_1qg;
            const v_spg = v_wpg < p10[v_vpg] ? v_wpg : v_wpg + v_2qg;
            const v_tpg = v_xpg < p7[v_ypg] ? v_xpg : v_xpg + v_1qg;
            const v_upg = v_ypg < p6[v_xpg] ? v_ypg : v_ypg + v_2qg;
            result.push(v_upg * v_3qg + v_rpg);
            result.push(v_tpg * v_4qg + v_spg);
        }
    }
    result.push(p9 * v_3qg + p12);
    result.push(p8 * v_4qg + p13);

    for (let v_vpg = 0; v_vpg < p1; v_vpg++) {
        const v_xpg = p4[v_vpg];
        const v_rpg = v_vpg < p12 ? v_vpg : v_vpg + v_1qg;
        const v_tpg = v_xpg < p8 ? v_xpg : v_xpg + v_1qg;
        result.push(p6[v_xpg] * v_3qg + v_rpg);
        result.push(v_tpg * v_4qg + p10[v_vpg]);
    }

    for (let v_wpg = 0; v_wpg < p2; v_wpg++) {
        const v_ypg = p5[v_wpg];
        const v_spg = v_wpg < p13 ? v_wpg : v_wpg + v_2qg;
        const v_upg = v_ypg < p9 ? v_ypg : v_ypg + v_2qg;
        result.push(v_upg * v_3qg + p11[v_wpg]);
        result.push(p7[v_ypg] * v_4qg + v_spg);
    }

    return result;
}
