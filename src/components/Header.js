"use client";

import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Container,
  IconButton,
  useTheme,
  useMediaQuery,
  Typography,
  Collapse,
  Fade,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import InventoryIcon from "@mui/icons-material/Inventory";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import Image from "next/image";
import { useNavigation } from "../utils/navigation";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "white",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  transition: "all 0.3s ease",
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexGrow: 1,
  gap: theme.spacing(1),
}));

const LogoImage = styled(Image)(({ theme }) => ({
  height: "40px",
  width: "auto",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.02)",
    filter: "brightness(1.1)",
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  marginLeft: theme.spacing(2),
  fontWeight: 500,
  fontSize: "1rem",
  "&:hover": {
    backgroundColor: "rgba(2, 101, 254, 0.08)",
    color: theme.palette.primary.main,
  },
}));

const ExpandingMenuContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  zIndex: 1000,
  overflow: "hidden",
  backgroundColor: "white",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
}));

const MenuItemsContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 0),
}));

const PremiumMenuItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  margin: theme.spacing(0.5, 2),
  borderRadius: theme.spacing(1),
  cursor: "pointer",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  display: "flex",
  alignItems: "center",
  "&:hover": {
    backgroundColor: "rgba(2, 101, 254, 0.08)",
    transform: "translateX(12px)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  },
}));

const MenuItemIcon = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  backgroundColor: "rgba(2, 101, 254, 0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(2, 101, 254, 0.2)",
    transform: "scale(1.1)",
  },
}));

const MenuItemText = styled(Typography)(({ theme }) => ({
  fontSize: "1.1rem",
  fontWeight: 600,
  color: theme.palette.text.primary,
  letterSpacing: "0.5px",
}));

const AnimatedIconButton = styled(IconButton)(({ theme, isOpen }) => ({
  color: theme.palette.text.primary,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
  "&:hover": {
    backgroundColor: "rgba(2, 101, 254, 0.08)",
    transform: isOpen ? "rotate(180deg) scale(1.1)" : "rotate(0deg) scale(1.1)",
  },
}));

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const { navigateToSection } = useNavigation();
  const router = useRouter();

  const navItems = [
    {
      name: "Home",
      href: "#home",
      icon: (
        <HomeIcon
          sx={{ color: theme.palette.primary.main, fontSize: "1.5rem" }}
        />
      ),
    },
    {
      name: "About Us",
      href: "#about",
      icon: (
        <InfoIcon
          sx={{ color: theme.palette.primary.main, fontSize: "1.5rem" }}
        />
      ),
    },
    {
      name: "Products",
      href: "#products",
      icon: (
        <InventoryIcon
          sx={{ color: theme.palette.primary.main, fontSize: "1.5rem" }}
        />
      ),
    },
    {
      name: "Contacts",
      href: "#contact",
      icon: (
        <ContactPhoneIcon
          sx={{ color: theme.palette.primary.main, fontSize: "1.5rem" }}
        />
      ),
    },
  ];

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const scrollToSection = (href) => {
    navigateToSection(href);

    if (menuOpen) {
      setMenuOpen(false);
    }
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1100,
        backgroundColor: "white",
      }}
    >
      <StyledAppBar>
        <Container maxWidth="lg" sx={{ p: 1 }}>
          <Toolbar disableGutters>
            <LogoContainer>
              <LogoImage
                src="/images/header-logo.png"
                alt="Raddow ENGINEERS"
                width={200}
                height={40}
                priority
                onClick={() => router.push("/")}
              />
            </LogoContainer>

            {isDesktop && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {navItems.map((item) => (
                  <NavButton
                    key={item.name}
                    color="inherit"
                    onClick={() => scrollToSection(item.href)}
                    sx={{ cursor: "pointer" }}
                  >
                    {item.name}
                  </NavButton>
                ))}
              </Box>
            )}

            {isMobile && (
              <AnimatedIconButton
                color="inherit"
                aria-label="toggle menu"
                onClick={handleMenuToggle}
                isOpen={menuOpen}
              >
                {menuOpen ? (
                  <CloseIcon sx={{ fontSize: "1.5rem" }} />
                ) : (
                  <MenuIcon sx={{ fontSize: "1.5rem" }} />
                )}
              </AnimatedIconButton>
            )}
          </Toolbar>
        </Container>
      </StyledAppBar>

      {isMobile && (
        <Collapse
          in={menuOpen}
          timeout={150}
          easing="cubic-bezier(0.4, 0, 0.2, 1)"
        >
          <ExpandingMenuContainer>
            <Fade in={menuOpen} timeout={200}>
              <MenuItemsContainer>
                {navItems.map((item, index) => (
                  <Fade
                    key={item.name}
                    in={menuOpen}
                    timeout={250 + index * 25}
                    easing="cubic-bezier(0.4, 0, 0.2, 1)"
                  >
                    <PremiumMenuItem
                      onClick={() => scrollToSection(item.href)}
                      sx={{ textDecoration: "none" }}
                    >
                      <MenuItemIcon>{item.icon}</MenuItemIcon>
                      <MenuItemText>{item.name}</MenuItemText>
                    </PremiumMenuItem>
                  </Fade>
                ))}
              </MenuItemsContainer>
            </Fade>
          </ExpandingMenuContainer>
        </Collapse>
      )}
    </Box>
  );
};

export default Header;
