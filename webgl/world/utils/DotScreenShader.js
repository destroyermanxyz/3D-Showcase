/**
 * Dot screen shader
 * based on glfx.js sepia shader
 * https://github.com/evanw/glfx.js
 */

const DotScreenShader = {
    uniforms: {
        tDiffuse: { value: null },
    },

    vertexShader: /* glsl */ `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

    fragmentShader: /* glsl */ `
		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		float random(vec2 st) {
			return fract(sin(dot(st.xy,
								 vec2(12.9898,78.233)))*
				43758.5453123);
		}

		void main() {
			vec4 color = texture2D( tDiffuse, vUv);

			vec2 uvRandom = vUv;

			color.rgb += random(uvRandom) * 0.015;

			gl_FragColor = color;
		}`,
};

export { DotScreenShader };
