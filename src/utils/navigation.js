import { useRouter, usePathname } from "next/navigation";

export const useNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navigateToSection = (sectionId) => {
    const cleanSectionId = sectionId.replace("#", "");

    if (pathname !== "/") {
      router.push(`/#${cleanSectionId}`);
    } else {
      const targetElement = document.getElementById(cleanSectionId);
      if (targetElement) {
        const headerHeight = 80;
        const targetPosition = targetElement.offsetTop - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  return { navigateToSection };
};
