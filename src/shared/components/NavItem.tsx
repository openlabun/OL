import { Link } from "react-router-dom";
import React from "react";

interface NavItemProps {
  to: string;
  text: string;
  filled?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, text, filled = false }) => {
  const baseClass = "font-medium tracking-wide transition duration-200";
  const filledClass =
    "inline-flex items-center justify-center w-full h-12 px-6 text-white rounded shadow-md";
  const outlineClass = "text-gray-100 hover:text-deep-purple-accent-400";

  return (
    <li>
      <Link
        to={to}
        aria-label={text}
        title={text}
        className={`${baseClass} ${filled ? filledClass : outlineClass}`}
      >
        {text}
      </Link>
    </li>
  );
};

export default NavItem;
