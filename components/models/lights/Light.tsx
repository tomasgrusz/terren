const Light = () => {
  return (
    <>
      <ambientLight intensity={0.75} />
      <spotLight
        color={0xfff}
        intensity={1}
        position={[5, 5, 5]}
        castShadow
        penumbra={0.9}
        shadow-bias={-0.00001}
        distance={20}
        decay={0.75}
      />
      <spotLight
        color={0xfff}
        intensity={1}
        position={[-5, 5, 5]}
        castShadow
        penumbra={0.9}
        shadow-bias={-0.00001}
        distance={20}
        decay={0.75}
      />
      <spotLight
        color={0xfff}
        intensity={1}
        position={[5, 5, -5]}
        castShadow
        penumbra={0.9}
        shadow-bias={-0.00001}
        distance={20}
        decay={0.75}
      />
      <spotLight
        color={0xfff}
        intensity={1}
        position={[-5, 5, -5]}
        castShadow
        penumbra={0.9}
        shadow-bias={-0.00001}
        distance={20}
        decay={0.75}
      />
    </>
  );
};

export default Light;
