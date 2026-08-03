import Link from "next/link";
import { MenuNode } from "@/modules/menus/types/menu.types";
import { desktopLinkClass } from "./styles";
import { usePathname } from "next/navigation";
import { Dropdown } from "./dropdown";
import { MegaMenu } from "./mega-menu";

interface NavigationItemProps {
  node: MenuNode;
}

export function NavigationItem({ node }: NavigationItemProps) {
  const pathname = usePathname();

  switch (node.layout) {
    case "mega":
      return <MegaMenu node={node} />;
    case "dropdown":
      return <Dropdown node={node} />;
    case "link":
    default:
      return (
        <Link
          href={node.href}
          className={desktopLinkClass(pathname === node.href)}
          target={node.target || undefined}
          rel={node.rel || undefined}
        >
          {node.title}
        </Link>
      );
  }
}
