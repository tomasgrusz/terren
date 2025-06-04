"use client";
import { Camera } from "@react-three/fiber";
import { ReactNode, createContext, useState } from "react";
import { Scene, WebGLRenderer } from "three";

const SceneContext = createContext({
  gl: undefined as WebGLRenderer | undefined,
  scene: undefined as Scene | undefined,
  camera: undefined as Camera | undefined,
  setGL: (val: WebGLRenderer) => null as unknown as void,
  setScene: (val: Scene) => null as unknown as void,
  setCamera: (val: Camera) => null as unknown as void,
});

export const SceneContextProvider = ({ children }: { children: ReactNode }) => {
  const [gl, setGL] = useState<WebGLRenderer | undefined>(undefined);
  const [scene, setScene] = useState<Scene | undefined>(undefined);
  const [camera, setCamera] = useState<Camera | undefined>(undefined);

  const context = { gl, scene, camera, setGL, setScene, setCamera };

  return (
    <SceneContext.Provider value={context}>{children}</SceneContext.Provider>
  );
};

export default SceneContext;
