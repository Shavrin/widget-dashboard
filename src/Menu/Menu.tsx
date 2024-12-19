import {
  MenuButton,
  MenuItem,
  MenuItems,
  Menu as HMenu,
  MenuItemsProps,
} from "@headlessui/react";
import { ReactNode } from "react";

type Option = {
  name: string;
  onClick: () => void;
};

type MenuProps = {
  trigger: ReactNode;
  options: Option[];
  anchor?: MenuItemsProps["anchor"];
};

export function Menu({ options, trigger, anchor = "top start" }: MenuProps) {
  return (
    <HMenu>
      <MenuButton as="div">{trigger}</MenuButton>

      <MenuItems
        anchor={anchor}
        className="[--anchor-gap:12px] shadow-lg shadow-black"
      >
        {options.map(({ onClick, name }) => (
          <MenuItem
            key={name}
            as="button"
            onClick={onClick}
            className="block min-h-4 min-w-40 pl-4 p-2 bg-stone-700 data-[focus]:bg-stone-600 first:rounded-t last:rounded-b text-stone-300 text-left"
          >
            {name}
          </MenuItem>
        ))}
      </MenuItems>
    </HMenu>
  );
}
