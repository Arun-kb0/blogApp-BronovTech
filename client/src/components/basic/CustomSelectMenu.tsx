import { Button } from "@material-tailwind/react";
import { useState } from "react";

type CustomSelectMenuProps = {
  selectOptions: string[];
  value: string;
  onChange: (value: string) => void;
};

const CustomSelectMenu = ({ selectOptions, value, onChange }: CustomSelectMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, item: string) => {
    e.preventDefault()
    onChange(item.toLocaleLowerCase())
    setIsOpen(false)
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen((prev) => !prev)}
        className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none"
      >
        {value || "Select an Option"}
      </Button>

      {/* Dropdown menu */}
      {isOpen && (
        <ul
          role="menu"
          className="absolute z-10 min-w-[180px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg shadow-sm focus:outline-none"
        >
          {selectOptions.map((item) => (
            <li
              key={item}
              role="menuitem"
              onClick={(e) => handleItemClick(e,item)}
              className={`cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 ${value === item ? "bg-slate-100" : ""}`}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelectMenu;
