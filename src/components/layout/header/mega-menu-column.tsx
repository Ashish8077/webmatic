import { MenuNode } from "@/modules/menus/types/menu.types";
import { MegaMenuLink } from "./mega-menu-link";

interface MegaMenuColumnProps {
  node: MenuNode;
}

export function MegaMenuColumn({ node }: MegaMenuColumnProps) {
  let ctaIndex = -1;
  for (let i = node.children.length - 1; i >= 0; i--) {
    if (node.children[i].href !== "#") {
      ctaIndex = i;
      break;
    }
  }

  const regularItems = node.children.filter((_, index) => index !== ctaIndex);
  const ctaItem = ctaIndex !== -1 ? node.children[ctaIndex] : null;

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-sm font-semibold text-slate-900 hover:text-orange-500 transition-colors duration-300 uppercase tracking-wide mb-4 cursor-default">
        {node.title}
      </h3>
      <ul className="flex flex-col space-y-2 flex-1">
        {regularItems.map((child) => (
          <li key={child.id}>
            <MegaMenuLink node={child} isButton={false} parentTitle={node.title} />
          </li>
        ))}
        {ctaItem && (
          <li className="pt-4 mt-auto">
            <MegaMenuLink node={ctaItem} isButton={true} parentTitle={node.title} />
          </li>
        )}
      </ul>
    </div>
  );
}
