import * as THREE from './lib/threejs/three.module.js';
import { MoveManager } from './lib/playerControl/MoveManager.js';
import { RoomManager } from './room/RoomManager.js';
import { PosterManager } from './poster/PosterManager.js';

class Main {

    constructor() {

        this.VR = false;
        this.showFPS = true;
        this.fpsInterval;
        this.scene = new THREE.Scene();
        this.camera;
        this.renderer;
        this.stereoEffect;
        this.winWidth = window.innerWidth;
        this.winHeight = window.innerHeight;

        this.roomManager;
        this.posterManager;

        this.initCamera();
        this.initLight();
        this.initRenderer();

    }

    async initScene() {

        const axesHelper = new THREE.AxesHelper( 50 );
        this.scene.add( axesHelper );

        this.roomManager = new RoomManager();
        this.scene.add(this.roomManager.scene);
        await this.roomManager.loadFirstResource();
        await this.roomManager.loadOtherResource();
        await this.roomManager.createObjects();

        this.posterManager = new PosterManager();
        this.scene.add(this.posterManager.scene);
        await this.posterManager.loadPoster();

        this.scene.traverse( node => {
            if(node.uuid == "ED162248-019D-4CA2-AB4D-2B5F6147624D") console.log(node)
        })

    }

    preview() {

        let scope = this;
        let movePath = [
            

        ];

        let funcArr = new Array( movePath.length );
        funcArr[0] = function() {  }
        new MoveManager(this.camera, movePath, funcArr);

    }

    initCamera() {

        this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.camera.position.set( -10 , 2, 0 );
        this.camera.rotation.set( 0, -Math.PI / 2, 0 );

    }

    initLight() {

        // const ambientLight = new THREE.AmbientLight( 0xffffff , 1 );
        // this.scene.add( ambientLight );

        const pointLight1 = new THREE.PointLight( 0xffffff, 1 );
        pointLight1.position.set( 20, 10, 20 );
        this.scene.add( pointLight1 );

        const pointLight2 = new THREE.PointLight( 0xffffff, 1 );
        pointLight2.position.set( -20, 10, -20 );
        this.scene.add( pointLight2 );

        // pointLight.castShadow = true;
        // pointLight.shadow.camera.near = 1200;
        // pointLight.shadow.camera.far = 2500;
        // pointLight.shadow.bias = 0.0001;

        // pointLight.shadow.mapSize.width = this.winWidth;
        // pointLight.shadow.mapSize.height = this.winHeight;

    }

    initRenderer() {

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true});
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( this.winWidth, this.winHeight );
        document.body.appendChild( this.renderer.domElement );

        // this.renderer.shadowMap.enabled = true;
        // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.autoClear = false;
        this.renderer.outputEncoding = THREE.sRGBEncoding;

        if ( this.VR ) this.stereoEffect = new THREE.StereoEffect( this.renderer );

    }

    render() {

        let scope = this, update = true;
        let frameIndex = 0, frameIndexPre = 0;
        const fpsTag = document.getElementById("fps");

        render();
        
        if (this.showFPS) this.fpsInterval = setInterval(computeFPS, 1000);

        function render() {
            if ( window.drawFrustum ) {
                scope.drawFrustum();
                window.drawFrustum = false;
                update = false;
            }
            frameIndex++;
            
            if( scope.VR ) scope.stereoEffect.render(scope.scene, scope.camera);
            else scope.renderer.render(scope.scene, scope.camera);
            if ( window.innerWidth != scope.winWidth || window.innerHeight != scope.winHeight ) onResize();
            requestAnimationFrame( render );
        }

        function computeFPS() {
            fpsTag.innerHTML = `FPS: ${frameIndex - frameIndexPre}`;
            frameIndexPre = frameIndex;
        }

        function onResize() {
            scope.winWidth = window.innerWidth;
            scope.winHeight = window.innerHeight;

            scope.camera.aspect = scope.winWidth / scope.winHeight;
            scope.camera.updateProjectionMatrix();

            scope.renderer.setSize( scope.winWidth, scope.winHeight );
        }

    }

    getStatics() {

        let info = StatisticsUtils.statistic(this.scene);
        console.log(info)

    }

    drawFrustum() {

        let helper = new THREE.CameraHelper( this.camera );
        helper.matrix = this.camera.matrixWorld.clone();
        helper.matrixAutoUpdate = false;
        this.scene.add( helper );
    }

    stopShowFPS() {

        this.showFPS = false;
        clearInterval(this.fpsInterval);

    }
}

/**
 * Util class to statistic components and index of a scene
 */
class StatisticsUtils {
    /**
     * Statistics components and index of a scene
     */
    static statistic(scene) {
        const info = { components: 0, index: 0 }
        scene.traverse((object) => {
            StatisticsUtils.getObjectInfo(object, info)
        })
        return info
    }

    /**
     * Gets components and index number of a object (not including its children)
     */
    static getObjectInfo (object, info) {
        // only count in Mesh and Line
        if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
            info.components++
            if (object.geometry instanceof THREE.BufferGeometry) {
                const geom = object.geometry
                if (geom.index && geom.index.count) {
                    info.index += geom.index.count
                } else if (geom.attributes.position) {
                    const pos = geom.attributes.position
                    if (pos.count && pos.itemSize) {
                        info.index += Math.round(pos.count / pos.itemSize)
                    }
                }
            }
            if (object.geometry instanceof THREE.InstancedBufferGeometry) {
                console.log(object)
            }
        }
    }
}

export { Main };
