type Props = {
  label: string;
  image: string;
  onClick: () => void;
};

export default function SignButton({
  label,
  image,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 140,
        height: 160,
        borderRadius: 12,
        border: "4px solid #222",
        background: "#f4f4f4",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: 10,
        transition: "0.15s",
      }}
    >
      <img
        src={image}
        alt={label}
        style={{
          width: 72,
          height: 72,
          imageRendering: "pixelated",
        }}
      />

      <span
        style={{
          fontWeight: "bold",
          fontSize: 16,
          color: "#222",
          textAlign: "center",
        }}
      >
        {label}
      </span>
    </button>
  );
}