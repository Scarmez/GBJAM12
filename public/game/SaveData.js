export class SaveData {
    static isLoaded = false;
    static money = 0;
    static saveObj = {
        money: 0,
        ingredients: [0, 0, 0],
        potions: [0, 0, 0],
        foods: [0, 0, 0],
        petSpecies: 0,
        petStage: 0,
        petName: "Ava",
        petAge: 0,
        petHunger: 20,
        petHappiness: 100,
        petTiredness: 100,
    };
    static tracks = [
        "The Spooky Squash",
        "Aaron's Family",
        "Thrilling"
    ];
    static potions = [
        "health_potion",
        "energy_potion",
        "mystery_potion"
    ];
    static nextSong = 0;
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
    static getSaveObj() {
        if (this.saveExists()) {
            return JSON.parse(localStorage.getItem("SaveData"));
        }
    }
    static getCreatureSprite() {
        return creatureData[SaveData.saveObj.petSpecies].stages[SaveData.saveObj.petStage].sprite;
    }
    static getEggSprite() {
        return creatureData[SaveData.saveObj.petSpecies].egg;
    }
    static getPotionSprite() {
        return SaveData.potions[SaveData.nextSong];
    }
}
let creatureData = {
    0: {
        name: "Jersy Devil",
        egg: "c1_egg",
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
        egg: "c2_egg",
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
