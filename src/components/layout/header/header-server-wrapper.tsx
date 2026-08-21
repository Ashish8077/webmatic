import { menuService } from "@/modules/menus/services/menu.service";
import Header from "./header";
import { MENU_LOCATIONS } from "@/modules/menus/constants/menu.constants";

import { siteSettingsService } from "@/modules/site-settings/services/site-settings.service";

export async function HeaderServerWrapper() {
  const navLinks = await menuService.getPublicMenu(MENU_LOCATIONS.HEADER);
  const headerSettings = await siteSettingsService.getPublicHeaderSettings();
  
  return <Header navLinks={navLinks} settings={headerSettings} />;
}
