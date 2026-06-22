/* A lightweight device bezel wrapping a real app screenshot. */
export function PhoneFrame({ src, alt, className = "", priority = false, width = 421, height = 917 }) {
  return (
    <div
      className={`relative rounded-[2.4rem] border border-border-strong bg-[#0a0a0c] p-2 shadow-[0_30px_80px_-20px_rgb(var(--shadow-tint)/0.45)] ${className}`}
    >
      <div className="relative overflow-hidden rounded-[1.9rem] bg-bg">
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          className="block h-auto w-full select-none"
          draggable={false}
        />
      </div>
    </div>
  );
}
