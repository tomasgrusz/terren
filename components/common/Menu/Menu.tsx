"use client";
import styles from "./Menu.module.scss";
import { motion } from "framer-motion";
import { useState } from "react";
import { MdSettings } from "react-icons/md";
import GenerationFields from "./GenerationFields";
import ImportFields from "./ImportFields";
import MenuSegments from "../MenuSegments";

const Menu = () => {
  const variants = {
    open: { opacity: 1, x: 0, transition: { stiffness: 10, duration: 0.15 } },
    closed: {
      opacity: 0,
      x: "100%",
      transition: { stiffness: 10, duration: 0.15 },
    },
  };
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div
        className={`${styles.toggle} ${isOpen && styles.active}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <MdSettings />
      </div>
      <motion.div
        className={styles.Menu}
        animate={isOpen ? "open" : "closed"}
        initial={"closed"}
        variants={variants}
      >
        <MenuSegments>
          <GenerationFields />
          <ImportFields />
        </MenuSegments>
      </motion.div>
    </>
  );
};

export default Menu;
