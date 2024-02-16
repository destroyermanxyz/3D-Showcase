export default [
    // {
    //     name: 'environmentMapTexture',
    //     type: 'cubeTexture',
    //     path:
    //     [
    //         'textures/environmentMap/px.jpg',
    //         'textures/environmentMap/nx.jpg',
    //         'textures/environmentMap/py.jpg',
    //         'textures/environmentMap/ny.jpg',
    //         'textures/environmentMap/pz.jpg',
    //         'textures/environmentMap/nz.jpg'
    //     ]
    // },
    // {
    //     name: 'grassColorTexture',
    //     type: 'texture',
    //     path: 'textures/dirt/color.jpg'
    // },
    // {
    //     name: 'grassNormalTexture',
    //     type: 'texture',
    //     path: 'textures/dirt/normal.jpg'
    // },
    // {
    //     name: 'foxModel',
    //     type: 'gltfModel',
    //     path: 'models/Fox/glTF/Fox.gltf'
    // }

    // {
    //     name: "floorPath",
    //     type: "gltfModel",
    //     path: "/models/floor_path.glb",
    // },
    {
        name: "envMap",
        type: "hdri",
        path: "env.hdr",
    },
    { name: "background", type: "texture", path: "/background.webp" },
    {
        name: "space",
        type: "gltfModel",
        path: "/models/space/space.gltf",
    },
];
