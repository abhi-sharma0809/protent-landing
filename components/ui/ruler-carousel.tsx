import { motion } from "framer-motion";

export interface CarouselItem {
  id: number;
  title: string;
}

const RulerLines = ({ top = true, totalLines = 100 }: { top?: boolean; totalLines?: number }) => {
  const lines = [];
  const lineSpacing = 100 / (totalLines - 1);

  for (let i = 0; i < totalLines; i++) {
    const isFifth = i % 5 === 0;
    const isCenter = i === Math.floor(totalLines / 2);

    let height = "h-3";
    let color = "bg-zinc-300";
    if (isCenter) { height = "h-8"; color = "bg-[#0b5cab]"; }
    else if (isFifth) { height = "h-4"; color = "bg-[#0b5cab]"; }

    lines.push(
      <div
        key={i}
        className={`absolute w-0.5 ${height} ${color} ${top ? "" : "bottom-0"}`}
        style={{ left: `${i * lineSpacing}%` }}
      />
    );
  }

  return <div className="relative w-full h-8 px-4">{lines}</div>;
};

const ITEM_WIDTH = 400;
const ITEM_GAP = 100;
const ITEM_STEP = ITEM_WIDTH + ITEM_GAP;
const SCROLL_DURATION = 18; // seconds for one full loop

export function RulerCarousel({ originalItems }: { originalItems: CarouselItem[] }) {
  // Triple the items so the loop is seamless
  const items = [...originalItems, ...originalItems, ...originalItems];
  const loopWidth = originalItems.length * ITEM_STEP;

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full h-[200px] flex flex-col justify-center relative">
        <RulerLines top />

        {/* Edge fades */}
        <div className="relative w-full flex-1 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-[#fafafa] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-[#fafafa] to-transparent" />

          <div className="flex items-center h-full">
            <motion.div
              className="flex items-center shrink-0"
              style={{ gap: ITEM_GAP }}
              animate={{ x: [0, -loopWidth] }}
              transition={{
                duration: SCROLL_DURATION,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              {items.map((item, index) => (
                <div
                  key={index}
                  className="text-4xl md:text-5xl font-bold whitespace-nowrap text-[#071422] shrink-0 flex items-center justify-center"
                  style={{ width: ITEM_WIDTH }}
                >
                  {item.title}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <RulerLines top={false} />
      </div>
    </div>
  );
}
