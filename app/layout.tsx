import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SettingsContextProvider } from "@/data/settings-context";
import { SceneContextProvider } from "@/data/scene-context";
import { Toaster } from "@/components/ui/sonner";
import { MeshContextProvider } from "@/data/mesh-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Terren: Map Generator & Visualizer",
  description: "The next generation of map generators & visualizers.",
  applicationName: "terren",
  authors: [{ name: "Tomáš Grusz" }],
  keywords:
    "map, generator, procedural, 3d, visualiser, terrain, heightmap, react, threejs, nextjs, typescript",
  viewport: { width: "device-width", initialScale: 1 },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://terren.grusz.dev" },
  openGraph: {
    type: "website",
    url: "https://terren.grusz.dev",
    title: "Terren: Map Generator & 3D Visualizer",
    description: "The next generation of map generators & visualizers.",
    siteName: "Terren",
    locale: "en_IE",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@gruszdev",
    title: "Terren: Map Generator & 3D Visualizer",
    description: "The next generation of map generators & visualizers.",
  },
  other: {
    "msapplication-TileColor": "#191724",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SettingsContextProvider>
          <MeshContextProvider>
            <SceneContextProvider>
              {children}
              <Toaster />
            </SceneContextProvider>
          </MeshContextProvider>
        </SettingsContextProvider>
      </body>
    </html>
  );
}
