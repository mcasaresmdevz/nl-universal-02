/// <reference types="node" resolution-mode="require"/>
export type FrontmatterValue = string | number | boolean | {
    [x: string]: FrontmatterValue;
} | Array<FrontmatterValue>;
export type TransformableFrontmatter = {
    [x: string]: FrontmatterValue;
};
export type RemarkVfile = {
    readonly value?: string | Buffer;
    readonly cwd?: string;
    readonly path: URL | string;
    readonly basename: string | undefined;
    readonly extname: string | undefined;
    readonly dirname: string | undefined;
    readonly data: any;
};
export type RouteFrontmatterTransformer = (tf: () => TransformableFrontmatter, vfile: RemarkVfile) => Promise<void>;
export type RouteRemarkPlugin = (tree: any, vfile: RemarkVfile) => Promise<void>;
export interface RouteFrontmatter {
    readonly transformFM?: RouteFrontmatterTransformer;
}
export interface RouteContent {
    readonly remarkPlugin?: RouteRemarkPlugin;
}
export interface IntermediateRouteUnit {
    readonly label: string;
    readonly abbreviation?: string;
    readonly frontmatter?: RouteFrontmatter;
    readonly content?: RouteContent;
}
export type IntermediateRouteUnitSupplier = () => IntermediateRouteUnit;
export interface DiscoveredRouteUnit extends IntermediateRouteUnit {
    readonly slug: string;
    readonly originFsPath: string;
}
