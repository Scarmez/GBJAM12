export class SaveData {

    public static isLoaded: boolean = false;
    public static money: number = 0;
    public static petAge: number = 0;
    public static petHunger: number = 100;

    public static save(){
        localStorage.setItem("SaveData", 
            JSON.stringify({
                money: this.money,
                petAge: this.petAge,
                petHunger: this.petHunger,
                timestamp: Date.now()
            })
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
            this.money = saveObj.money;
            this.petAge = saveObj.petAge;
            this.petHunger = saveObj.petHunger;
        }
        this.isLoaded = true;

    }

}

interface SaveObject {
    money: number;
    petAge: number;
    petHunger: number;
}