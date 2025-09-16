"use client";

import { Box, Typography, useTheme, useMediaQuery, Fade } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";

const BreadcrumbContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 0),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.5, 0),
    marginBottom: theme.spacing(2),
  },
}));

const BreadcrumbItem = styled(Box)(({ theme, isActive }) => ({
  display: "flex",
  alignItems: "center",
  cursor: isActive ? "default" : "pointer",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  borderRadius: theme.spacing(1),
  padding: theme.spacing(0.5, 1),
  "&:hover": !isActive && {
    backgroundColor: "rgba(2, 101, 254, 0.08)",
    transform: "translateY(-1px)",
    boxShadow: "0 2px 8px rgba(2, 101, 254, 0.15)",
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0.25, 0.75),
  },
}));

const BreadcrumbText = styled(Typography)(({ theme, isActive, isMobile }) => ({
  fontSize: isMobile ? "0.875rem" : "0.95rem",
  fontWeight: isActive ? 600 : 500,
  color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
  letterSpacing: "0.25px",
  transition: "all 0.3s ease",
  "&:hover": !isActive && {
    color: theme.palette.primary.main,
  },
}));

const HomeIconStyled = styled(HomeIcon)(({ theme }) => ({
  fontSize: "1.1rem",
  marginRight: theme.spacing(0.5),
  color: theme.palette.text.secondary,
  transition: "all 0.3s ease",
}));

const SeparatorIcon = styled(ChevronRightIcon)(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.text.disabled,
  margin: theme.spacing(0, 0.5),
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.875rem",
    margin: theme.spacing(0, 0.25),
  },
}));

const Breadcrumbs = ({ items = [], showHome = true }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  const handleNavigation = (href) => {
    if (href) {
      router.push(href);
    }
  };

  const renderBreadcrumbItem = (item, index, isLast) => (
    <BreadcrumbItem
      key={index}
      isActive={isLast}
      onClick={() => !isLast && handleNavigation(item.href)}
    >
      {index === 0 && showHome && item.href === "/" && <HomeIconStyled />}
      <BreadcrumbText isActive={isLast} isMobile={isMobile}>
        {item.label}
      </BreadcrumbText>
    </BreadcrumbItem>
  );

  if (!items.length && !showHome) {
    return null;
  }

  const breadcrumbItems = showHome
    ? [{ label: "Home", href: "/" }, ...items]
    : items;

  return (
    <Fade in timeout={400}>
      <BreadcrumbContainer>
        {breadcrumbItems.map((item, index) => (
          <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
            {renderBreadcrumbItem(
              item,
              index,
              index === breadcrumbItems.length - 1
            )}
            {index < breadcrumbItems.length - 1 && <SeparatorIcon />}
          </Box>
        ))}
      </BreadcrumbContainer>
    </Fade>
  );
};

export default Breadcrumbs;
