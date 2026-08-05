import { siteSettingsService } from "@/modules/site-settings/services/site-settings.service";
import { menuService } from "@/modules/menus/services/menu.service";
import { MENU_LOCATIONS } from "@/modules/menus/constants/menu.constants";
import { FooterClient } from "./footer-client";

export async function Footer() {
  const settings = await siteSettingsService.getPublicFooterSettings();
  const navLinks = await menuService.getPublicMenu(MENU_LOCATIONS.FOOTER);
  
  return <FooterClient settings={settings} navLinks={navLinks} />;
}
