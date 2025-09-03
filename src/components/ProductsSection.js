"use client";

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { styled } from "@mui/material/styles";
import Image from "next/image";

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  textAlign: "center",
  marginBottom: theme.spacing(3),
  "& .our": {
    color: "text.primary",
  },
  "& .products": {
    color: theme.palette.primary.main,
  },
  [theme.breakpoints.down("md")]: {
    marginBottom: theme.spacing(2),
  },
  [theme.breakpoints.down("sm")]: {
    marginBottom: theme.spacing(1.5),
  },
}));

const ProductCard = styled(Card)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(1),
  width: "100%",
  height: "240px",
  border: "1px solid #E0E0E0",
  transition: "all 0.3s ease",
  cursor: "pointer",
  backgroundColor: "#ffffff",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  "&:hover": {
    transform: "translateY(-8px)",
    "& .product-icon": {
      transform: "scale(1.1)",
    },
  },
  [theme.breakpoints.down("md")]: {
    height: "200px",
    padding: theme.spacing(0.5),
  },
  [theme.breakpoints.down("sm")]: {
    height: "180px",
    padding: theme.spacing(0.5),
  },
}));

const ProductIcon = styled(Image)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  transition: "all 0.3s ease",
  objectFit: "contain",
  [theme.breakpoints.down("md")]: {
    marginBottom: theme.spacing(0.5),
  },
}));

const products = [
  {
    icon: "/images/water-treatment-plants.png",
    name: "Water Treatment Plants",
    category: "water-treatment-plants",
  },
  {
    icon: "/images/ro-system.png",
    name: "RO System",
    category: "ro-system",
  },
  {
    icon: "/images/sewage-treatment-plants.png",
    name: "Sewage Treatment Plants",
    category: "sewage-treatment-plants",
  },
  {
    icon: "/images/pumps-pumping-system.png",
    name: "Pumps & Pumping System",
    category: "pumps-pumping-system",
  },
  {
    icon: "/images/heat-pumps.png",
    name: "Heat Pumps",
    category: "heat-pumps",
  },
  {
    icon: "/images/solar-water-heating-system.png",
    name: "Solar Water Heating System",
    category: "solar-water-heating-system",
  },
  {
    icon: "/images/water-heaters.png",
    name: "Water Heaters",
    category: "water-heaters",
  },
  {
    icon: "/images/solar-power-pv.png",
    name: "Solar Power PV",
    category: "solar-power-pv",
  },
];

const ProductsSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  return (
    <Box
      sx={{
        mt: { xs: 2, sm: 3, md: 4 },
        py: { xs: 2, sm: 3, md: 4 },
        backgroundColor: "background.default",
      }}
    >
      <Container maxWidth="lg">
        <SectionTitle
          variant={isSmallMobile ? "h4" : isMobile ? "h3" : "h2"}
          component="h2"
        >
          <span className="our">Our</span>{" "}
          <span className="products">Products</span>
        </SectionTitle>

        <Grid
          container
          spacing={{ xs: 1, sm: 1.5, md: 2 }}
          justifyContent="center"
          sx={{
            margin: 0,
            width: "100%",
          }}
        >
          {products.map((product, index) => (
            <Grid
              item
              xs={6}
              sm={6}
              md={4}
              lg={3}
              key={index}
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: { xs: "2px", sm: "3px", md: "4px" },
              }}
            >
              <ProductCard
                onClick={() =>
                  router.push(`/products?category=${product.category}`)
                }
              >
                <CardContent
                  sx={{
                    padding: { xs: "4px 2px", sm: "6px 3px", md: "8px 4px" },
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: { xs: 0.5, sm: 0.75, md: 1 },
                    }}
                  >
                    <ProductIcon
                      src={product.icon}
                      alt={product.name}
                      width={isSmallMobile ? 60 : isMobile ? 80 : 100}
                      height={isSmallMobile ? 60 : isMobile ? 80 : 100}
                      className="product-icon"
                      style={{
                        width: isSmallMobile
                          ? "60px"
                          : isMobile
                          ? "80px"
                          : "100px",
                        height: isSmallMobile
                          ? "60px"
                          : isMobile
                          ? "80px"
                          : "100px",
                        minWidth: isSmallMobile
                          ? "60px"
                          : isMobile
                          ? "80px"
                          : "100px",
                        minHeight: isSmallMobile
                          ? "60px"
                          : isMobile
                          ? "80px"
                          : "100px",
                        maxWidth: isSmallMobile
                          ? "60px"
                          : isMobile
                          ? "80px"
                          : "100px",
                        maxHeight: isSmallMobile
                          ? "60px"
                          : isMobile
                          ? "80px"
                          : "100px",
                      }}
                    />
                    <Typography
                      variant={isSmallMobile ? "caption" : "body2"}
                      component="p"
                      sx={{
                        fontWeight: 600,
                        color: "text.secondary",
                        textAlign: "center",
                        lineHeight: 1.2,
                        fontSize: isSmallMobile
                          ? "0.75rem"
                          : isMobile
                          ? "0.8rem"
                          : "0.875rem",
                        margin: 0,
                        padding: { xs: "0 2px", sm: "0 4px" },
                      }}
                    >
                      {product.name}
                    </Typography>
                  </Box>
                </CardContent>
              </ProductCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductsSection;
