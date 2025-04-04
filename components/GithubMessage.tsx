"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { Toaster } from "./ui/sonner";
import { FaGithub } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const GithubMessage = () => {
  useEffect(() => {
    setTimeout(() => {
      toast("Enjoying this project?", {
        description: "Support me by starring Terren on GitHub ⭐️.",
        cancel: {
          label: "Visit GitHub",
          onClick: () =>
            window.open(
              "https://github.com/tomasgrusz/terren",
              "_blank",
              "noopener,noreferrer",
            ),
        },
        action: {
          label: "Cancel",
          onClick: () => {},
        },
        actionButtonStyle: {
          backgroundColor: "transparent",
          border: "1px solid #ddd",
          color: "#ddd",
        },
        duration: 300000,
        icon: <FaGithub size={16} />,
      });
    }, 20000);
  }, []);

  return (
    <>
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href="https://github.com/tomasgrusz/terren"
              target="_blank"
              rel="noreferrer noopener"
              className="fixed top-4 left-4"
              aria-label="Visit Terren on GitHub"
            >
              <FaGithub size={20} />
            </a>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Visit Terren on GitHub</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Toaster></Toaster>
    </>
  );
};

export default GithubMessage;
