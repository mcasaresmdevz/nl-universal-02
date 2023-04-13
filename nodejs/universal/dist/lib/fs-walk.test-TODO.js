import { describe, expect, it } from 'vitest';
import * as mod from './fs-walk.js';
describe('walkFsEntries', () => {
    it('should find and import _route.ts files and import intermediateRouteUnit() result', async () => {
        const irUnits = new Map();
        // FIXME:
        await mod.walkFsEntries(`${__dirname}/../../content/prose-flexible`, {
            onFile: async (we) => {
                if (we.absPath.endsWith('_route.ts')) {
                    const { intermediateRouteUnit } = (await import(we.absPath));
                    if (typeof intermediateRouteUnit === 'function') {
                        const iru = intermediateRouteUnit();
                        if (iru)
                            irUnits.set(we.relPath, { we, iru });
                    }
                }
                return 'continue';
            },
        });
        expect(irUnits.size).toBeGreaterThanOrEqual(3);
        [
            'gpm/_route.ts',
            'gpm/medigy/_route.ts',
            'gpm/medigy/purpose-mission-vision/_route.ts',
            'gpm/medigy-co/_route.ts',
            'gpm/medigy-co/project-management/_route.ts',
            'gpm/medigy-co/requirements/_route.ts',
        ].forEach(v => expect(Array.from(irUnits.keys())).toContain(v));
        const gpmIRU = irUnits.get('gpm/_route.ts');
        expect(gpmIRU?.we.relPath).toBe('gpm/_route.ts');
        expect(gpmIRU?.iru.label).toBe('Governance, Planning and Management');
        expect(gpmIRU?.iru.abbreviation).toBe('GPM');
    });
});
