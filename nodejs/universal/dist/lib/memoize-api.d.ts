import * as m from './memoize.js';
export declare const apiMssFactory: ({ isApiAvailable, mssStatsInstances, isInDevelopment, }: {
    readonly isApiAvailable: () => boolean;
    readonly mssStatsInstances?: Map<string, {
        readonly key: string;
        gets: number;
        sets: number;
        readonly reject: Error[];
    }> | undefined;
    readonly isInDevelopment: boolean;
}) => <V>(key: string) => m.MemoizeStoreStrategy<string, V>;
export declare const memoizableApiResponse: (options: {
    readonly isApiAvailable: () => boolean;
    readonly isInDevelopment: boolean;
}) => <A extends unknown[], V>(apiCallFn: (...args: A) => Promise<V>, key: string) => (...args: A) => Promise<V>;
