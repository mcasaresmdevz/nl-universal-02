import * as t from './tree.js';
/**
 * Prepare an function which, when called, will compute a node's "pathway" (breadcrumbs)
 * @param tree is the tree for which pathway should be computed
 * @param intermediaryUnit a function which computes what a non-terminal breadcrumb contains
 * @param terminalUnit a function which computes what a terminal breadcrumb contains
 * @param defaultOptions the options that will be passed into the byNodeKey and byNode functions
 * @returns an object which provides breadcrumbs preparation by node key or node
 */
export function treePathwaysPreparer(tree, intermediaryUnit, terminalUnit, defaultOptions) {
    const index = defaultOptions?.index ?? t.pathTreeIndex(tree);
    const cachedNodeKeys = new Map();
    const cachedNodeQPs = new Map();
    return {
        intermediaryUnit,
        terminalUnit,
        byNodeKey: (indexKey, options) => {
            let result = cachedNodeKeys.get(indexKey);
            if (!result) {
                const refine = options?.refine ?? defaultOptions?.refine;
                const includeTerminal = options?.includeTerminal ?? defaultOptions?.includeTerminal;
                const node = index.get(indexKey);
                if (!node)
                    return undefined;
                // we use slice().reverse() because reverse() mutates original
                result = node.ancestors.slice().reverse().map(intermediaryUnit);
                if (includeTerminal)
                    result.push(terminalUnit(node));
                result = refine ? refine(result) : result;
                cachedNodeKeys.set(indexKey, result);
            }
            return result;
        },
        byNode: (node, options) => {
            let result = cachedNodeQPs.get(node.qualifiedPath);
            if (!result) {
                const refine = options?.refine ?? defaultOptions?.refine;
                const includeTerminal = options?.includeTerminal ?? defaultOptions?.includeTerminal;
                // we use slice().reverse() because reverse() mutates original
                result = node.ancestors.slice().reverse().map(intermediaryUnit);
                if (includeTerminal)
                    result.push(terminalUnit(node));
                result = refine ? refine(result) : result;
                cachedNodeQPs.set(node.qualifiedPath, result);
            }
            return result;
        },
    };
}
