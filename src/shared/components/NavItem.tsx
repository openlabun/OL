import { Link } from "react-router-dom";
import React from "react";

interface NavItemProps {
  to: string;
  text: string;
  filled?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  to,
  text,
  filled = false,
  onClick,
}) => {
  const baseClass = "font-medium tracking-wide transition duration-200";
  const filledClass =
    "inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-black transition duration-200 rounded shadow-md bg-teal-accent-400 hover:bg-teal-accent-700 focus:shadow-outline focus:outline-none";
  const outlineClass = "text-gray-100 hover:text-teal-accent-400";

  return (
    <li>
      <Link
        to={to}
        aria-label={text}
        title={text}
        className={`${baseClass} ${filled ? filledClass : outlineClass}`}
        onClick={onClick}
      >
        {text}
      </Link>
    </li>
  );
};

export default NavItem;
