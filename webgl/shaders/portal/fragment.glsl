uniform float uTime;
uniform sampler2D tDiffuse;
uniform vec2 uResolution;

varying vec2 vUv;
varying vec3 vPosition;

void main() {
    // vec2 uv = (vUv - vec2(0.5)) * uResolution.zw + vec2(0.5);

    vec2 uv = gl_FragCoord.xy / uResolution.xy;

    vec4 text = texture2D(tDiffuse, uv);

    gl_FragColor = vec4(vUv, 0.0, 1.0);
    gl_FragColor = text;
}