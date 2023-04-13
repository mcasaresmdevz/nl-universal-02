import type { Plugin } from 'unified';
interface Data {
    astro: {
        frontmatter: {
            extra: string[];
        };
    };
}
export declare function remarkDiagram(): Plugin<[options?: {
    data: Data;
}]>;
export {};
