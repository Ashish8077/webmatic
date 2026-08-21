import { SlideType } from "./hero.types";

const SlideCounter = ({ current, slides }: { current: number; slides: SlideType[] }) => {
  return (
    <div className="absolute top-6 right-6 z-20 hidden sm:flex items-center gap-2 select-none">
      <span className="text-sm font-bold text-[#0c174c]">
        {String(current + 1)}
      </span>
      <span className="w-8 h-px bg-slate-400/50" />
      <span className="text-xs font-medium text-slate-400">
        {String(slides.length)}
      </span>
    </div>
  );
};

export default SlideCounter;
