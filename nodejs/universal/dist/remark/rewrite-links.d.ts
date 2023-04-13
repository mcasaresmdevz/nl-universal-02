/**
 * Replace all matches in a string asynchronously.
 * @param str
 * @param regex
 * @param asyncFn
 * @returns {Promise<*>}
 */
export declare const replaceAsync: (str: any, regex: any, asyncFn: any) => Promise<any>;
/**
 * Rewrite the URL in a JSX node.
 * @param value
 * @param replacer
 * @returns {Promise<*>}
 */
export declare const rewriteJSXURL: (value: any, replacer: any) => Promise<any>;
/**
 * Rewrite the URL in a Markdown node.
 * @param options
 * @returns {function(*): Promise<*>}
 */
export declare function remarkRewriteLinks(options?: {
    replacer: (url: string) => Promise<string>;
}): (tree: any) => Promise<any>;
