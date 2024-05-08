import styles from "@/styles/Selector.module.css";
import Image from "next/image";

interface Props {
  label?: string;
  options: {
    id: number | string;
    name: string;
    icon?: string;
    hideLabel?: boolean;
  }[];
  selected: {}[];
  onChange: (id: any) => void | {};
}

const Selector: React.FC<Props> = ({ label, options, selected, onChange }) => {
  return (
    <div
      style={{ width: label === "Gradient direction" ? "180px" : "" }}
      className={styles.options}
    >
      {options.map((option, i) => (
        <div key={i}>
          <input
            style={{ display: "none" }}
            type={"radio"}
            id={label + option.name}
            name={label}
            value={option.name}
            checked={selected.includes(option.id)}
            onChange={() => onChange && onChange(option.id)}
          ></input>
          <label className={` ${styles.label} `} htmlFor={label + option.name}>
            {option.icon && (
              <Image
                width={10}
                height={10}
                className={styles.icon}
                src={option.icon}
                alt={label + option.name}
              ></Image>
            )}
            {!!option.name && !option.hideLabel && <span>{option.name}</span>}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Selector;
