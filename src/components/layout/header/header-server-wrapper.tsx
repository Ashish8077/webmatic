import { menuService } from "@/modules/menus/services/menu.service";
import Header from "./header";
import { MENU_LOCATIONS } from "@/modules/menus/constants/menu.constants";

export async function HeaderServerWrapper() {
  const navLinks = await menuService.getPublicMenu(MENU_LOCATIONS.HEADER);
  
  return <Header navLinks={navLinks} />;
}
