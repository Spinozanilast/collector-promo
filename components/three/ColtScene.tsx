"use client";

import { useEffect, useRef } from "react";
import { RGBELoader } from "three/examples/jsm/Addons.js";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

type Props = {
  position: string;
  zIndex: string;
};

const ThreeColtScene: React.FC<Props> = ({ position, zIndex }: Props) => {
  const sceneRef = useRef<HTMLDivElement>(null);

  const initScene = async () => {
    if (!sceneRef.current) return;

    const scene = new THREE.Scene();
    const canvasElement = document.createElement("canvas") as HTMLCanvasElement;

    const camera = createPerspectiveCamera({
      fov: 80,
      aspect: 2,
      near: 1,
      far: 100,
    });

    camera.position.set(0, 5, 10);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvasElement,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const light = new THREE.PointLight(0xffffff, 1, 100);
    scene.add(light);

    await loadHDRBackground(scene, renderer);
    await loadColtAsset(scene, { x: 0, y: 5, z: 0 });

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    addEventListener("resize", () => {
      const { width, height } = getCanvasComputedDimension(renderer.domElement);

      camera.updateProjectionMatrix();
      camera.aspect = width / height;

      renderer.setSize(width, height);
    });

    canvasElement.style.position = position;
    canvasElement.style.zIndex = zIndex;
    sceneRef.current?.appendChild(canvasElement);
    animate();
  };

  useEffect(() => {
    initScene();
    return () => {
      if (sceneRef.current?.children[0]) {
        sceneRef.current.removeChild(sceneRef.current.children[0]);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position, zIndex]);

  return <div ref={sceneRef} />;
};

function createPerspectiveCamera(cameraProps: {
  fov: number;
  aspect: number;
  near: number;
  far: number;
}): THREE.PerspectiveCamera {
  return new THREE.PerspectiveCamera(
    cameraProps.fov,
    cameraProps.aspect,
    cameraProps.near,
    cameraProps.far
  );
}

async function loadColtAsset(
  mainScene: THREE.Scene,
  startPositionPoint?: { x: number; y: number; z: number }
) {
  const loader = new GLTFLoader();
  const coltUrl = "colt/colt-asset.glb";
  positionColtAsset(loader, coltUrl, mainScene, startPositionPoint);
}

function positionColtAsset(
  loader: GLTFLoader,
  coltUrl: string,
  mainScene: THREE.Scene,
  startPositionPoint: { x: number; y: number; z: number } | undefined
) {
  loader.load(coltUrl, function (gltf) {
    const coltScene = gltf.scene;
    mainScene.add(coltScene);
    coltScene.position.set(
      startPositionPoint?.x || 0,
      startPositionPoint?.y || 0,
      startPositionPoint?.z || 0
    );
    coltScene.rotateZ(Math.PI / 2);
  });
}

async function loadHDRBackground(
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer
) {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  new RGBELoader()
    .setDataType(THREE.HalfFloatType)
    .setPath("hdr/")
    .load("blaubeuren_church_square_1k.hdr", function (texture) {
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      scene.environment = envMap;
      texture.dispose();
      pmremGenerator.dispose();
    });
}

function getCanvasComputedDimension(canvas: HTMLCanvasElement): {
  width: number;
  height: number;
} {
  const width = parseInt(window.getComputedStyle(canvas).width);
  const height = parseInt(window.getComputedStyle(canvas).height);
  return { width, height };
}

export default ThreeColtScene;
