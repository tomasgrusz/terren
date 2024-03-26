"use client";
import styles from "./Menu.module.scss";
import { MdSettings } from "react-icons/md";
import GenerationFields from "./GenerationFields";
import ImportFields from "./ImportFields";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Menu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className={styles.toggle}>
        <Button variant="outline">
          <MdSettings /> Settings
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            Make changes to your configuration here.
          </SheetDescription>
        </SheetHeader>
        <Tabs defaultValue="generate">
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
      </SheetContent>
    </Sheet>
  );
};

export default Menu;
