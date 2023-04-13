import type { Plugin } from 'unified';
interface Data {
    astro: {
        frontmatter: {
            minutesRead?: string;
        };
    };
}
export declare function remarkReadingTime(): Plugin<[options?: {
    data: Data;
}]>;
export {};
