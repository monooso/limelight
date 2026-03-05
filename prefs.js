import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk';
import {ExtensionPreferences, gettext as _} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class LimelightPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        const settings = this.getSettings();
        const page = new Adw.PreferencesPage();
        window.add(page);

        const styleGroup = new Adw.PreferencesGroup({
            title: _('Inactive Window Style'),
            description: _('Adjust appearance of background windows.')
        });
        page.add(styleGroup);

        const opacityRow = new Adw.SpinRow({
            title: _('Opacity (%)'),
            subtitle: _('100% is fully opaque, 0% is fully transparent'),
            adjustment: new Gtk.Adjustment({ lower: 0, upper: 100, step_increment: 5 }),
            value: settings.get_int('inactive-opacity')
        });
        styleGroup.add(opacityRow);
        settings.bind('inactive-opacity', opacityRow, 'value', 0);
    }
}
