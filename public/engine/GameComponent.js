export class GameComponent {
    gameObject;
    /** Override this function to get called by the GameLoop */
    update(delta) { }
    /** Override this function to get called by the GameLoop */
    draw(gfx) { }
}
