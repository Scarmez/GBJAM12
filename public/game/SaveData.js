export class SaveData {
    static isLoaded = false;
    static money = 0;
    static petAge = 0;
    static petHunger = 100;
    static save() {
        localStorage.setItem("SaveData", JSON.stringify({
            money: this.money,
            petAge: this.petAge,
            petHunger: this.petHunger,
            timestamp: Date.now()
        }));
    }
    static saveExists() {
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i) == "SaveData")
                return true;
        }
        return false;
    }
    static load() {
        if (this.saveExists()) {
            let saveObj = JSON.parse(localStorage.getItem("SaveData"));
            this.money = saveObj.money;
            this.petAge = saveObj.petAge;
            this.petHunger = saveObj.petHunger;
        }
        this.isLoaded = true;
    }
}
