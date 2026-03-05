const OPACITY_MAX = 255;

function percentToOpacity(percent) {
    return Math.round((percent / 100) * OPACITY_MAX);
}

export {OPACITY_MAX, percentToOpacity};
