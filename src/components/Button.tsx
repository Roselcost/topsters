import styles from "@/styles/Button.module.css";
export default function Button(props: {
  onClick: any;
  selected?: boolean;
  disabled?: boolean;
  children: any;
}) {
  return (
    <>
      <button
        disabled={props.disabled}
        onClick={() => props.onClick()}
        className={`${styles.button} ${props.selected && styles.selected}`}
      >
        {props.children}
      </button>
    </>
  );
}
