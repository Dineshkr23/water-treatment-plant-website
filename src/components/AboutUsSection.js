"use client";

import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
import Image from "next/image";

const AboutContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: "background.paper",
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(6, 0),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(4, 0),
  },
}));

const ProfileImage = styled(Image)(({ theme }) => ({
  margin: "0 auto",
  width: 380,
  height: "auto",
  [theme.breakpoints.down("lg")]: {
    width: 320,
  },
  [theme.breakpoints.down("md")]: {
    width: 280,
  },
  [theme.breakpoints.down("sm")]: {
    width: 240,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: "white",
  padding: "6px 24px",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: "#00B377",
    transform: "translateX(4px)",
  },
  transition: "all 0.3s ease",
  [theme.breakpoints.down("md")]: {
    padding: "8px 20px",
    fontSize: "0.9rem",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "6px 16px",
    fontSize: "0.85rem",
    width: "100%",
    maxWidth: "200px",
  },
}));

const AboutUsSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AboutContainer>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 3, sm: 4, md: 6 }}
          alignItems={{ xs: "center", md: "flex-end" }}
          direction={isMobile ? "column" : "row"}
        >
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                textAlign: "center",
                position: "relative",
                padding: { xs: "10px", sm: "15px", md: "0px" },
              }}
            >
              <Box
                sx={{
                  display: "inline-block",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <ProfileImage
                  src="/images/who-we-are.png"
                  alt="Syed Mohadeen"
                  width={isSmallMobile ? 240 : isMobile ? 280 : 380}
                  height={isSmallMobile ? 300 : isMobile ? 350 : 450}
                />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={7}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant={isSmallMobile ? "h4" : isMobile ? "h3" : "h2"}
                  component="h2"
                  sx={{
                    fontWeight: 700,
                    color: "text.primary",
                    textAlign: isMobile ? "center" : "left",
                    mb: 2,
                    "& .who": {
                      color: "text.primary",
                    },
                    "& .we-are": {
                      color: "primary.main",
                    },
                  }}
                >
                  <span className="who">Who</span>{" "}
                  <span className="we-are">we are</span>
                </Typography>
                <Typography
                  variant={isSmallMobile ? "body1" : "h6"}
                  sx={{
                    fontSize: isSmallMobile
                      ? "1rem"
                      : isMobile
                      ? "1.1rem"
                      : "1.2rem",
                    color: "text.secondary",
                    textAlign: isMobile ? "center" : "justify",
                    [theme.breakpoints.down("md")]: {
                      maxWidth: "600px",
                      margin: "0 auto",
                    },
                  }}
                >
                  Radow Engineer is committed to delivering reliable,
                  sustainable, and efficient solutions in water and energy
                  management. With expertise in solar power, heating systems,
                  and water treatment technologies, we provide end-to-end
                  services from design to installation. Our mission is to
                  combine engineering excellence with eco-friendly innovation,
                  ensuring every project meets the highest standards of
                  performance and customer satisfaction.
                </Typography>
              </Box>

              <Stack
                direction={{ xs: "column", md: "row" }}
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="h6"
                    component="h6"
                    sx={{
                      fontWeight: 700,
                      color: "text.primary",
                      textAlign: isMobile ? "center" : "left",
                    }}
                  >
                    Syed Mohadeen
                  </Typography>
                  <Typography
                    variant="p"
                    component="p"
                    sx={{
                      color: "text.secondary",
                      fontWeight: 500,
                      textAlign: isMobile ? "center" : "left",
                    }}
                  >
                    Managing Partner
                  </Typography>
                </Box>

                <Box
                  sx={{
                    textAlign: isMobile ? "center" : "left",
                    mt: { xs: 2, md: 0 },
                  }}
                >
                  <StyledButton
                    variant="contained"
                    endIcon={<ArrowOutwardOutlinedIcon />}
                  >
                    Read story
                  </StyledButton>
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </AboutContainer>
  );
};

export default AboutUsSection;
