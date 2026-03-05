import Meta from 'gi://Meta';
import {OPACITY_MAX, percentToOpacity} from './opacity.js';

export class StyleManager {
    #focusSignalId;
    #settings;
    #settingsChangedId;
    #windowCreatedId;

    constructor(settings) {
        this.#settings = settings;
    }

    enable() {
        this.#focusSignalId = global.display.connect(
            'notify::focus-window',
            this.#updateAllWindows.bind(this)
        );

        this.#windowCreatedId = global.display.connect(
            'window-created',
            this.#updateAllWindows.bind(this)
        );

        this.#settingChangedId = this.#settings.connect(
            'changed::inactive-opacity',
            this.#updateAllWindows.bind(this)
        );

        this.#updateAllWindows();
    }

    disable() {
        if (this.#focusSignalId) {
            global.display.disconnect(this.#focusSignalId);
            this.#focusSignalId = null;
        }
        if (this.#windowCreatedId) {
            global.display.disconnect(this.#windowCreatedId);
            this.#windowCreatedId = null;
        }
        if (this.#settingChangedId) {
            this.#settings.disconnect(this.#settingChangedId);
            this.#settingChangedId = null;
        }

        this.#resetAllWindows();
    }

    #updateAllWindows() {
        const focusWindow = global.display.focus_window;
        const actors = global.window_group.get_children();
        const inactiveOpacity = percentToOpacity(
            this.#settings.get_int('inactive-opacity')
        );

        actors.forEach(actor => {
            const metaWin = actor.meta_window;
            if (!metaWin) return;

            const type = metaWin.get_window_type();
            if (type !== Meta.WindowType.NORMAL &&
                type !== Meta.WindowType.DIALOG &&
                type !== Meta.WindowType.MODAL_DIALOG) return;

            if (focusWindow && metaWin === focusWindow) {
                actor.opacity = OPACITY_MAX;
            } else {
                actor.opacity = inactiveOpacity;
            }
        });
    }

    #resetAllWindows() {
        const actors = global.window_group.get_children();
        actors.forEach(actor => {
            if (!actor.meta_window) return;
            actor.opacity = OPACITY_MAX;
        });
    }
}
