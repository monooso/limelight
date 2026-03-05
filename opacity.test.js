import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import {OPACITY_MAX, percentToOpacity} from './opacity.js';

describe('OPACITY_MAX', () => {
    it('is 255', () => {
        assert.equal(OPACITY_MAX, 255);
    });
});

describe('percentToOpacity', () => {
    it('converts 0% to 0', () => {
        assert.equal(percentToOpacity(0), 0);
    });

    it('converts 100% to 255', () => {
        assert.equal(percentToOpacity(100), 255);
    });

    it('converts 50% to 128', () => {
        assert.equal(percentToOpacity(50), 128);
    });

    it('converts 80% (the default) to 204', () => {
        assert.equal(percentToOpacity(80), 204);
    });

    it('rounds to the nearest integer', () => {
        assert.equal(percentToOpacity(33), 84);
    });
});
