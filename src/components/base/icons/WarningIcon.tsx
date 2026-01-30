type PropTypes = {
  className?: string;
  height?: string | number;
  width?: string | number;
  isActive?: boolean;
};

export default function WarningIcon({
  className,
  height = 24,
  width = 24,
  isActive = false,
}: PropTypes) {
  return (
    <svg
      width={width}
      className={className}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        y="0.5"
        width="24"
        height="24"
        rx="12"
        fill="url(#paint0_linear_warning_icon)"
      />
      <path
        d="M12 8V13M12 17H12.01"
        stroke={isActive ? "#00B4DB" : "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_warning_icon"
          x1={12}
          y1="0.5"
          x2={12}
          y2="24.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={isActive ? "#ffffff" : "#00B4DB"} />
          <stop offset={1} stopColor={isActive ? "#ffffff" : "#038EB7"} />
        </linearGradient>
      </defs>
    </svg>
  );
}
