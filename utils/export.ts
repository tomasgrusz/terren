import { Object3D, Scene, WebGLRenderer } from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { OBJExporter } from "three/examples/jsm/exporters/OBJExporter.js";
import { STLExporter } from "three/examples/jsm/exporters/STLExporter.js";
import { saveAs } from "file-saver";
import { Camera } from "@react-three/fiber";

export const exportGLB = (scene: Scene | Object3D | null, name: string) => {
  if (!scene) {
    return false;
  }
  const exporter = new GLTFExporter();
  exporter.parse(
    scene,
    async function (gltf) {
      const blob = new Blob([gltf as any], { type: "model/gltf-binary" });
      await saveAs(blob, `${name}.glb`);
    },
    function (error) {
      console.log("An error happened", error);
    },
    { binary: true },
  );
  return `${name}.glb`;
};

export const exportOBJ = (scene: Scene | Object3D | null, name: string) => {
  if (!scene) {
    return false;
  }
  const exporter = new OBJExporter();
  const objString = exporter.parse(scene);

  const blob = new Blob([objString], { type: "text/plain" });
  saveAs(blob, `${name}.obj`);
  return `${name}.obj`;
};

export const exportSTL = (scene: Scene | Object3D | null, name: string) => {
  if (!scene) {
    return false;
  }
  const exporter = new STLExporter();
  const stlString = exporter.parse(scene);

  const blob = new Blob([stlString], { type: "application/octet-stream" });
  saveAs(blob, `${name}.stl`);
  return `${name}.stl`;
};

export const exportImage = (gl: WebGLRenderer | null, scene: Scene | Object3D | null, camera: Camera | null, name: string, format: "png" | "jpg" | "webp") => {
  if (!gl || !scene || !camera) {
    return false;
  }

  gl.render(scene, camera);
  gl.domElement.toBlob((blob) => {
    if (blob) {
      saveAs(blob, `${name}.${format}`);
    }
  }, `image/${format}`);
  return `${name}.${format}`;
};