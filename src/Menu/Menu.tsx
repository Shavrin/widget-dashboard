import {
  MenuButton,
  MenuItem,
  MenuItems,
  Menu as HMenu,
} from "@headlessui/react";
import { ReactNode } from "react";

type Option = {
  name: string;
  onClick: () => void;
};

type MenuProps = {
  trigger: ReactNode;
  options: Option[];
};

export function Menu({ options, trigger }: MenuProps) {
  return (
    <HMenu>
      <MenuButton as="div">{trigger}</MenuButton>

      <MenuItems anchor="top">
        {options.map(({ onClick, name }) => (
          <MenuItem
            key={name}
            as="button"
            onClick={onClick}
            className="block h-8 min-w-80 rounded bg-green-800 data-[focus]:bg-blue-100"
          >
            {name}
          </MenuItem>
        ))}
      </MenuItems>
    </HMenu>
  );
}
