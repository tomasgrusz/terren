import { ReactNode, useState } from "react";
import styles from "./MenuSegments.module.scss";

type MenuSegmentsProps = {
  children: ReactNode[];
};

const MenuSegments: React.FC<MenuSegmentsProps> = ({ children }) => {
  const [segment, setSegment] = useState<number>(0);
  return (
    <div className={styles.MenuSegments}>
      <div className={styles.buttons}>
        <button
          onClick={() => setSegment(0)}
          className={segment === 0 ? styles.active : ""}
        >
          Generate
        </button>
        <button
          onClick={() => setSegment(1)}
          className={segment === 1 ? styles.active : ""}
        >
          Import
        </button>
      </div>
      {children[segment]}
    </div>
  );
};
export default MenuSegments;
