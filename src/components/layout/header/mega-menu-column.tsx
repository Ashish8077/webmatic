import { MenuNode } from "@/modules/menus/types/menu.types";
import { MegaMenuLink } from "./mega-menu-link";

interface MegaMenuColumnProps {
  node: MenuNode;
}

export function MegaMenuColumn({ node }: MegaMenuColumnProps) {
  return (
    <div className="flex flex-col h-full">
      <h3 className="text-sm font-bold text-orange-500 uppercase tracking-wider mb-5">
        {node.title}
      </h3>
      <ul className="flex flex-col space-y-1.5 flex-1">
        {node.children.map((child, index) => {
          const isLast = index === node.children.length - 1;
          return (
            <li key={child.id} className={isLast ? "pt-4 mt-auto" : ""}>
              <MegaMenuLink node={child} isLast={isLast} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
