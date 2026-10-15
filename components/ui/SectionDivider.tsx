interface SectionDividerProps {
  topColor: string;
  bottomColor: string;
}

export default function SectionDivider({ topColor, bottomColor }: SectionDividerProps) {
  return (
    <div 
      className="w-full h-[40px] overflow-hidden leading-[0] -mt-[1px] -mb-[1px] relative z-20"
      style={{ backgroundColor: topColor }}
    >
      <svg
        className="block w-full h-full"
        viewBox="0 0 1440 40"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 40 L0 0 L800 0 L840 40 Z"
          fill={bottomColor}
        />
      </svg>
    </div>
  );
}
