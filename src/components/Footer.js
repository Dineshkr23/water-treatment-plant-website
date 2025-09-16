"use client";

import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Link,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { styled } from "@mui/material/styles";
import {
  Facebook,
  X,
  Instagram,
  LinkedIn,
  PhoneInTalkOutlined as Phone,
  EmailOutlined as Email,
  LocationOnOutlined as LocationOn,
} from "@mui/icons-material";
import Image from "next/image";
import { useNavigation } from "../utils/navigation";

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#f8f9fa",
  color: "white",
  padding: theme.spacing(6, 0, 4),
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(4, 0, 3),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3, 0, 2),
  },
}));

const FooterLogoContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
}));

const FooterLogo = styled(Image)(({ theme }) => ({
  width: 180,
  height: "auto",
  [theme.breakpoints.down("md")]: {
    width: 160,
  },
  [theme.breakpoints.down("sm")]: {
    width: 140,
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  borderBottom: `2px solid ${theme.palette.secondary.main}`,
  paddingBottom: theme.spacing(1),
  display: "inline-block",
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
    marginBottom: theme.spacing(1.5),
  },
  [theme.breakpoints.down("sm")]: {
    marginBottom: theme.spacing(1),
    fontSize: "1rem",
  },
}));

const SectionTitleContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
  },
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: "none",
  display: "block",
  marginBottom: theme.spacing(1),
  transition: "color 0.3s ease",
  fontSize: "0.9rem",
  "&:hover": {
    color: theme.palette.primary.main,
  },
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
    marginBottom: theme.spacing(0.75),
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.85rem",
  },
}));

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  color: "white",
  backgroundColor: theme.palette.primary.main,
  marginRight: theme.spacing(1.5),
  transition: "all 0.3s ease",
  borderRadius: "7px",
  padding: "5px",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    transform: "scale(1.1)",
  },
  [theme.breakpoints.down("md")]: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
  },
  [theme.breakpoints.down("sm")]: {
    marginRight: theme.spacing(0.5),
    padding: "4px",
    "& .MuiSvgIcon-root": {
      fontSize: "1.2rem",
    },
  },
}));

const ContactInfo = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
  display: "flex",
  alignItems: "flex-start",
  gap: theme.spacing(1),
  fontSize: "0.9rem",
  "&:hover": {
    color: theme.palette.primary.main,
  },
  [theme.breakpoints.down("md")]: {
    justifyContent: "center",
    textAlign: "center",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(0.5),
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.85rem",
    marginBottom: theme.spacing(0.75),
  },
}));

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { navigateToSection } = useNavigation();
  const router = useRouter();

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About us", href: "#about" },
    { name: "Products", href: "#products" },
    { name: "Contact us", href: "#contact" },
  ];
  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: X, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: LinkedIn, href: "#" },
  ];

  const scrollToSection = (href) => {
    navigateToSection(href);
  };

  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 3, sm: 3, md: 4 }}
          direction={isMobile ? "column" : "row"}
        >
          <Grid item xs={12} sm={6} md={3}>
            <FooterLogoContainer>
              <FooterLogo
                src="/images/footer-logo.png"
                alt="Raddow ENGINEERS"
                width={isSmallMobile ? 140 : isMobile ? 160 : 200}
                height={isSmallMobile ? 35 : isMobile ? 40 : 40}
                onClick={() => router.push("/")}
                sx={{ cursor: "pointer" }}
              />
            </FooterLogoContainer>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <SectionTitleContainer>
              <SectionTitle
                variant={isSmallMobile ? "body1" : "h6"}
                component="h3"
              >
                Information
              </SectionTitle>
            </SectionTitleContainer>

            <ContactInfo variant="body2">
              <Phone sx={{ fontSize: isSmallMobile ? "0.9rem" : "1rem" }} />
              <Stack
                direction={isMobile ? "column" : "column"}
                alignItems={isMobile ? "center" : "flex-start"}
                spacing={0.5}
              >
                <Link
                  href="tel:+918123444007"
                  sx={{
                    color: (theme) => theme.palette.text.secondary,
                    textDecoration: "none",
                    fontSize: isSmallMobile ? "0.8rem" : "0.9rem",
                    "&:hover": {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  +91 81234 44007
                </Link>
                <Link
                  href="tel:+919845989141"
                  sx={{
                    color: (theme) => theme.palette.text.secondary,
                    textDecoration: "none",
                    fontSize: isSmallMobile ? "0.8rem" : "0.9rem",
                    "&:hover": {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  +91 98459 89141
                </Link>
                <Link
                  href="tel:+918048521279"
                  sx={{
                    color: (theme) => theme.palette.text.secondary,
                    textDecoration: "none",
                    fontSize: isSmallMobile ? "0.8rem" : "0.9rem",
                    "&:hover": {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  +91 80485 21279
                </Link>
              </Stack>
            </ContactInfo>

            <ContactInfo variant="body2">
              <Email sx={{ fontSize: isSmallMobile ? "0.9rem" : "1rem" }} />
              <Link
                href="mailto:Info@raddowenginners.com"
                sx={{
                  color: (theme) => theme.palette.text.secondary,
                  textDecoration: "none",
                  fontSize: isSmallMobile ? "0.8rem" : "0.9rem",
                  textAlign: isMobile ? "center" : "left",
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                Info@raddowenginners.com
              </Link>
            </ContactInfo>

            <ContactInfo variant="body2">
              <LocationOn
                sx={{ fontSize: isSmallMobile ? "0.9rem" : "1rem" }}
              />
              <Box
                sx={{
                  textAlign: isMobile ? "center" : "left",
                  fontSize: isSmallMobile ? "0.8rem" : "0.9rem",
                }}
              >
                #61, 4th Cross, Near BSNL Telephone In, Chandra Layout,
                Bangalore 560040.
              </Box>
            </ContactInfo>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <SectionTitleContainer>
              <SectionTitle
                variant={isSmallMobile ? "body1" : "h6"}
                component="h3"
              >
                Quick Links
              </SectionTitle>
            </SectionTitleContainer>

            {quickLinks.map((link) => (
              <FooterLink
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                variant="body2"
                sx={{
                  color: (theme) => theme.palette.text.secondary,
                  cursor: "pointer",
                }}
              >
                {link.name}
              </FooterLink>
            ))}
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <SectionTitleContainer>
              <SectionTitle
                variant={isSmallMobile ? "body1" : "h6"}
                component="h3"
              >
                Connect with us
              </SectionTitle>
            </SectionTitleContainer>

            <Box
              sx={{
                textAlign: isMobile ? "center" : "left",
                display: "flex",
                justifyContent: isMobile ? "center" : "flex-start",
                flexWrap: "wrap",
              }}
            >
              {socialLinks.map((social, index) => (
                <SocialIconButton
                  key={index}
                  component="a"
                  href={social.href}
                  aria-label={social.icon.name}
                >
                  <social.icon />
                </SocialIconButton>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Box
        sx={{
          borderTop: "1px solid #dee2e6",
          marginTop: { xs: 2, sm: 3, md: 4 },
          paddingTop: { xs: 2, sm: 2.5, md: 3 },
          textAlign: "center",
        }}
      >
        <Typography
          variant={isSmallMobile ? "caption" : "body2"}
          sx={{
            color: "#6c757d",
            fontSize: isSmallMobile ? "0.75rem" : "0.875rem",
          }}
        >
          © {new Date().getFullYear()} Raddow Engineers. All rights reserved.
        </Typography>
      </Box>
    </FooterContainer>
  );
};

export default Footer;
