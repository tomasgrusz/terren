"use client";
import GenerationFields from "./GenerationFields";
import ImportFields from "./ImportFields";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Menu = () => {
  return (
    <Tabs defaultValue="generate" className="p-6 max-w-[600px] m-auto">
      <TabsList className="grid w-full grid-cols-2 mt-4 mb-4">
        <TabsTrigger value="generate">Generate</TabsTrigger>
        <TabsTrigger value="import">Import</TabsTrigger>
      </TabsList>
      <TabsContent value="generate">
        <GenerationFields />
      </TabsContent>
      <TabsContent value="import">
        <ImportFields />
      </TabsContent>
    </Tabs>
  );
};

export default Menu;
