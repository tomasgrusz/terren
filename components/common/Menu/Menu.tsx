"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./Menu.module.scss";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { MdSettings } from "react-icons/md";
import NoiseMapContext from "../NoiseMap/NoiseMapContext";
import GenerationFields from "./GenerationFields";
import ImportFields from "./ImportFields";
import MenuSegments from "../MenuSegments";

export type Inputs = {
  size: string;
  height: string;
  seed: string;
};

const Menu = () => {
  const { watch, handleSubmit, register } = useForm<Inputs>();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [_noiseMap] = useState<number[]>([]);
  const [, setNoiseMap] = useContext(NoiseMapContext);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (_noiseMap.length > 0) {
      current.delete("size");
      current.delete("height");
      current.delete("seed");
      setNoiseMap(_noiseMap);
    }

    if (!data) {
      current.delete("size");
      current.delete("height");
      current.delete("seed");
    } else {
      for (const property in data) {
        current.set(property, data[property as keyof Inputs]);
      }
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

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
      <motion.form
        className={styles.Menu}
        onSubmit={handleSubmit(onSubmit)}
        animate={isOpen ? "open" : "closed"}
        initial={"closed"}
        variants={variants}
      >
        <MenuSegments>
          <GenerationFields register={register} watch={watch} />
          <ImportFields register={register} watch={watch} />
        </MenuSegments>
        <input type="submit" value="Generate" className={styles.submit}></input>
      </motion.form>
    </>
  );
};

export default Menu;
