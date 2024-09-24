export class SaveData {

    public static isLoaded: boolean = false;

    public static money: number = 0;

    public static saveObj: SaveObject = {
        money: 0,
        ingredients: [0,0,0],
        potions: [0,0,0],
        foods: [0,0,0],
        petSpecies: 0,
        petStage: 0,
        petName: "Ava",
        petAge: 0,
        petHunger: 20,
        petHappiness: 100,
        petTiredness: 100,
    };

    public static tracks = [
        "The Spooky Squash",
        "Aaron's Family",
        "Thrilling"
    ];
    
    public static potions = [
        "health_potion",
        "energy_potion",
        "mystery_potion"
    ];

    public static nextSong: number = 0;
    public static lastScore: number = 0;

    public static save(){
        localStorage.setItem("SaveData", 
            JSON.stringify(SaveData.saveObj)
        );
    }

    public static saveExists(): boolean {
        for(let i = 0; i < localStorage.length; i++){
            if(localStorage.key(i) == "SaveData") return true;
        }
        return false;
    }

    public static load(){

        if(this.saveExists()){
            let saveObj = JSON.parse(localStorage.getItem("SaveData")!) as SaveObject;
            SaveData.saveObj = saveObj;            
        }
        this.isLoaded = true;

    }

    public static getSaveObj(){
        if(this.saveExists()){
            return JSON.parse(localStorage.getItem("SaveData")!) as SaveObject;
        }
    }

    public static getCreatureSprite(){
        return creatureData[SaveData.saveObj.petSpecies].stages[SaveData.saveObj.petStage].sprite;
    }

    public static getEggSprite(){
        return creatureData[SaveData.saveObj.petSpecies].egg;
    }

    public static getPotionSprite(){
        return SaveData.potions[SaveData.nextSong];
    }

}

interface SaveObject {

    money: number;
    
    ingredients: number[];
    potions: number[];
    foods: number[];
    
    petSpecies: number;
    petStage: number;
    petName: string;
    petAge: number;
    petHunger: number;
    petHappiness: number;
    petTiredness: number;

}

interface CreatureData {
    name: string; 
    egg: string;
    stages: {[key:number]: {sprite: string}}
}
let creatureData: {[key: number]: CreatureData} = {
    
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

}

