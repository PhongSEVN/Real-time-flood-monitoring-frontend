type PropTypes = {
  className?: string;
  height?: string | number;
  width?: string | number;
  isActive?: boolean;
};

export default function HomeIcon({
  className,
  height = 24,
  width = 24,
  isActive = false,
}: PropTypes) {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 9.5L12 2.5L21 9.5V20.5C21 20.7652 20.8946 21.0196 20.7071 21.2071C20.5196 21.3946 20.2652 21.5 20 21.5H15V14.5H9V21.5H4C3.73478 21.5 3.48043 21.3946 3.29289 21.2071C3.10536 21.0196 3 20.7652 3 20.5V9.5Z"
        fill="url(#paint0_linear_home_icon)"
        stroke={isActive ? "#00B4DB" : "none"}
        strokeWidth="0"
      />
      <defs>
        <linearGradient
          id="paint0_linear_home_icon"
          x1="12"
          y1="2.5"
          x2="12"
          y2="21.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={isActive ? "#ffffff" : "#00B4DB"} />
          <stop offset="1" stopColor={isActive ? "#ffffff" : "#038EB7"} />
        </linearGradient>
      </defs>
    </svg>
  );
}
