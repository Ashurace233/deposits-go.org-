/**
 * Site logo with fallback so it always shows.
 *
 * HOW TO CHANGE THE LOGO YOURSELF:
 * 1. Add your logo image to the public folder:
 *    - Recommended: public/logo.png (horizontal logo for header)
 *    - Or: public/logo.svg
 * 2. The component loads /Bank_of_America_logo.svg first. If it fails, it shows /boa-logo.svg.
 * 3. To use a different filename (e.g. my-logo.png):
 *    - Put the file in public/, e.g. public/my-logo.png
 *    - In this file, change: const LOGO_URL = "/Bank_of_America_logo.svg" to LOGO_URL = "/my-logo.svg"
 *    - Do the same in any file that uses LOGO_URL, or use this component everywhere.
 * 4. Recommended size: height 32–40px (width auto). Use a transparent PNG for best results.
 */
const LOGO_URL = "/Bank_of_America_logo.svg";
const FALLBACK_LOGO = "/boa-logo.svg";

interface SiteLogoProps {
  className?: string;
  alt?: string;
}

export const SiteLogo = ({ className = "h-8 object-contain", alt = "Bank of America" }: SiteLogoProps) => {
  return (
    <img
      src={LOGO_URL}
      alt={alt}
      className={className}
      style={{ backgroundColor: "transparent" }}
      onError={(e) => {
        const el = e.target as HTMLImageElement;
        if (!el.src.endsWith("boa-logo.svg")) {
          el.src = FALLBACK_LOGO;
          el.classList.remove("logo-no-bg");
        }
      }}
    />
  );
};

export { LOGO_URL, FALLBACK_LOGO };
