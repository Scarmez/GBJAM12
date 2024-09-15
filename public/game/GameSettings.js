export class GameSettings {
    static i;
    values = {};
    constructor() {
        GameSettings.i = this;
    }
    saveAll() {
        for (const [key, value] of Object.entries(this.values)) {
            localStorage.setItem(key, value);
        }
    }
    save(key) {
        localStorage.setItem(key, this.values[key]);
    }
    loadAll() {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            this.values[key] = value;
        }
    }
}
