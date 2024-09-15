export class AssetManager {
    gfx;
    aud;
    sprites = new Map();
    audio = new Map();
    /**
     * Asset Manager is responsible for initializing assets and providing a way to access them. It needs a GraphicsManager to create the sprites.
     * Call loadManifest with an object containing the assets to be loaded to initialize all the assets and load them into maps.
    */
    constructor(gfx, aud) {
        this.gfx = gfx;
        this.aud = aud;
        this.sprites.set("fallback", this.gfx.createSprite({ width: 1, height: 1, pixels: [1] }));
    }
    /**
     * Will load all assets in the object. It will load the asset into the relevant Map using the name of the property as the key to the Map.
     * Loaded assets can be retreived with "getSprite() and getAudio()"
    */
    loadManifest(manifest) {
        for (const [key, value] of Object.entries(manifest.sprites)) {
            this.sprites.set(key, this.gfx.createSprite(value));
        }
        for (const [key, value] of Object.entries(manifest.audio)) {
            this.loadAudio(key, value);
        }
    }
    loadAudio(key, path) {
        let newAudio = new Audio(path);
        this.aud.attachAudio(newAudio);
        console.log(`Loaded ${path}`);
        //newAudio.play();
        this.audio.set(key, newAudio);
    }
    /** Returns a Sprite object from the Map. If the Sprite doesn't exist it will return a blanl "fallback" Sprite. */
    getSprite(spriteName) {
        if (this.sprites.has(spriteName)) {
            return this.sprites.get(spriteName);
        }
        else {
            console.error(`Could not find sprite ${spriteName}`);
            return this.sprites.get("fallback");
        }
    }
    setSprite(key, value) {
        this.sprites.set(key, value);
    }
    getAudio(audioName) {
        // TO-DO: Implement audio asset management.
        throw console.error("Have not implemented any audio yet.");
    }
}
