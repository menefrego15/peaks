import React from "react";

type ButtonProps = {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  className?: string;
};

const variants = {
  primary: "bg-[#f0141e] hover:bg-[#f0141f97] text-black",
  secondary: "bg-black text-white hover:bg-[#f0141e]",
};

const Button = ({
  label,
  onClick,
  className,
  variant = "secondary",
  ...props
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      {...props}
      className={`${variants[variant]} uppercase px-6 py-2 disabled:opacity-25 rounded-xl border border-[#f0141e] flex items-center justify-center ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
