const v_cgh = JSON.parse(
        '[[1,3,10],[1,5,16],[1,5,19],[1,9,29],[1,11,6],[1,11,16],[1,19,3],[1,21,20],[1,27,27],[2,5,15],[2,5,21],[2,7,7],[2,7,9],[2,7,25],[2,9,15],[2,15,17],[2,15,25],[2,21,9],[3,1,14],[3,3,26],[3,3,28],[3,3,29],[3,5,20],[3,5,22],[3,5,25],[3,7,29],[3,13,7],[3,23,25],[3,25,24],[3,27,11],[4,3,17],[4,3,27],[4,5,15],[5,3,21],[5,7,22],[5,9,7],[5,9,28],[5,9,31],[5,13,6],[5,15,17],[5,17,13],[5,21,12],[5,27,8],[5,27,21],[5,27,25],[5,27,28],[6,1,11],[6,3,17],[6,17,9],[6,21,7],[6,21,13],[7,1,9],[7,1,18],[7,1,25],[7,13,25],[7,17,21],[7,25,12],[7,25,20],[8,7,23],[8,9,23],[9,5,14],[9,5,25],[9,11,19],[9,21,16],[10,9,21],[10,9,25],[11,7,12],[11,7,16],[11,17,13],[11,21,13],[12,9,23],[13,3,17],[13,3,27],[13,5,19],[13,17,15],[14,1,15],[14,13,15],[15,1,29],[17,15,20],[17,15,23],[17,15,26]]',
    ),
    v_dgh = [
        (p1: number, p2: number, p3: number, p4: number): number => {
            p1 ^= p1 << p2;
            p1 ^= p1 >>> p3;
            p1 ^= p1 << p4;

            return p1;
        },
        (p1: number, p2: number, p3: number, p4: number): number => {
            p1 ^= p1 << p4;
            p1 ^= p1 >>> p3;
            p1 ^= p1 << p2;

            return p1;
        },
        (p1: number, p2: number, p3: number, p4: number): number => {
            p1 ^= p1 >>> p2;
            p1 ^= p1 << p3;
            p1 ^= p1 >>> p4;

            return p1;
        },
        (p1: number, p2: number, p3: number, p4: number): number => {
            p1 ^= p1 >>> p4;
            p1 ^= p1 << p3;
            p1 ^= p1 >>> p2;

            return p1;
        },
        (p1: number, p2: number, p3: number, p4: number): number => {
            p1 ^= p1 << p2;
            p1 ^= p1 << p4;
            p1 ^= p1 >>> p3;

            return p1;
        },
        (p1: number, p2: number, p3: number, p4: number): number => {
            p1 ^= p1 >>> p2;
            p1 ^= p1 >>> p4;
            p1 ^= p1 << p3;

            return p1;
        },
    ],
    v_ggh = 2463534242;

export default class B2y {
    public static b6o = v_cgh.length;
    public static b6b = v_dgh.length;
    public static b4v = v_cgh.length * v_dgh.length;

    private v_kgh = 0;
    private v_jgh = v_ggh;
    private v_lgh = v_cgh[74][this.v_kgh++];
    private v_mgh = v_cgh[74][this.v_kgh++];
    private v_ngh = v_cgh[74][this.v_kgh++];
    private v_ogh = v_dgh[0];

    public b9es(EEyY_: number, LEyY_: number): void {
        this.v_jgh = v_ggh;
        const v_pgh = v_cgh[EEyY_];
        let v_qgh = 0;
        this.v_lgh = v_pgh[v_qgh++];
        this.v_mgh = v_pgh[v_qgh++];
        this.v_ngh = v_pgh[v_qgh];
        this.v_ogh = v_dgh[LEyY_];
    }

    // tslint:disable-next-line:function-name
    public B0o(p1: number): void {
        const v_rgh = p1 >>> 0;
        this.v_jgh = v_rgh || v_ggh;
    }

    public b4K(p1: number): number {
        if (p1 <= 1) return 0;

        const v_vgh = 4294967295 - p1;
        let v_sgh,
            v_tgh,
            v_ugh = this.v_jgh;
        do {
            v_ugh = this.v_ogh(v_ugh, this.v_lgh, this.v_mgh, this.v_ngh) >>> 0;
            v_tgh = v_ugh - 1;
            v_sgh = v_tgh % p1;
        } while (v_vgh < v_tgh - v_sgh);

        this.v_jgh = v_ugh;
        return v_sgh;
    }
}
