"use client";

import GeneralSettings from "./GeneralSettings";
import TerrainSettings from "./TerrainSettings";

const GenerationFields = () => {
  return (
    <div className="flex flex-col gap-10">
      <GeneralSettings />
      <TerrainSettings />
    </div>
  );
};

export default GenerationFields;
