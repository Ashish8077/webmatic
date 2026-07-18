import { SlideType } from "./hero.types";

const DecorativeShapes = ({ current, slides }: { current: number; slides: SlideType[] }) => {
  return (
    <>
      <div className="pointer-events-none absolute -left-8 top-28 h-24 w-24 rounded-full border-[14px] border-[#0c174c]/60 hidden sm:block" />
      <div className="pointer-events-none absolute left-36 top-[54%] h-24 w-10 -rotate-[35deg] rounded-xl bg-sky-500/70 shadow-xl hidden lg:block" />
      <div className="pointer-events-none absolute right-8 top-40 h-20 w-20 rotate-45 rounded-full border-[14px] border-orange-400/70 hidden sm:block" />
      <div className="pointer-events-none absolute right-56 top-[60%] h-16 w-16 rotate-12 bg-indigo-500/70 [clip-path:polygon(50%_0%,100%_38%,82%_100%,18%_100%,0%_38%)] hidden lg:block" />

      {/*Slide counter (desktop)*/}
      <div className="absolute top-6 right-6 z-20 hidden sm:flex items-center gap-2 select-none">
        <span className="text-sm font-bold text-[#0c174c]">
          {String(current + 1)}
        </span>
        <span className="w-8 h-px bg-slate-400/50" />
        <span className="text-xs font-medium text-slate-400">
          {String(slides.length)}
        </span>
      </div>
    </>
  );
};

export default DecorativeShapes;
