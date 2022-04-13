import * as THREE from './lib/threejs/three.module.js';
import { GLTFLoader } from './lib/threejs/GLTFLoader.js';

function loadGLB( path ) {

    return new Promise( (resolve, reject) => { 
        const modelLoader = new GLTFLoader();
        modelLoader.load( path, gltf => {
            resolve( gltf );
        } );
    } );

}

function loadJSON( path ) {

    return new Promise( (resolve, reject) => { 
        const loader = new THREE.FileLoader();
        loader.load( path, data => {
            const json = JSON.parse( data );
            resolve( json );
        } );
    } );

}

function loadTexture( path ) {

    return new Promise( (resolve, reject) => {
        new THREE.TextureLoader().load(
            path,
            texture => { // onLoad
                resolve( texture );
            }, 
            null, // onProgress
            error => reject( error ) // onError
        )
    });
    
}

export { loadGLB, loadJSON, loadTexture };