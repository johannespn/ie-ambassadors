import React from "react";

interface ContainerProps
  extends React.FC<{ children: React.ReactNode; className?: string }> {}

export const BlueHeadingContainer: ContainerProps = ({ children, className }) => {
  return (
    <div
      className={`px-5 py-3 text-white bg-blue-900 text-center font-serif${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </div>
  );
};
