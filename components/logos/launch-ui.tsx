import React from "react";

const LaunchUI = (props: React.SVGProps<SVGSVGElement>) => {
  // We use a unique ID for the clip path to prevent conflicts if you use this icon multiple times
  const clipId = "cat-icon-clip";

  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        {/* This defines the shape of the mask (rounded rectangle) */}
        <clipPath id={clipId}>
          {/* Change 'rx' value to adjust roundness (e.g., 12 = circle, 0 = square) */}
          <rect width="24" height="24" rx="6" />
        </clipPath>
      </defs>

      {/* The Image linked to the clipPath */}
      <image
        href="https://cdn.prod.website-files.com/6841975dea69bbbf4322c912/68419acec127db920f8d7757_lessnoteicon.png"
        width="24"
        height="24"
        clipPath={`url(#${clipId})`}
        preserveAspectRatio="xMidYMid slice" 
      />
    </svg>
  );
};

export default LaunchUI;