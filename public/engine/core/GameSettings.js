/** Class for storing string values to access globally via the singleton that can be saved to local storage. */
export class GameSettings {
    static i;
    _settings = new Map();
    constructor() {
        GameSettings.i = this;
    }
    /** Sets a setting to a specific value. */
    setValue(key, value) {
        let setting = this._settings.get(key);
        if (setting) {
            setting.value = value;
            for (let i = 0; i < setting.onChangedEvents.length; i++) {
                setting.onChangedEvents[i](value);
            }
        }
        else {
            this._settings.set(key, { value: value, onChangedEvents: [] });
        }
        localStorage.setItem(key, value);
    }
    /** Get a setting value. Returns null if value doesn't exist. */
    getValue(key, defaultValue) {
        let setting = this._settings.get(key);
        if (setting) {
            return setting.value;
        }
        else {
            this.setValue(key, defaultValue);
            return defaultValue;
        }
    }
    /** Save all values in this._values to LocalStorage. */
    saveAll() {
        for (const [key, setting] of this._settings.entries()) {
            localStorage.setItem(key, setting.value);
        }
    }
    /** Load all values stored in LocalStore to this._values */
    loadAll() {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const setting = { value: "", onChanged: [] };
            setting.value = localStorage.getItem(key);
        }
    }
}
