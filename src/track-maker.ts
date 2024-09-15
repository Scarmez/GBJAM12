const SCALE = 4;
const WIDTH = 160;
const HEIGHT = 144;



const upload = document.getElementById("upload")! as HTMLInputElement;
upload.addEventListener("change", HandleUpload, false);

const nameinput = document.getElementById("nameinput")! as HTMLInputElement;
const bpminput = document.getElementById("bpminput")! as HTMLInputElement;

// Set up canvas
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
canvas.addEventListener('pointerdown', onPointerDown);
function onPointerDown(e: PointerEvent){}
canvas.addEventListener('pointermove', onPointerMove);
function onPointerMove(e: PointerEvent){}

const output = document.getElementById('output') as HTMLTextAreaElement;
const song = new Audio();

function LoadImg(path:string){

    let img = new Image();
    img.src = path;
    img.onload = ()=>{
        
    }

}

function HandleUpload(e: Event){
    let files = (e.target as HTMLInputElement).files;
    if(files!.length > 0){
        song.src = URL.createObjectURL(files!.item(0)!);
        song.load();
        console.log(files!.item(0)!.name)
        nameinput.value = files!.item(0)!.name
    }
}