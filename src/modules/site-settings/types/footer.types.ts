export interface FooterBrand {
  name: string;
  logoType: "text" | "media";
  logoText: string | null | undefined;
  mediaId: number | null | undefined;
  fontWeight: string;
  fontSize: string;
  tracking: string;
}

export interface FooterTrustedBrands {
  enabled: boolean;
  title: string;
  ctaText: string;
  ctaUrl: string;
  brands: FooterBrand[];
}

export interface FooterHeroCta {
  heading: string;
  highlightedText: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
}

export interface FooterPhone {
  label: string;
  number: string;
}

export interface FooterContactInfo {
  phone: {
    title: string;
    phones: FooterPhone[];
  };
  email: {
    title: string;
    subtitle: string;
    email: string;
  };
}

export interface FooterSocialLink {
  platform: string;
  url: string;
  enabled: boolean;
}

export interface FooterCopyright {
  companyName: string;
  autoYear: boolean;
}

export interface FooterSettings {
  trustedBrands: FooterTrustedBrands;
  heroCta: FooterHeroCta;
  contactInfo: FooterContactInfo;
  socialLinks: FooterSocialLink[];
  copyright: FooterCopyright;
}
