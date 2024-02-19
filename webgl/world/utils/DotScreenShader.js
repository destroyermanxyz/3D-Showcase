import { Vector2, Vector4 } from "three";

/**
 * Dot screen shader
 * based on glfx.js sepia shader
 * https://github.com/evanw/glfx.js
 */

const DotScreenShader = {
    uniforms: {
        tDiffuse: { value: null },
        tSize: { value: new Vector2(256, 256) },
        center: { value: new Vector2(0.5, 0.5) },
        angle: { value: 1.57 },
        scale: { value: 1.0 },
        uResolution: { value: new Vector4() },
        uCircleScale: { value: 0 },
    },

    vertexShader: /* glsl */ `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

    fragmentShader: /* glsl */ `

		uniform vec2 center;
		uniform float angle;
		uniform float scale;
		uniform vec2 tSize;
		uniform vec4 uResolution;
		uniform float uCircleScale;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		float pattern() {

			float s = sin( angle ), c = cos( angle );

			vec2 tex = vUv * tSize - center;
			vec2 point = vec2( c * tex.x - s * tex.y, s * tex.x + c * tex.y ) * scale;

			return ( sin( point.x ) * sin( point.y ) ) * 4.0;

		}

		float random(vec2 st) {
			return fract(sin(dot(st.xy,
								 vec2(12.9898,78.233)))*
				43758.5453123);
		}

		void main() {

			vec2 viewportUv = gl_FragCoord.xy / uResolution.xy;
			float viewportAspect = uResolution.x / uResolution.y;

			vec2 centerPoint = vec2(0.5, 0.5);
			float circleRadius = max(0., uCircleScale / uResolution.x);

			vec2 shapeUv = viewportUv - centerPoint;
			shapeUv /= vec2(1., viewportAspect);
			shapeUv += centerPoint;

			float dist = distance(shapeUv, centerPoint);
			dist = 1.-  smoothstep(circleRadius, circleRadius + 0.1, dist);
			


			vec4 color = texture2D( tDiffuse, vUv);

			vec2 uvRandom = vUv;

			color.rgb += random(uvRandom) * 0.015;

			vec4 mixing = mix( vec4(0.,0.,0.,1.), color, dist);

			gl_FragColor = mixing;
		}`,
};

export { DotScreenShader };
