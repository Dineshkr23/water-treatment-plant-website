"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Chip,
  Fade,
  Paper,
  Skeleton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import ProductDialog from "../../components/ProductDialog";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  textAlign: "center",
  marginBottom: theme.spacing(6),
  "& .category": {
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
  padding: 0,
  width: "100%",
  minHeight: "400px",
  border: "none",
  borderRadius: theme.spacing(3),
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "pointer",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  overflow: "hidden",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  "&:hover": {
    transform: "translateY(-12px) scale(1.02)",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
    "& .product-image": {
      transform: "scale(1.1)",
    },
  },
  "&:hover::before": {
    opacity: 1,
  },
  [theme.breakpoints.down("md")]: {
    minHeight: "350px",
    borderRadius: theme.spacing(2),
  },
  [theme.breakpoints.down("sm")]: {
    minHeight: "300px",
  },
}));

const ProductImage = styled(Image)(({ theme }) => ({
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  objectFit: "cover",
  borderRadius: theme.spacing(2),
  margin: theme.spacing(2),
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  color: theme.palette.primary.main,
  fontWeight: 600,
  border: "1px solid rgba(255, 255, 255, 0.3)",
  zIndex: 3,
}));

// Dummy product data for each category
const categoryProducts = {
  "water-treatment-plants": [
    {
      id: 1,
      name: "Industrial Water Filter System",
      description:
        "High-capacity filtration system for industrial water treatment with advanced membrane technology.",
      image: "/images/water-treatment-plants.png",
    },
    {
      id: 2,
      name: "Reverse Osmosis Plant",
      description:
        "Commercial RO plant with multi-stage filtration for pure water production.",
      image: "/images/ro-system.png",
    },
    {
      id: 3,
      name: "Water Softener System",
      description:
        "Advanced water softening solution for hard water treatment in commercial facilities.",
      image: "/images/sewage-treatment-plants.png",
    },
  ],
  "ro-system": [
    {
      id: 4,
      name: "Home RO System",
      description:
        "Compact reverse osmosis system for residential use with 5-stage filtration.",
      image: "/images/ro-system.png",
    },
    {
      id: 5,
      name: "Commercial RO System",
      description:
        "Large-scale RO system for commercial applications with high output capacity.",
      image: "/images/ro-system.png",
    },
    {
      id: 6,
      name: "Industrial RO System",
      description:
        "Heavy-duty RO system for industrial water treatment with automated controls.",
      image: "/images/ro-system.png",
    },
  ],
  "sewage-treatment-plants": [
    {
      id: 7,
      name: "Compact Sewage Treatment Plant",
      description:
        "Space-efficient sewage treatment solution for small communities and commercial buildings.",
      image: "/images/sewage-treatment-plants.png",
    },
    {
      id: 8,
      name: "Industrial Wastewater Treatment",
      description:
        "Advanced wastewater treatment system for industrial facilities with biological processing.",
      image: "/images/sewage-treatment-plants.png",
    },
    {
      id: 9,
      name: "Municipal Sewage Treatment",
      description:
        "Large-scale sewage treatment plant for municipal applications with multiple treatment stages.",
      image: "/images/sewage-treatment-plants.png",
    },
  ],
  "pumps-pumping-system": [
    {
      id: 10,
      name: "Centrifugal Pump",
      description:
        "High-efficiency centrifugal pump for water transfer and circulation applications.",
      image: "/images/pumps-pumping-system.png",
    },
    {
      id: 11,
      name: "Submersible Pump",
      description:
        "Durable submersible pump for deep well and sump applications with corrosion resistance.",
      image: "/images/pumps-pumping-system.png",
    },
    {
      id: 12,
      name: "Booster Pump System",
      description:
        "Multi-stage booster pump system for high-pressure water supply applications.",
      image: "/images/pumps-pumping-system.png",
    },
  ],
  "heat-pumps": [
    {
      id: 13,
      name: "Air Source Heat Pump",
      description:
        "Energy-efficient air source heat pump for residential heating and cooling needs.",
      image: "/images/heat-pumps.png",
    },
    {
      id: 14,
      name: "Ground Source Heat Pump",
      description:
        "Geothermal heat pump system for sustainable heating and cooling with high efficiency.",
      image: "/images/heat-pumps.png",
    },
    {
      id: 15,
      name: "Water Source Heat Pump",
      description:
        "Water source heat pump for commercial buildings with access to water bodies.",
      image: "/images/heat-pumps.png",
    },
  ],
  "solar-water-heating-system": [
    {
      id: 16,
      name: "Flat Plate Solar Collector",
      description:
        "High-efficiency flat plate solar collector for residential water heating applications.",
      image: "/images/solar-water-heating-system.png",
    },
    {
      id: 17,
      name: "Evacuated Tube Collector",
      description:
        "Advanced evacuated tube solar collector with superior thermal performance.",
      image: "/images/solar-water-heating-system.png",
    },
    {
      id: 18,
      name: "Solar Water Heater System",
      description:
        "Complete solar water heating system with storage tank and circulation pump.",
      image: "/images/solar-water-heating-system.png",
    },
  ],
  "water-heaters": [
    {
      id: 19,
      name: "Electric Water Heater",
      description:
        "Energy-efficient electric water heater with digital temperature control and safety features.",
      image: "/images/water-heaters.png",
    },
    {
      id: 20,
      name: "Gas Water Heater",
      description:
        "High-performance gas water heater with rapid heating and energy-saving technology.",
      image: "/images/water-heaters.png",
    },
    {
      id: 21,
      name: "Tankless Water Heater",
      description:
        "On-demand tankless water heater for continuous hot water supply with space-saving design.",
      image: "/images/water-heaters.png",
    },
  ],
  "solar-power-pv": [
    {
      id: 22,
      name: "Monocrystalline Solar Panel",
      description:
        "High-efficiency monocrystalline solar panels for residential and commercial installations.",
      image: "/images/solar-power-pv.png",
    },
    {
      id: 23,
      name: "Polycrystalline Solar Panel",
      description:
        "Cost-effective polycrystalline solar panels with good performance and durability.",
      image: "/images/solar-power-pv.png",
    },
    {
      id: 24,
      name: "Solar Inverter System",
      description:
        "Advanced solar inverter system with grid-tie capability and monitoring features.",
      image: "/images/solar-power-pv.png",
    },
  ],
};

