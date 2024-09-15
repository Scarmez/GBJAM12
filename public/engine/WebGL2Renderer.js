import { Renderer } from "./Renderer.js";
import { Sprite } from "./Sprite.js";
import { m4 } from "./M4.js";
/** A Renderer that uses WebGL2. */
export class WebGL2Renderer extends Renderer {
    _program;
    _gl;
    _vao;
    _matrixLocation;
    _textureLocation;
    _paletteLocation;
    _textureMatrixLocation;
    constructor(gfxManager, context) {
        super(gfxManager);
        this._gl = context;
        this._program = this.createProgramFromSources(this._gl, this.vertexShaderSource, this.fragmentShaderSource);
        // look up where the vertex data needs to go.
        var positionAttributeLocation = this._gl.getAttribLocation(this._program, "a_position");
        var texcoordAttributeLocation = this._gl.getAttribLocation(this._program, "a_texcoord");
        // lookup uniforms
        this._matrixLocation = this._gl.getUniformLocation(this._program, "u_matrix");
        this._textureLocation = this._gl.getUniformLocation(this._program, "u_texture");
        this._textureMatrixLocation = this._gl.getUniformLocation(this._program, "u_textureMatrix");
        this._paletteLocation = this._gl.getUniformLocation(this._program, "u_palette");
        // Create a vertex array object (attribute state)
        this._vao = this._gl.createVertexArray();
        // and make it the one we're currently working with
        this._gl.bindVertexArray(this._vao);
        // create the position buffer, make it the current ARRAY_BUFFER
        // and copy in the color values
        var positionBuffer = this._gl.createBuffer();
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, positionBuffer);
        // Put a unit quad in the buffer
        var positions = [
            0, 0,
            0, 1,
            1, 0,
            1, 0,
            0, 1,
            1, 1,
        ];
        this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(positions), this._gl.STATIC_DRAW);
        // Turn on the attribute
        this._gl.enableVertexAttribArray(positionAttributeLocation);
        // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        var size = 2; // 2 components per iteration
        var type = this._gl.FLOAT; // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0; // start at the beginning of the buffer
        this._gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
        // create the texcoord buffer, make it the current ARRAY_BUFFER
        // and copy in the texcoord values
        var texcoordBuffer = this._gl.createBuffer();
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, texcoordBuffer);
        // Put texcoords in the buffer
        var texcoords = [
            0, 0,
            0, 1,
            1, 0,
            1, 0,
            0, 1,
            1, 1,
        ];
        this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(texcoords), this._gl.STATIC_DRAW);
        // Turn on the attribute
        this._gl.enableVertexAttribArray(texcoordAttributeLocation);
        // Tell the attribute how to get data out of texcoordBuffer (ARRAY_BUFFER)
        var size = 2; // 3 components per iteration
        var type = this._gl.FLOAT; // the data is 32bit floats
        var normalize = true; // convert from 0-255 to 0.0-1.0
        var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next color
        var offset = 0; // start at the beginning of the buffer
        this._gl.vertexAttribPointer(texcoordAttributeLocation, size, type, normalize, stride, offset);
        this._gl.viewport(0, 0, this._gl.canvas.width, this._gl.canvas.height);
        this._gl.enable(this._gl.BLEND);
        this._gl.blendFunc(this._gl.SRC_ALPHA, this._gl.ONE_MINUS_SRC_ALPHA);
        this._gl.useProgram(this._program);
    }
    createProgramFromSources(gl, vertexSource, fragmentSource) {
        const shaders = [];
        shaders.push(this.loadShader(gl, vertexSource, gl.VERTEX_SHADER));
        shaders.push(this.loadShader(gl, fragmentSource, gl.FRAGMENT_SHADER));
        return this.createProgram(gl, shaders);
    }
    createProgram(gl, shaders) {
        const program = this._gl.createProgram();
        if (!program) {
            console.error(`Error with WebGL2 create Program.`);
            return null;
        }
        shaders.forEach(function (shader) {
            gl.attachShader(program, shader);
        });
        this._gl.linkProgram(program);
        // Check the link status
        const linked = this._gl.getProgramParameter(program, this._gl.LINK_STATUS);
        if (!linked) {
            // something went wrong with the link
            const lastError = this._gl.getProgramInfoLog(program);
            console.error(`Error in program linking: ${lastError}`);
            this._gl.deleteProgram(program);
            return null;
        }
        return program;
    }
    loadShader(gl, shaderSource, shaderType) {
        // Create the shader object
        const shader = gl.createShader(shaderType);
        if (!shader) {
            console.error(`Error creating ${shaderType} empty shader!`);
            return null;
        }
        // Load the shader source
        gl.shaderSource(shader, shaderSource);
        if (gl.getShaderInfoLog(shader))
            console.log(gl.getShaderInfoLog(shader));
        // Compile the shader
        gl.compileShader(shader);
        if (gl.getShaderInfoLog(shader))
            console.log(gl.getShaderInfoLog(shader));
        // Check the compile status
        const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!compiled) {
            console.error(`Error creating ${shaderType} shader!`);
            return null;
        }
        return shader;
    }
    drawImage(sprite, srcX, srcY, srcWidth, srcHeight, dstX, dstY, dstWidth, dstHeight, flipX, flipY, srcRotation) {
        if (srcX === undefined) {
            srcX = 0;
        }
        if (srcY === undefined) {
            srcY = 0;
        }
        if (dstX === undefined) {
            dstX = srcX;
        }
        if (dstY === undefined) {
            dstY = srcY;
        }
        if (srcWidth === undefined) {
            srcWidth = sprite.frameWidth;
        }
        if (srcHeight === undefined) {
            srcHeight = sprite.frameHeight;
        }
        if (dstWidth === undefined) {
            dstWidth = srcWidth;
            srcWidth = sprite.frameWidth;
        }
        if (dstHeight === undefined) {
            dstHeight = srcHeight;
            srcHeight = sprite.frameHeight;
        }
        if (srcRotation === undefined) {
            srcRotation = 0;
        }
        if (flipX) {
            dstX += dstWidth;
            dstWidth *= -1;
        }
        if (flipY) {
            dstY += dstHeight;
            dstHeight *= -1;
        }
        this._gl.useProgram(this._program);
        // Setup the attributes for the quad
        this._gl.bindVertexArray(this._vao);
        // The the shader we're putting the texture on texture unit 0
        this._gl.uniform1i(this._textureLocation, 0);
        // Bind the texture to texture unit 0
        this._gl.activeTexture(this._gl.TEXTURE0);
        this._gl.bindTexture(this._gl.TEXTURE_2D, sprite.texture);
        // this matrix will convert from pixels to clip space
        let matrix = m4.orthographic(0, this.gfxManager.width, this.gfxManager.height, 0, -1, 1);
        // translate our quad to dstX, dstY
        matrix = m4.translate(matrix, dstX, dstY, 0);
        // scale our 1 unit quad
        // from 1 unit to dstWidth, dstHeight units
        matrix = m4.scale(matrix, dstWidth, dstHeight, 1);
        // Set the matrix.
        this._gl.uniformMatrix4fv(this._matrixLocation, false, matrix);
        // just like a 2d projection matrix except in texture space (0 to 1)
        // instead of clip space. This matrix puts us in pixel space.
        let texMatrix = m4.scaling(1 / sprite.width, 1 / sprite.height, 1);
        // We need to pick a place to rotate around
        // We'll move to the middle, rotate, then move back
        texMatrix = m4.translate(texMatrix, sprite.width * 0.5, sprite.height * 0.5, 0);
        texMatrix = m4.zRotate(texMatrix, srcRotation);
        texMatrix = m4.translate(texMatrix, sprite.width * -0.5, sprite.height * -0.5, 0);
        // because were in pixel space
        // the scale and translation are now in pixels
        texMatrix = m4.translate(texMatrix, srcX, srcY, 0);
        texMatrix = m4.scale(texMatrix, srcWidth, srcHeight, 1);
        // Set the texture matrix.
        this._gl.uniformMatrix4fv(this._textureMatrixLocation, false, texMatrix);
        // draw the quad (2 triangles, 6 vertices)
        var offset = 0;
        var count = 6;
        this._gl.drawArrays(this._gl.TRIANGLES, offset, count);
    }
    setPalette(palette) {
        this._gl.uniform4fv(this._paletteLocation, palette.floatRGB);
    }
    clearScreen(colour) {
        this._gl.clearColor(colour.rf, colour.gf, colour.bf, colour.af);
        this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
    }
    createSprite(spriteData) {
        let tex = this._gl.createTexture();
        this._gl.bindTexture(this._gl.TEXTURE_2D, tex);
        this._gl.texImage2D(this._gl.TEXTURE_2D, 0, this._gl.ALPHA, spriteData.width, spriteData.height, 0, this._gl.ALPHA, this._gl.UNSIGNED_BYTE, new Uint8Array(spriteData.pixels));
        this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, this._gl.NEAREST);
        this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, this._gl.NEAREST);
        if (spriteData.repeat) {
            this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_S, this._gl.REPEAT);
            this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_T, this._gl.REPEAT);
        }
        else {
            this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_S, this._gl.CLAMP_TO_EDGE);
            this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_T, this._gl.CLAMP_TO_EDGE);
        }
        let sprite = new Sprite(spriteData);
        sprite.texture = tex;
        return sprite;
    }
    vertexShaderSource = `#version 300 es

    in vec4 a_position;
    in vec2 a_texcoord;
    
    uniform mat4 u_matrix;
    uniform mat4 u_textureMatrix;
    
    out vec2 v_texcoord;
    
    void main() {
        gl_Position = u_matrix * a_position;
        v_texcoord = (u_textureMatrix * vec4(a_texcoord, 0, 1)).xy;
    }
    `;
    fragmentShaderSource = `#version 300 es
    precision lowp float;
    
    in vec2 v_texcoord;
    
    uniform sampler2D u_texture;
    uniform vec4[5] u_palette;
    
    out vec4 outColour;
    
    void main() {
        int index = int(texture(u_texture, v_texcoord).a * 255.0);
        outColour = u_palette[index];
    }
    `;
}
