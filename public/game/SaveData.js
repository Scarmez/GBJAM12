export class SaveData {
    static isLoaded = false;
    static money = 0;
    static saveObj;
    static nextSong = "test";
    static lastScore = 0;
    static save() {
        localStorage.setItem("SaveData", JSON.stringify(SaveData.saveObj));
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
            SaveData.saveObj = saveObj;
        }
        this.isLoaded = true;
    }
    static getCreatureSprite() {
        return creatureData[SaveData.saveObj.petSpecies].stages[SaveData.saveObj.petStage].sprite;
    }
}
let creatureData = {
    0: {
        name: "Jersy Devil",
        stages: {
            0: {
                sprite: "c1_infant"
            },
            1: {
                sprite: "c1_final"
            }
        }
    },
    1: {
        name: "Chimera",
        stages: {
            0: {
                sprite: "c2_infant"
            },
            1: {
                sprite: "c2_final"
            }
        }
    }
};
