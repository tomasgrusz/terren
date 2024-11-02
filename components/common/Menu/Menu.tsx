"use client";
import ExportFields from "./ExportFields";
import GenerationFields from "./GenerationFields";
import ImportFields from "./ImportFields";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Menu = () => {
  return (
    <Tabs defaultValue="generate" className="p-6 max-w-[600px] m-auto">
      <TabsList className="grid w-full grid-cols-3 mt-4 mb-4">
        <TabsTrigger value="generate">Generate</TabsTrigger>
        <TabsTrigger value="import">Import</TabsTrigger>
        <TabsTrigger value="export">Export</TabsTrigger>
      </TabsList>
      <TabsContent value="generate">
        <GenerationFields />
      </TabsContent>
      <TabsContent value="import">
        <ImportFields />
      </TabsContent>
      <TabsContent value="export">
        <ExportFields />
      </TabsContent>
    </Tabs>
  );
};

export default Menu;
