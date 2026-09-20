import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "bg-slate-900",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-amber-200 disabled:pointer-events-none ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
