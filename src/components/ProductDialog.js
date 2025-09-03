"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Fade,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    maxWidth: "90vw",
    maxHeight: "90vh",
    width: "900px",
    height: "auto",
    margin: theme.spacing(2),
    borderRadius: theme.spacing(2),
    overflow: "hidden",
    background: "#fff",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
    [theme.breakpoints.down("lg")]: {
      width: "95vw",
    },
    [theme.breakpoints.down("md")]: {
      width: "98vw",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      margin: 0,
      borderRadius: 0,
    },
  },
}));

const DialogContentWrapper = styled(DialogContent)(({ theme }) => ({
  padding: 0,
  position: "relative",
  backgroundColor: "transparent",
  height: "auto",
  minHeight: "600px",
  [theme.breakpoints.down("sm")]: {
    minHeight: "500px",
  },
}));

const ProductImage = styled(Image)(({ theme }) => ({
  width: "100%",
  height: "auto",
  objectFit: "contain",
  display: "block",
  borderRadius: theme.spacing(2),
}));

const NavigationButton = styled(IconButton)(({ theme, direction }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  [direction === "left" ? "left" : "right"]: theme.spacing(2),
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  color: theme.palette.primary.main,
  border: "1px solid rgba(255, 255, 255, 0.3)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 1)",
    transform: "translateY(-50%) scale(1.1)",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
  },
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  zIndex: 10,
  [theme.breakpoints.down("sm")]: {
    [direction === "left" ? "left" : "right"]: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(10px)",
  color: theme.palette.text.primary,
  border: "1px solid rgba(255, 255, 255, 0.2)",
  zIndex: 20,
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    transform: "scale(1.1)",
  },
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  [theme.breakpoints.down("sm")]: {
    top: theme.spacing(1),
    right: theme.spacing(1),
    padding: theme.spacing(0.5),
  },
}));

const ProductInfo = styled(Box)(({ theme }) => ({
  background:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%)",
  backdropFilter: "blur(20px)",
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  margin: theme.spacing(2),
  border: "1px solid rgba(255, 255, 255, 0.3)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
  },
}));

const ProductTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  marginBottom: theme.spacing(1),
  textAlign: "center",
}));

const ProductDescription = styled(Typography)(({ theme }) => ({
  lineHeight: 1.6,
  color: theme.palette.text.secondary,
  textAlign: "center",
  fontSize: "1.1rem",
}));

const DotIndicator = styled(Box)(({ theme, active }) => ({
  width: 12,
  height: 12,
  borderRadius: "50%",
  backgroundColor: active ? theme.palette.primary.main : "rgba(0, 0, 0, 0.2)",
  cursor: "pointer",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    backgroundColor: active ? theme.palette.primary.main : "rgba(0, 0, 0, 0.4)",
    transform: "scale(1.2)",
  },
}));

const ProductDialog = ({ open, onClose, product, allProducts }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  useEffect(() => {
    if (product && allProducts) {
      const index = allProducts.findIndex((p) => p.id === product.id);
      setCurrentProductIndex(index >= 0 ? index : 0);
    }
  }, [product, allProducts]);

  const handlePrevious = () => {
    setCurrentProductIndex((prev) =>
      prev === 0 ? allProducts.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentProductIndex((prev) =>
      prev === allProducts.length - 1 ? 0 : prev + 1
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      handlePrevious();
    } else if (event.key === "ArrowRight") {
      handleNext();
    } else if (event.key === "Escape") {
      onClose();
    }
  };

  const currentProduct = allProducts[currentProductIndex];

  if (!currentProduct) return null;

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      fullWidth
      onKeyDown={handleKeyDown}
      PaperProps={{
        sx: {
          width: isMobile ? "100vw" : "1200px",
          maxWidth: isMobile ? "100vw" : "1200px",
          maxHeight: isMobile ? "95vh" : "90vh",
        },
      }}
    >
      <DialogContentWrapper>
        <CloseButton onClick={onClose} size={isMobile ? "small" : "medium"}>
          <CloseIcon />
        </CloseButton>

        <Box sx={{ position: "relative", p: 2 }}>
          <Box
            sx={{
              position: "relative",
              borderRadius: 2,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: isMobile ? "300px" : "400px",
            }}
          >
            <ProductImage
              src={currentProduct.image}
              alt={currentProduct.name}
              width={800}
              height={600}
              priority
              style={{
                width: "100%",
                height: "auto",
                maxHeight: isMobile ? "50vh" : "60vh",
                objectFit: "contain",
                objectPosition: "center",
              }}
            />

            {allProducts.length > 1 && (
              <>
                <NavigationButton
                  direction="left"
                  onClick={handlePrevious}
                  size={isMobile ? "small" : "medium"}
                  aria-label="Previous product"
                >
                  <ChevronLeftIcon />
                </NavigationButton>
                <NavigationButton
                  direction="right"
                  onClick={handleNext}
                  size={isMobile ? "small" : "medium"}
                  aria-label="Next product"
                >
                  <ChevronRightIcon />
                </NavigationButton>
              </>
            )}
          </Box>

          <Fade in timeout={500}>
            <ProductInfo>
              <ProductTitle variant={isMobile ? "h5" : "h4"} component="h2">
                {currentProduct.name}
              </ProductTitle>

              <ProductDescription
                variant={isMobile ? "body1" : "h6"}
                component="p"
              >
                {currentProduct.description}
              </ProductDescription>
            </ProductInfo>
          </Fade>

          {allProducts.length > 1 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 1,
                mt: 2,
                zIndex: 15,
              }}
            >
              {allProducts.map((_, index) => (
                <DotIndicator
                  key={index}
                  active={index === currentProductIndex}
                  onClick={() => setCurrentProductIndex(index)}
                />
              ))}
            </Box>
          )}
        </Box>
      </DialogContentWrapper>
    </StyledDialog>
  );
};

export default ProductDialog;
