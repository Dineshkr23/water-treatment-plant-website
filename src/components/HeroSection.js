"use client";

import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Image from "next/image";
import { useState, useEffect } from "react";

const HeroContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  minHeight: "70vh",
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    minHeight: "60vh",
  },
  [theme.breakpoints.down("sm")]: {
    minHeight: "50vh",
  },
}));

const BackgroundImage = styled(Image)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  zIndex: 1,
  transition: "opacity 0.5s ease-in-out",
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 3,
  maxWidth: "600px",
  padding: theme.spacing(4, 0),
  opacity: 0,
  transform: "translateY(20px)",
  animation: "fadeInUp 0.8s ease-out forwards",
  "@keyframes fadeInUp": {
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  [theme.breakpoints.down("lg")]: {
    maxWidth: "500px",
    padding: theme.spacing(3, 0),
  },
  [theme.breakpoints.down("md")]: {
    maxWidth: "100%",
    padding: theme.spacing(2, 0),
    textAlign: "center",
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.5, 0),
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: "white",
  padding: "4px 35px",
  fontSize: "1.1rem",
  fontWeight: 400,
  borderRadius: "50px",
  "&:hover": {
    backgroundColor: "#00B377",
    transform: "translateY(-2px)",
  },
  transition: "all 0.3s ease",
  [theme.breakpoints.down("md")]: {
    padding: "8px 30px",
    fontSize: "1rem",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "6px 25px",
    fontSize: "0.9rem",
    width: "100%",
    maxWidth: "200px",
  },
}));

const NavigationArrow = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  color: theme.palette.primary.main,
  width: "48px",
  height: "48px",
  "&:hover": {
    backgroundColor: "white",
    transform: "translateY(-50%) scale(1.1)",
  },
  transition: "all 0.3s ease",
  zIndex: 4,
  cursor: "pointer",
  [theme.breakpoints.down("md")]: {
    width: "40px",
    height: "40px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "36px",
    height: "36px",
    display: "none",
  },
}));

const DotIndicator = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ theme, active }) => ({
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  backgroundColor: active ? "white" : "rgba(255, 255, 255, 0.5)",
  margin: "0 6px",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: active ? "white" : "rgba(255, 255, 255, 0.8)",
  },
  [theme.breakpoints.down("sm")]: {
    width: "10px",
    height: "10px",
    margin: "0 4px",
  },
}));

const DotsContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: "30px",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  gap: "8px",
  zIndex: 4,
  [theme.breakpoints.down("md")]: {
    bottom: "20px",
  },
  [theme.breakpoints.down("sm")]: {
    bottom: "15px",
    gap: "6px",
  },
}));

const sliderData = [
  {
    id: 1,
    image: "/images/hero-image-1.png",
    title: (
      <>
        <span className="engineering">Engineering</span>
        <br />
        <span className="future-solutions">Future Solutions</span>
      </>
    ),
    subtitle:
      "From heat pumps and solar water heaters to water treatment and waste-water systems — all under one roof.",
    buttonText: "Call Now",
    buttonAction: "call",
  },
  {
    id: 2,
    image: "/images/hero-image-1.png",
    title: (
      <>
        <span className="engineering">Advanced</span>
        <br />
        <span className="future-solutions">Heat Pump Systems</span>
      </>
    ),
    subtitle:
      "Energy-efficient heating and cooling solutions for residential and commercial applications.",
    buttonText: "Learn More",
    buttonAction: "learn",
  },
  {
    id: 3,
    image: "/images/hero-image-1.png",
    title: (
      <>
        <span className="engineering">Solar</span>
        <br />
        <span className="future-solutions">Power Solutions</span>
      </>
    ),
    subtitle:
      "Harness the power of the sun with our cutting-edge solar photovoltaic and water heating systems.",
    buttonText: "Get Quote",
    buttonAction: "quote",
  },
  {
    id: 4,
    image: "/images/hero-image-1.png",
    title: (
      <>
        <span className="engineering">Water</span>
        <br />
        <span className="future-solutions">Treatment Excellence</span>
      </>
    ),
    subtitle:
      "State-of-the-art water purification and wastewater treatment solutions for clean, sustainable water.",
    buttonText: "Contact Us",
    buttonAction: "contact",
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning) {
        nextSlide();
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide, isTransitioning]);

  // Reset auto-advance timer when manually navigating
  const resetAutoAdvance = () => {
    setCurrentSlide((prev) => prev);
  };

  const nextSlide = () => {
    setIsTransitioning(true);
    const nextIndex = (currentSlide + 1) % sliderData.length;
    setCurrentSlide(nextIndex);
    setTimeout(() => setIsTransitioning(false), 500);
    resetAutoAdvance();
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    const prevIndex =
      (currentSlide - 1 + sliderData.length) % sliderData.length;
    setCurrentSlide(prevIndex);
    setTimeout(() => setIsTransitioning(false), 500);
    resetAutoAdvance();
  };

  const goToSlide = (index) => {
    if (index !== currentSlide) {
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 500);
      resetAutoAdvance();
    }
  };

  const handleButtonClick = (action) => {
    switch (action) {
      case "call":
        window.location.href = "tel:+1234567890";
        break;
      case "learn":
        // Scroll to products section or navigate to learn more page
        break;
      case "quote":
        // Open quote form or navigate to quote page
        break;
      case "contact":
        // Navigate to contact page
        break;
      default:
        break;
    }
  };

  return (
    <HeroContainer>
      <BackgroundImage
        src={sliderData[currentSlide].image}
        alt="Water and Energy Solutions"
        fill
        priority
        style={{ opacity: isTransitioning ? 0.8 : 1 }}
      />

      <Container maxWidth="lg">
        <ContentWrapper>
          <Typography
            variant={isSmallMobile ? "h3" : isMobile ? "h2" : "h1"}
            component="h1"
            sx={{
              mb: isSmallMobile ? 1.5 : isMobile ? 2 : 2.5,
              color: "white",
              "& .engineering": {
                color: "#0265FE",
              },
              "& .future-solutions": {
                color: "black",
              },
              [theme.breakpoints.down("sm")]: {
                lineHeight: 1.2,
              },
            }}
          >
            {sliderData[currentSlide].title}
          </Typography>

          <Typography
            variant={isSmallMobile ? "body1" : isMobile ? "h6" : "h6"}
            component="p"
            sx={{
              mb: isSmallMobile ? 2.5 : isMobile ? 3 : 4,
              color: "rgb(0,0,0,0.5)",
              lineHeight: 1.6,
              fontWeight: 400,
              [theme.breakpoints.down("sm")]: {
                fontSize: "0.9rem",
                lineHeight: 1.5,
              },
            }}
          >
            {sliderData[currentSlide].subtitle}
          </Typography>

          <StyledButton
            variant="contained"
            size="large"
            onClick={() =>
              handleButtonClick(sliderData[currentSlide].buttonAction)
            }
          >
            {sliderData[currentSlide].buttonText}
          </StyledButton>
        </ContentWrapper>
      </Container>

      <NavigationArrow
        sx={{ left: { xs: 10, sm: 15, md: 20 } }}
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft />
      </NavigationArrow>
      <NavigationArrow
        sx={{ right: { xs: 10, sm: 15, md: 20 } }}
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight />
      </NavigationArrow>

      <DotsContainer>
        {sliderData.map((_, index) => (
          <DotIndicator
            key={index}
            active={index === currentSlide}
            onClick={() => goToSlide(index)}
          />
        ))}
      </DotsContainer>
    </HeroContainer>
  );
};

export default HeroSection;
