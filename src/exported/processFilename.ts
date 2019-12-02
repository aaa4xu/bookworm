export default (filename: string) => {
    const result: number[] = [];

    for (let index = 0; index < filename.length; ) {
        let v_rfi = filename.charCodeAt(index++);

        v_rfi < 128
            ? result.push(v_rfi)
            : (v_rfi < 2048
                  ? result.push(192 | (v_rfi >> 6))
                  : (v_rfi < 55296 || v_rfi >= 57344 || index === filename.length
                        ? result.push(224 | (v_rfi >> 12))
                        : ((v_rfi = (v_rfi & 1023) << 10),
                          (v_rfi |= filename.charCodeAt(index++) & 1023),
                          (v_rfi += 65536),
                          result.push(240 | (v_rfi >> 18)),
                          result.push(128 | ((v_rfi >> 12) & 63))),
                    result.push(128 | ((v_rfi >> 6) & 63))),
              result.push(128 | (v_rfi & 63)));
    }

    return result;
};
