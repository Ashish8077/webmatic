const BackgroundRings = () => {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {[880, 660, 460, 280].map((size) => (
        <div
          key={size}
          className="absolute rounded-full border border-slate-300/20"
          style={{ width: size, height: size }}
        />
      ))}
    </div>
  );
};

export default BackgroundRings;
