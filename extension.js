import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';
import {StyleManager} from './styleManager.js';

export default class LimelightExtension extends Extension {
    #styleManager;

    enable() {
        const settings = this.getSettings();
        this.#styleManager = new StyleManager(settings);
        this.#styleManager.enable();
    }

    disable() {
        if (this.#styleManager) {
            this.#styleManager.disable();
            this.#styleManager = null;
        }
    }
}
