export class SaveData {

    public static isLoaded: boolean = false;

    public static money: number = 0;

    public static saveObj: SaveObject;

    public static nextSong: string = "test";
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

    public static getCreatureSprite(){
        return creatureData[SaveData.saveObj.petSpecies].stages[SaveData.saveObj.petStage].sprite;
    }

}

interface SaveObject {

    money: number;
    
    ingredient0: number;
    ingredient1: number;
    ingredient2: number;

    potion0: number;
    potion1: number;
    potion2: number;
    
    petSpecies: number;
    petStage: number;
    petName: string;
    petAge: number;
    petHunger: number;
    petHappiness: number;
    petTiredness: number;

    timestamp: number;

}

interface CreatureData {
    name: string; 
    stages: {[key:number]: {sprite: string}}
}
let creatureData: {[key: number]: CreatureData} = {
    
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

}
