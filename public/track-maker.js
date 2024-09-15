"use strict";
const SCALE = 4;
const WIDTH = 160;
const HEIGHT = 144;
const upload = document.getElementById("upload");
upload.addEventListener("change", HandleUpload, false);
const nameinput = document.getElementById("nameinput");
const bpminput = document.getElementById("bpminput");
// Set up canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.addEventListener('pointerdown', onPointerDown);
function onPointerDown(e) { }
canvas.addEventListener('pointermove', onPointerMove);
function onPointerMove(e) { }
const output = document.getElementById('output');
const song = new Audio();
function LoadImg(path) {
    let img = new Image();
    img.src = path;
    img.onload = () => {
    };
}
function HandleUpload(e) {
    let files = e.target.files;
    if (files.length > 0) {
        song.src = URL.createObjectURL(files.item(0));
        song.load();
        console.log(files.item(0).name);
        nameinput.value = files.item(0).name;
    }
}
