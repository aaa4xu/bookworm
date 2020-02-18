import { promises as fs } from 'fs';

export const exists = (path: string) =>
    fs
        .stat(path)
        .then(() => true)
        .catch(() => false);
