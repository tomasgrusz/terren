import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Terren: Map Generator & Visualizer",
    short_name: "Terren",
    description: "The next generation of map generators & visualizers.",
    start_url: "/",
    display: "standalone",
    background_color: "#1E283A",
    theme_color: "#1E283A",

    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
