import { motion } from "framer-motion";

export interface CarouselItem {
  id: number;
  title: string;
}

const RulerLines = ({ top = true, totalLines = 60 }: { top?: boolean; totalLines?: number }) => {
  const lines = [];
  const lineSpacing = 100 / (totalLines - 1);
  for (let i = 0; i < totalLines; i++) {
    const isFifth = i % 5 === 0;
    const isCenter = i === Math.floor(totalLines / 2);
    const height = isCenter ? "h-6" : isFifth ? "h-4" : "h-2";
    const color = isCenter || isFifth ? "bg-white/60" : "bg-white/20";
    lines.push(
      <div
        key={i}
        className={`absolute w-px ${height} ${color} ${top ? "top-0" : "bottom-0"}`}
        style={{ left: `${i * lineSpacing}%` }}
      />
    );
  }
  return <div className="relative w-full h-6">{lines}</div>;
};

export function RulerCarousel({ originalItems }: { originalItems: CarouselItem[] }) {
  // Duplicate once — animate from 0 to -50% for a seamless loop
  const items = [...originalItems, ...originalItems];

  return (
    <div className="w-full py-10">
      <RulerLines top />
      <div className="overflow-hidden py-6">
        <motion.div
          className="flex items-center w-max"
          style={{ gap: "120px" }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          {items.map((item, index) => (
            <span
              key={`${item.id}-${index}`}
              className="text-2xl md:text-4xl font-bold whitespace-nowrap font-mono tracking-wide text-white/70"
            >
              {item.title}
            </span>
          ))}
        </motion.div>
      </div>
      <RulerLines top={false} />
    </div>
  );
}
