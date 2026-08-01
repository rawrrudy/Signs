type Props = {
  time: number;
};

export default function Timer({ time }: Props) {

  let color = "#4CAF50";

  if (time <= 3) color = "#FF9800";
  if (time <= 1.5) color = "#F44336";

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        padding: "12px 28px",
        background: "#222",
        border: "4px solid white",
        borderRadius: 12,
        color,
        fontSize: 42,
        fontWeight: "bold",
        fontFamily: "monospace",
        zIndex: 999999,
      }}
    >
      ⏱ {time.toFixed(1)}
    </div>
  );
}