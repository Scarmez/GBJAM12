import cauldron from "./sprites/cauldron.js";
import bluewit_frame from "./sprites/bluewit_frame.js";
import c1_egg from "./sprites/c1_egg.js";
import c1_infant from "./sprites/c1_infant.js";
import cursor from "./sprites/cursor.js";
import font_rabbit_var from "./sprites/font_rabbit_var.js";
import rhythm_inputs from "./sprites/rhythm_inputs.js";
import splash from "./sprites/splash.js";
import transition from "./sprites/transition.js";
import health_potion from "./sprites/health_potion.js";
import energy_potion from "./sprites/energy_potion.js";
import mystery_potion from "./sprites/mystery_potion.js";
import c1_final from "./sprites/c1_final.js";
import bg_dots from "./sprites/bg_dots.js";
import shop_bg from "./sprites/shop_bg.js";
import item_select_frame from "./sprites/item_select_frame.js";
import item_frame from "./sprites/item_frame.js";
import pokeframe from "./sprites/pokeframe.js";


export default {
    sprites: {
        frame: bluewit_frame,
        font_rabbit: font_rabbit_var,
        splash: splash,
        cursor: cursor,
        c1_egg: c1_egg,
        c1_infant: c1_infant,
        c1_final: c1_final,
        transition: transition,
        rhythm_inputs: rhythm_inputs,
        cauldron: cauldron,
        health_potion: health_potion,
        energy_potion: energy_potion,
        mystery_potion: mystery_potion,
        bg_dots: bg_dots,
        shop_bg: shop_bg,
        item_select_frame: item_select_frame,
        item_frame: item_frame,
        pokeframe: pokeframe,
    },
    audio: {
        cancel: "/audio/Cancel.mp3",
        click: "/audio/Click.mp3",
        select: "/audio/Select",
        intro_theme: "/audio/Intro_Theme.mp3",
        start_game: "/audio/Start_Game.mp3",
        egg_wobble: "/audio/Egg_Wobble.mp3",
        egg_wobble_big: "/audio/Egg_Wobble_Big.mp3",
        egg_hatch: "/audio/Egg_Wobble_Hatch.mp3",
        home_music: "/audio/Home_Music.mp3",
        the_spooky_squash: "/audio/The_Spooky_Squash.mp3"

    }
}
