/** 3d Maths class. Only really used by the WebGL2Renderer class. */
export class m4 {
    static orthographic(left:number, right:number, bottom:number, top:number, near:number, far:number, dst?:number[]): number[] {
        
        dst = dst || [];
    
        dst[ 0] = 2 / (right - left);
        dst[ 1] = 0;
        dst[ 2] = 0;
        dst[ 3] = 0;
        dst[ 4] = 0;
        dst[ 5] = 2 / (top - bottom);
        dst[ 6] = 0;
        dst[ 7] = 0;
        dst[ 8] = 0;
        dst[ 9] = 0;
        dst[10] = 2 / (near - far);
        dst[11] = 0;
        dst[12] = (left + right) / (left - right);
        dst[13] = (bottom + top) / (bottom - top);
        dst[14] = (near + far) / (near - far);
        dst[15] = 1;
    
        return dst;
    }

    static translate(m:number[], tx:number, ty:number, tz:number, dst?:number[]):number[] {
        // This is the optimized version of
        // return multiply(m, translation(tx, ty, tz), dst);
        dst = dst || [];
    
        var m00 = m[0];
        var m01 = m[1];
        var m02 = m[2];
        var m03 = m[3];
        var m10 = m[1 * 4 + 0];
        var m11 = m[1 * 4 + 1];
        var m12 = m[1 * 4 + 2];
        var m13 = m[1 * 4 + 3];
        var m20 = m[2 * 4 + 0];
        var m21 = m[2 * 4 + 1];
        var m22 = m[2 * 4 + 2];
        var m23 = m[2 * 4 + 3];
        var m30 = m[3 * 4 + 0];
        var m31 = m[3 * 4 + 1];
        var m32 = m[3 * 4 + 2];
        var m33 = m[3 * 4 + 3];
    
        if (m !== dst) {
          dst[ 0] = m00;
          dst[ 1] = m01;
          dst[ 2] = m02;
          dst[ 3] = m03;
          dst[ 4] = m10;
          dst[ 5] = m11;
          dst[ 6] = m12;
          dst[ 7] = m13;
          dst[ 8] = m20;
          dst[ 9] = m21;
          dst[10] = m22;
          dst[11] = m23;
        }
    
        dst[12] = m00 * tx + m10 * ty + m20 * tz + m30;
        dst[13] = m01 * tx + m11 * ty + m21 * tz + m31;
        dst[14] = m02 * tx + m12 * ty + m22 * tz + m32;
        dst[15] = m03 * tx + m13 * ty + m23 * tz + m33;
    
        return dst;
    } 

    static scaling(sx:number, sy:number, sz:number, dst?:number[]) {
        dst = dst || [];
    
        dst[ 0] = sx;
        dst[ 1] = 0;
        dst[ 2] = 0;
        dst[ 3] = 0;
        dst[ 4] = 0;
        dst[ 5] = sy;
        dst[ 6] = 0;
        dst[ 7] = 0;
        dst[ 8] = 0;
        dst[ 9] = 0;
        dst[10] = sz;
        dst[11] = 0;
        dst[12] = 0;
        dst[13] = 0;
        dst[14] = 0;
        dst[15] = 1;
    
        return dst;
      }

    static scale(m:number[], sx:number, sy:number, sz:number, dst?:number[]) {
        // This is the optimized version of
        // return multiply(m, scaling(sx, sy, sz), dst);
        dst = dst || [];
    
        dst[ 0] = sx * m[0 * 4 + 0];
        dst[ 1] = sx * m[0 * 4 + 1];
        dst[ 2] = sx * m[0 * 4 + 2];
        dst[ 3] = sx * m[0 * 4 + 3];
        dst[ 4] = sy * m[1 * 4 + 0];
        dst[ 5] = sy * m[1 * 4 + 1];
        dst[ 6] = sy * m[1 * 4 + 2];
        dst[ 7] = sy * m[1 * 4 + 3];
        dst[ 8] = sz * m[2 * 4 + 0];
        dst[ 9] = sz * m[2 * 4 + 1];
        dst[10] = sz * m[2 * 4 + 2];
        dst[11] = sz * m[2 * 4 + 3];
    
        if (m !== dst) {
          dst[12] = m[12];
          dst[13] = m[13];
          dst[14] = m[14];
          dst[15] = m[15];
        }
    
        return dst;
    } 

    static zRotate(m:number[], angleInRadians:number, dst?:number[]) {
        // This is the optimized version of
        // return multiply(m, zRotation(angleInRadians), dst);
        dst = dst || [];
    
        var m00 = m[0 * 4 + 0];
        var m01 = m[0 * 4 + 1];
        var m02 = m[0 * 4 + 2];
        var m03 = m[0 * 4 + 3];
        var m10 = m[1 * 4 + 0];
        var m11 = m[1 * 4 + 1];
        var m12 = m[1 * 4 + 2];
        var m13 = m[1 * 4 + 3];
        var c = Math.cos(angleInRadians);
        var s = Math.sin(angleInRadians);
    
        dst[ 0] = c * m00 + s * m10;
        dst[ 1] = c * m01 + s * m11;
        dst[ 2] = c * m02 + s * m12;
        dst[ 3] = c * m03 + s * m13;
        dst[ 4] = c * m10 - s * m00;
        dst[ 5] = c * m11 - s * m01;
        dst[ 6] = c * m12 - s * m02;
        dst[ 7] = c * m13 - s * m03;
    
        if (m !== dst) {
          dst[ 8] = m[ 8];
          dst[ 9] = m[ 9];
          dst[10] = m[10];
          dst[11] = m[11];
          dst[12] = m[12];
          dst[13] = m[13];
          dst[14] = m[14];
          dst[15] = m[15];
        }
    
        return dst;
    }
}
