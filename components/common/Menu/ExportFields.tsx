import { Label } from "@radix-ui/react-label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MdOutlineImage } from "react-icons/md";
import { IoMdLink } from "react-icons/io";
import { BsBadge3D } from "react-icons/bs";
import SceneContext from "@/data/scene-context";
import { exportGLB, exportOBJ, exportImage, exportSTL } from "@/utils/export";
import { toast } from "sonner";

const exportTypes = [
  {
    value: "png",
    label: ".png",
    type: "image",
  },
  {
    value: "jpg",
    label: ".jpg",
    type: "image",
  },
  {
    value: "webp",
    label: ".webp",
    type: "image",
  },
  {
    value: "glb",
    label: ".glb (GLTF Binary)",
    type: "model",
  },
  {
    value: "glb-mesh",
    label: ".glb (mesh-only)",
    type: "model",
  },
  {
    value: "obj",
    label: ".obj (Wavefront OBJ)",
    type: "model",
  },
  {
    value: "obj-mesh",
    label: ".obj (mesh-only)",
    type: "model",
  },
  {
    value: "stl",
    label: ".stl (Stereolithography)",
    type: "model",
  },
  {
    value: "stl-mesh",
    label: ".stl (mesh-only)",
    type: "model",
  },
  {
    value: "link",
    label: "Shareable Link",
    type: "link",
  },
];

const ExportFields = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  const { gl, scene, camera } = useContext(SceneContext);

  const download: Record<string, () => string | false> = {
    png: () =>
      exportImage(gl || null, scene || null, camera || null, "terren", "png"),
    jpg: () =>
      exportImage(gl || null, scene || null, camera || null, "terren", "jpg"),
    webp: () =>
      exportImage(gl || null, scene || null, camera || null, "terren", "webp"),
    glb: () => exportGLB(scene || null, "terren-full"),
    "glb-mesh": () => exportGLB(scene?.children[0] || null, "terren-mesh"),
    obj: () => exportOBJ(scene || null, "terren-full"),
    "obj-mesh": () => exportOBJ(scene?.children[0] || null, "terren-mesh"),
    stl: () => exportSTL(scene || null, "terren-full"),
    "stl-mesh": () => exportSTL(scene?.children[0] || null, "terren-mesh"),
  };

  useEffect(() => {
    if (isExporting) {
      setTimeout(() => {
        const fileName = download[value]();
        setIsExporting(false);
        if (!fileName) {
          toast("Export failed", {
            description: "Please try again",
            action: {
              label: "Cancel",
              onClick: () => {},
            },
          });
          return;
        }
        toast("Export has been downloaded", {
          description: `${fileName} (${new Date().toLocaleString()})`,
          action: {
            label: "Cancel",
            onClick: () => {},
          },
        });
      }, 2000);
    }
  }, [isExporting]);

  return (
    <div className="flex flex-col gap-4">
      <Label htmlFor="exportType">Export as</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between"
          >
            {value
              ? exportTypes.find((type) => type.value === value)?.label
              : "Export as..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder="Search export type..." />
            <CommandList>
              <CommandEmpty>No export type found.</CommandEmpty>
              <CommandGroup>
                {exportTypes.map((type) => (
                  <CommandItem
                    key={type.value}
                    value={type.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={`mr-2 h-4 w-4" ${value === type.value ? "opacity-100" : "opacity-0"}`}
                    />
                    {type.label}
                    {type.type === "image" && (
                      <MdOutlineImage
                        style={{ marginLeft: "auto" }}
                        size={20}
                      />
                    )}
                    {type.type === "model" && (
                      <BsBadge3D style={{ marginLeft: "auto" }} size={20} />
                    )}
                    {type.type === "link" && (
                      <IoMdLink style={{ marginLeft: "auto" }} size={20} />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Button
        onClick={() => setIsExporting(true)}
        disabled={!value || value === "link"}
      >
        {value === "link" ? "Coming Soon" : "Download"}
      </Button>
      {isExporting && (
        <div className="flex items-center gap-4 justify-center">
          <div className="loader"></div> Exporting...
        </div>
      )}
    </div>
  );
};

export default ExportFields;
