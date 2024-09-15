import bluewit_frame from "./sprites/bluewit_frame.js";
import border from "./sprites/border.js";
import border2 from "./sprites/border2.js";
import c1_idle from "./sprites/c1_idle.js";
import cuckoo from "./sprites/cuckoo.js";
import cursor from "./sprites/cursor.js";
import egg_loop0 from "./sprites/egg_loop0.js";
import egg_loop1 from "./sprites/egg_loop1.js";
import egg_loop2 from "./sprites/egg_loop2.js";
import egg_loop3 from "./sprites/egg_loop3.js";
import font_Chit from "./sprites/font_Chit.js";
import font_Cushion from "./sprites/font_Cushion.js";
import font_Electromagnetic from "./sprites/font_Electromagnetic.js"
import font_Prelude from "./sprites/font_Prelude.js";
import font_Primary_Target from "./sprites/font_Primary_Target.js";
import font_rabbit_var from "./sprites/font_rabbit_var.js";
import font_rabbit from "./sprites/font_rabbit_var.js";
import font_Reflections from "./sprites/font_Reflections.js";
import font_Torment from "./sprites/font_Torment.js";
import palette from "./sprites/palette.js";
import splash from "./sprites/splash.js";

export default {
    sprites: {
        frame0: border,
        frame1: border2,
        frame2: bluewit_frame,
        cuckoo: cuckoo,
        font_Electromagnetic: font_Electromagnetic,
        font_Primary_Target: font_Primary_Target,
        font_Reflections: font_Reflections,
        font_Torment: font_Torment,
        font_Chit: font_Chit,
        font_Cushion: font_Cushion,
        font_Prelude: font_Prelude,
        font_rabbit: font_rabbit,
        font_rabbit_var: font_rabbit_var,
        palette: palette,
        splash: splash,
        cursor: cursor,
        egg_loop0: egg_loop0,
        egg_loop1: egg_loop1,
        egg_loop2: egg_loop2,
        egg_loop3: egg_loop3,
        c1_idle: c1_idle,
    },
    audio: {
        select_button: "/audio/FA_Select_Button_1_1.wav",
        potion_seller: "/audio/Potion Seller.mp3",
        tetris: "/audio/Tetris.mp3"
    }
}
