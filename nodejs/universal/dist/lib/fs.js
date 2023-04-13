import * as fs from 'node:fs';
import * as path from 'node:path';
export function copyFileIfNewerMemoizeEffects() {
    const destDirErrors = new Map();
    const memoized = new Map();
    const memoizedEntry = (key) => {
        let result = memoized.get(key);
        if (result)
            return result;
        result = {
            copied: [],
            notRequired: [],
            statError: [],
        };
        memoized.set(key, result);
        return result;
    };
    return {
        destDirErrors,
        memoized,
        onEnsureDestDirError: (err, destPath) => {
            destDirErrors.set(destPath, err);
        },
        onStatError: (err, srcPath) => {
            memoizedEntry(srcPath)?.statError.push(err);
        },
        onCopyNotRequired: (srcPath, destPath) => {
            memoizedEntry(srcPath)?.notRequired.push(destPath);
        },
        onCopied: (srcPath, destPath) => {
            memoizedEntry(srcPath)?.copied.push(destPath);
        },
    };
}
export function copyFileIfNewer(srcPath, destPath, effects) {
    return fs.stat(srcPath, (err, srcStats) => {
        if (err) {
            return effects?.onStatError?.(err, srcPath, destPath);
        }
        fs.stat(destPath, (err, destStats) => {
            if (!err && srcStats.mtime <= destStats.mtime) {
                // Source file is not newer than the destination file, so don't copy it
                return effects?.onCopyNotRequired?.(srcPath, destPath);
            }
            const destDir = path.dirname(destPath);
            fs.mkdir(destDir, { recursive: true }, err => {
                if (err && err.code !== 'EEXIST') {
                    return effects?.onEnsureDestDirError?.(err, srcPath, destPath);
                }
                const srcStream = fs.createReadStream(srcPath);
                const destStream = fs.createWriteStream(destPath);
                srcStream.pipe(destStream);
                destStream.on('close', () => {
                    effects?.onCopied?.(srcPath, destPath);
                });
            });
        });
    });
}
