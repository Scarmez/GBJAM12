import json
from pathlib import Path
from PIL import Image

inDir = Path('sprites')
outDir = Path('src/sprites')

for filename in inDir.iterdir():

    if(filename.suffix != ".png"): 
        continue


    image = Image.open(filename)
    frameHeight = image.height
    frameWidth = image.width
    
    dataFilename = inDir / (filename.stem + ".json")

    if(dataFilename.is_file()):
        openJsonFile = open(dataFilename)
        imageData = json.load(openJsonFile)
        if('frameHeight' in imageData): frameHeight = imageData["frameHeight"]
        if('frameWidth' in imageData): frameWidth = imageData["frameWidth"]


    if image.mode != 'P':
        print(f"{filename} not an indexed colour mode image. Image Mode: {image.mode} skipping...")
        continue

    text = f"export default {{\n    width: {image.width},\n    height: {image.height},\n    frameWidth: {frameWidth},\n    frameHeight: {frameHeight},\n    pixels: [\n"
    for y in range(image.height):
        text += "        "
        for x in range(image.width):
            text += f"{image.getpixel((x,y))},"
        text += "\n"
    text += "    ]\n};"

    newFile = open(outDir.joinpath(filename.stem).with_suffix('.ts'), 'w')
    newFile.write(text)
    newFile.close()