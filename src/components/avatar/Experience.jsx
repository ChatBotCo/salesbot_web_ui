import {
  ContactShadows,
  Environment,
} from "@react-three/drei";
import { useEffect } from "react";
import { Avatar } from "./Avatar";
import { useThree } from '@react-three/fiber';
import * as THREE from "three";

export const Experience = () => {
  // const cameraControls = useRef();
  // useEffect(() => {
  //   console.log(cameraControls.current.setLookAt)
  //   cameraControls.current.setLookAt(0, 1.5, 1.5, 0, 1.5, 0, false);
  // }, []);
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(-0.1, 1.7, 1.5);
    camera.lookAt(new THREE.Vector3(0, 1.5, 0));
  }, [camera]);
  return (
    <>
      <Environment preset="sunset" />
      <Avatar />
      <ContactShadows opacity={0.7} />
    </>
  );
};
