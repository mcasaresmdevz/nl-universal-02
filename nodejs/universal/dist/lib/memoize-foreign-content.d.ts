import type { JSDOM } from 'jsdom';
import * as m from './memoize.js';
import * as fc from './foreign-content.js';
export declare const foreignContentMssFactory: <V>({ fsssFactory, isForeignContentAvailable, expireDurationMS, fileSuffix, mssStatsInstances, isInDevelopment, }: {
    readonly fsssFactory: (options: m.FileSysMemoizeStoreStrategyFactory<V>) => m.MemoizeStoreStrategy<string, V>;
    readonly isForeignContentAvailable: () => boolean;
    readonly expireDurationMS: number;
    readonly fileSuffix: string;
    readonly mssStatsInstances?: Map<string, {
        readonly key: string;
        gets: number;
        sets: number;
        readonly reject: Error[];
    }> | undefined;
    readonly isInDevelopment: boolean;
}) => <V_1>(key: string) => m.MemoizeStoreStrategy<string, V_1>;
export declare const foreignQueryableHtmlMemoizer: (fqhmOptions: {
    readonly isForeignContentAvailable: () => boolean;
    readonly expireDurationMS?: number;
    readonly fileSuffix?: string;
    readonly mssStatsInstances?: Map<string, {
        readonly key: string;
        gets: number;
        sets: number;
        readonly reject: Error[];
    }>;
    readonly isInDevelopment: boolean;
}) => (url: string, args?: {
    readonly extractHTML?: ((dom: JSDOM) => string) | undefined;
    readonly key?: string | undefined;
    readonly sanitized?: boolean | undefined;
} | undefined) => (() => Promise<string>);
export declare const foreignReadableHtmlMemoizer: (options: {
    readonly isForeignContentAvailable: () => boolean;
    readonly expireDurationMS?: number;
    readonly fileSuffix?: string;
    readonly mssStatsInstances?: Map<string, {
        readonly key: string;
        gets: number;
        sets: number;
        readonly reject: Error[];
    }>;
    readonly isInDevelopment: boolean;
}) => (url: string, key?: string) => (() => Promise<{
    /** article title */
    title: string;
    /** author metadata */
    byline: string;
    /** content direction */
    dir: string;
    /** HTML of processed article content */
    content: string;
    /** text content of the article (all HTML removed) */
    textContent: string;
    /** length of an article, in characters */
    length: number;
    /** article description, or short excerpt from the content */
    excerpt: string;
    siteName: string;
}>);
export declare const memoizableForeignHTML: (options: {
    readonly isInDevelopment: boolean;
}) => Promise<(url: string, args?: {
    readonly extractHTML?: ((dom: JSDOM) => string) | undefined;
    readonly key?: string | undefined;
    readonly sanitized?: boolean | undefined;
} | undefined) => (() => Promise<string>)>;
export declare const memoizableForeignReadable: (options: {
    readonly isInDevelopment: boolean;
}) => Promise<(url: string, key?: string) => (() => Promise<{
    /** article title */
    title: string;
    /** author metadata */
    byline: string;
    /** content direction */
    dir: string;
    /** HTML of processed article content */
    content: string;
    /** text content of the article (all HTML removed) */
    textContent: string;
    /** length of an article, in characters */
    length: number;
    /** article description, or short excerpt from the content */
    excerpt: string;
    siteName: string;
}>)>;
export declare function memoizableForeignContent(foreignContent: fc.ForeignContent, options: {
    readonly isInDevelopment: boolean;
}): Promise<string>;