const categoryNames = {
  "water-treatment-plants": "Water Treatment Plants",
  "ro-system": "RO System",
  "sewage-treatment-plants": "Sewage Treatment Plants",
  "pumps-pumping-system": "Pumps & Pumping System",
  "heat-pumps": "Heat Pumps",
  "solar-water-heating-system": "Solar Water Heating System",
  "water-heaters": "Water Heaters",
  "solar-power-pv": "Solar Power PV",
};

const ProductsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const searchParams = useSearchParams();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const category = searchParams.get("category");
    if (category && categoryProducts[category]) {
      setIsLoading(true);
      setCurrentCategory(category);
      // Simulate loading delay for better UX
      setTimeout(() => {
        setProducts(categoryProducts[category]);
        setIsLoading(false);
      }, 800);
    } else {
      setIsLoading(false);
      setCurrentCategory("");
      setProducts([]);
    }
  }, [searchParams]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  // Loading skeleton component
  const ProductSkeleton = () => (
    <Grid item xs={12} sm={6} md={4} lg={4}>
      <Card
        sx={{
          textAlign: "center",
          padding: 0,
          width: "100%",
          minHeight: "400px",
          border: "none",
          borderRadius: theme.spacing(3),
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ position: "relative", p: 2, mb: 1 }}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={200}
            sx={{
              borderRadius: theme.spacing(2),
              maxWidth: isSmallMobile ? "120px" : isMobile ? "140px" : "160px",
              margin: "0 auto",
            }}
          />
        </Box>
        <CardContent
          sx={{
            padding: { xs: 1.5, sm: 2, md: 2.5 },
            paddingTop: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            position: "relative",
            zIndex: 3,
            flex: 1,
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "100%",
              gap: 2,
            }}
          >
            <Skeleton
              variant="text"
              width="80%"
              height={isSmallMobile ? "1.5rem" : "1.5rem"}
              sx={{ marginBottom: { xs: 1, sm: 1.5 } }}
            />
            <Skeleton
              variant="text"
              width="90%"
              height="1rem"
              sx={{ marginBottom: 0.5 }}
            />
            <Skeleton variant="text" width="70%" height="1rem" />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );

  // Loading state
  if (isLoading) {
    return (
      <main>
        <Header />
        <Box
          sx={{
            py: { xs: 3, sm: 4, md: 6 },
            backgroundColor: "background.default",
            minHeight: "100vh",
            background: "#edf3fc",
          }}
        >
          <Container maxWidth="lg">
            <Box>
              <SectionTitle
                variant={isSmallMobile ? "h4" : isMobile ? "h3" : "h2"}
                component="h1"
              >
                Our{" "}
                <span className="category">
                  {categoryNames[currentCategory]}
                </span>
              </SectionTitle>

              <Grid
                container
                spacing={{ xs: 3, sm: 4, md: 5 }}
                justifyContent="center"
              >
                {[...Array(3)].map((_, index) => (
                  <ProductSkeleton key={index} />
                ))}
              </Grid>
            </Box>
          </Container>
        </Box>
        <Footer />
      </main>
    );
  }

  // No category selected
  if (!currentCategory) {
    return (
      <main>
        <Header />
        <Box
          sx={{
            mt: { xs: 2, sm: 3, md: 4 },
            py: { xs: 2, sm: 3, md: 4 },
            backgroundColor: "background.default",
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#edf3fc",
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h5"
              textAlign="center"
              color="text.secondary"
              gutterBottom
            >
              Please select a product category
            </Typography>
            <Typography
              variant="body1"
              textAlign="center"
              color="text.secondary"
            >
              Choose a category from the navigation to view our products
            </Typography>
          </Container>
        </Box>
        <Footer />
      </main>
    );
  }

  // No products found in category
  if (products.length === 0) {
    return (
      <main>
        <Header />
        <Box
          sx={{
            py: { xs: 3, sm: 4, md: 6 },
            backgroundColor: "background.default",
            minHeight: "100vh",
            background: "#edf3fc",
          }}
        >
          <Container maxWidth="lg">
            <Box>
              <SectionTitle
                variant={isSmallMobile ? "h4" : isMobile ? "h3" : "h2"}
                component="h1"
              >
                Our{" "}
                <span className="category">
                  {categoryNames[currentCategory]}
                </span>
              </SectionTitle>

              <Box
                sx={{
                  mt: { xs: 4, sm: 6, md: 8 },
                  py: { xs: 4, sm: 6, md: 8 },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Typography
                  variant="h5"
                  textAlign="center"
                  color="text.secondary"
                >
                  No products found in this category
                </Typography>
                <Typography
                  variant="body1"
                  textAlign="center"
                  color="text.secondary"
                >
                  We're currently updating our product catalog. Please check
                  back later.
                </Typography>
              </Box>
            </Box>
          </Container>
        </Box>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Header />
      <Box
        sx={{
          py: { xs: 3, sm: 4, md: 6 },
          backgroundColor: "background.default",
          minHeight: "100vh",
          background: "#edf3fc",
        }}
      >
        <Container maxWidth="lg">
          <Fade in timeout={800}>
            <Box>
              <SectionTitle
                variant={isSmallMobile ? "h4" : isMobile ? "h3" : "h2"}
                component="h1"
              >
                Our{" "}
                <span className="category">
                  {categoryNames[currentCategory]}
                </span>
              </SectionTitle>

              <Grid
                container
                spacing={{ xs: 3, sm: 4, md: 5 }}
                justifyContent="center"
              >
                {products.map((product, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={4} key={product.id}>
                    <Fade in timeout={800 + index * 100}>
                      <Box>
                        <ProductCard
                          onClick={() => handleProductClick(product)}
                        >
                          <CategoryChip
                            label={categoryNames[currentCategory].split(" ")[0]}
                            size="small"
                          />

                          <Box sx={{ position: "relative", p: 2, mb: 1 }}>
                            <ProductImage
                              src={product.image}
                              alt={product.name}
                              width={200}
                              height={200}
                              className="product-image"
                              style={{
                                width: "100%",
                                maxWidth: isSmallMobile
                                  ? "120px"
                                  : isMobile
                                  ? "140px"
                                  : "160px",
                                height: "auto",
                                aspectRatio: "1/1",
                              }}
                            />
                          </Box>

                          <CardContent
                            sx={{
                              padding: { xs: 1.5, sm: 2, md: 2.5 },
                              paddingTop: 0,
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "flex-start",
                              alignItems: "center",
                              position: "relative",
                              zIndex: 3,
                              flex: 1,
                              width: "100%",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                width: "100%",
                                gap: 2,
                              }}
                            >
                              <Typography
                                variant={isSmallMobile ? "h6" : "h6"}
                                component="h3"
                                sx={{
                                  fontWeight: 700,
                                  color: "#000 !important",
                                  textAlign: "center",
                                  lineHeight: 1.3,
                                  marginBottom: { xs: 1, sm: 1.5 },
                                  fontSize: {
                                    xs: "1rem",
                                    sm: "1.1rem",
                                    md: "1.2rem",
                                  },
                                }}
                              >
                                {product.name}
                              </Typography>

                              <Typography
                                variant={isSmallMobile ? "body2" : "body1"}
                                component="p"
                                sx={{
                                  color: "#333 !important",
                                  textAlign: "center",
                                  lineHeight: 1.6,
                                  fontSize: {
                                    xs: "0.85rem",
                                    sm: "0.9rem",
                                    md: "1rem",
                                  },
                                  display: "-webkit-box",
                                  WebkitLineClamp: { xs: 2, sm: 3 },
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  opacity: 0.9,
                                }}
                              >
                                {product.description}
                              </Typography>
                            </Box>
                          </CardContent>
                        </ProductCard>
                      </Box>
                    </Fade>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Fade>
        </Container>

        {selectedProduct && (
          <ProductDialog
            open={openDialog}
            onClose={handleCloseDialog}
            product={selectedProduct}
            allProducts={products}
          />
        )}
      </Box>
      <Footer />
    </main>
  );
};

export default ProductsPage;
