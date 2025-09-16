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
  Fade,
  Skeleton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import ProductDialog from "../../components/ProductDialog";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";

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
    marginBottom: theme.spacing(5),
  },
}));

const ProductCard = styled(Card)(({ theme }) => ({
  textAlign: "center",
  padding: 0,
  width: "100%",
  minHeight: "450px",
  border: "none",
  borderRadius: theme.spacing(3),
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "pointer",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  border: "1px solid #E0E0E0",
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
    minHeight: "400px",
    borderRadius: theme.spacing(2),
  },
  [theme.breakpoints.down("sm")]: {
    minHeight: "350px",
  },
}));

const ProductImage = styled(Image)(({ theme }) => ({
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  objectFit: "contain",
  objectPosition: "center",
  display: "block",
}));

const categoryProducts = {
  "water-treatment-plants": [
    {
      id: 1,
      name: "Pressure Sand Filter",
      description:
        "High-pressure sand filtration system for removing suspended solids and turbidity from water supplies.",
      image: "/images/water-treatment-plants/PressureSandFilter.webp",
    },
    {
      id: 2,
      name: "Water Softner",
      description:
        "Ion exchange water softener system for removing hardness minerals like calcium and magnesium from water.",
      image: "/images/water-treatment-plants/WaterSoftner.webp",
    },
    {
      id: 3,
      name: "Water Treatment Plant",
      description:
        "Advanced water softening technology for residential and commercial applications with automatic regeneration.",
      image: "/images/water-treatment-plants/WaterSofteningSystem.webp",
    },
    {
      id: 4,
      name: "Activated Carbon Filter",
      description:
        "Advanced filtration system using activated carbon to remove chlorine, organic compounds, and improve water taste and odor.",
      image: "/images/water-treatment-plants/ActivatedCarbonFilter.webp",
    },
    {
      id: 5,
      name: "Industrial Water Treatment Plant",
      description:
        "Complete industrial water treatment solution with multi-stage filtration, softening, and purification processes.",
      image:
        "/images/water-treatment-plants/IndustrialWaterTreatmentPlant.webp",
    },
  ],
  "ro-system": [
    {
      id: 6,
      name: "RO System",
      description: "Compact Reverse Osmosis system with high efficiency",
      image: "/images/ro-system/RoType1.webp",
    },
    {
      id: 7,
      name: "RO System",
      description:
        "Commercial-grade RO system with high output capacity for industrial and commercial water purification needs.",
      image: "/images/ro-system/RoType2.webp",
    },
  ],
  "sewage-treatment-plants": [
    {
      id: 8,
      name: "Modular STP",
      description:
        "Compact modular sewage treatment plant for small communities with advanced biological treatment processes.",
      image: "/images/sewage-treatment-plants/ModularSTP.webp",
    },
    {
      id: 9,
      name: "Grease Separator",
      description:
        "Grease separation system for removing fats, oils, and grease from wastewater streams.",
      image: "/images/sewage-treatment-plants/GreaseSeparator.webp",
    },
    {
      id: 10,
      name: "Grease Separator",
      description:
        "Widely used in commercial kitchens, hotels, restaurants, and food processing units, grease separators are an essential component for safe and sustainable wastewater management.",
      image: "/images/sewage-treatment-plants/grease_separator_2.webp",
    },
  ],
  "pumps-pumping-system": [
    {
      id: 11,
      name: "Twin Booster Pump",
      description:
        "Dual pump booster system for maintaining consistent water pressure in high-rise buildings and large facilities.",
      image: "/images/pumps-pumping-system/TwinBoosterPump.webp",
    },
    {
      id: 12,
      name: "Dewatering Pump",
      description:
        "Heavy-duty submersible pump for construction sites, mines, and flood control applications.",
      image: "/images/pumps-pumping-system/DewateringPump.jpg",
    },
    {
      id: 13,
      name: "Hydro Pneumatic Pressure Boosting System",
      description:
        "Automated pressure boosting system with hydro-pneumatic tank for consistent water supply pressure.",
      image:
        "/images/pumps-pumping-system/HydroPneumaticPressureBoostingSystem.webp",
    },
    {
      id: 14,
      name: "Open Well Submersible Pump",
      description:
        "High-efficiency submersible pump for open wells with corrosion-resistant construction for long service life.",
      image: "/images/pumps-pumping-system/OpenWellSubmersiblePump.webp",
    },
    {
      id: 15,
      name: "Sewage Cutter Pump",
      description:
        "Heavy-duty sewage pump with cutting mechanism for handling solid waste and preventing clogging.",
      image: "/images/pumps-pumping-system/SewageCutterPump.jpg",
    },
    {
      id: 16,
      name: "VFD Booster Pumps",
      description:
        "High-efficiency centrifugal booster pump for water transfer, irrigation, and industrial applications.",
      image: "/images/pumps-pumping-system/CMBEBoosterPump.webp",
    },
  ],
  "heating-systems": [
    {
      id: 17,
      name: "Heat Pump",
      description:
        "Air-source heat pump system for residential heating and cooling with high energy efficiency ratings.",
      image: "/images/heat-pumps/heatPump1.webp",
    },
    {
      id: 18,
      name: "Heat Pump",
      description:
        "Ground-source geothermal heat pump for sustainable heating and cooling with superior efficiency performance.",
      image: "/images/heat-pumps/heatPump2.webp",
    },
    {
      id: 19,
      name: "Solar Water Heater System",
      description:
        "Flat plate solar collector system for residential water heating with high thermal efficiency.",
      image: "/images/solar-water-heating-syatem/SolarWaterHeatingSystem1.webp",
    },
    {
      id: 20,
      name: "Solar Water Heater System",
      description:
        "Evacuated tube solar collector system with superior heat retention and performance in all weather conditions.",
      image: "/images/solar-water-heating-syatem/SolarWaterHeatingSystem2.webp",
    },
    {
      id: 21,
      name: "Solar Water Heater System",
      description:
        "Complete solar water heating system with storage tank, circulation pump, and control system.",
      image: "/images/solar-water-heating-syatem/SolarWaterHeatingSystem3.webp",
    },
    {
      id: 22,
      name: "Oil/Gas Central Water Heater",
      description:
        "High-capacity oil/gas-fired water heater for commercial and industrial applications with rapid heating.",
      image: "/images/water-heaters/OilGasCentralWaterHeater.png",
    },
    {
      id: 23,
      name: "Bio Mass Water Heating System",
      description:
        "Sustainable biomass-fired water heating system using renewable fuel sources for eco-friendly operation.",
      image: "/images/water-heaters/BioMassWaterHeatingSystem.png",
    },
    {
      id: 24,
      name: "Water Heater",
      description:
        "Tankless water heater system providing instant hot water with energy-saving technology and space efficiency.",
      image: "/images/water-heaters/WaterHeater3.png",
    },
  ],
  "solar-power-pv": [
    {
      id: 25,
      name: "Solar Panel",
      description:
        "High-efficiency monocrystalline solar panels for residential and commercial solar power installations.",
      image: "/images/solar-power-pv/SolarPowerPV1.webp",
    },
    {
      id: 26,
      name: "Solar Panel",
      description:
        "Cost-effective polycrystalline solar panels with excellent performance and long-term reliability.",
      image: "/images/solar-power-pv/SolarPowerPV2.webp",
    },
  ],
  "plumbing-services": [
    {
      id: 27,
      name: "Copper Plumbing",
      description:
        "High-quality copper plumbing systems for residential and commercial applications with superior durability and corrosion resistance.",
      image: "/images/plumbing-services/copper_1.webp",
    },
    {
      id: 28,
      name: "MS Plumbing - Durable and Efficient Networks",
      description:
        "Mild steel plumbing solutions designed for industrial applications with robust construction and long-lasting performance.",
      image: "/images/plumbing-services/ms_plumbing_1.webp",
    },
    {
      id: 29,
      name: "SS Plumbing",
      description:
        "Stainless steel plumbing systems offering exceptional hygiene, corrosion resistance, and aesthetic appeal for modern installations.",
      image: "/images/plumbing-services/ss_plumbing_2.webp",
    },
    {
      id: 30,
      name: "Booster Pumps and Pressure Systems",
      description:
        "Advanced booster pump systems ensuring consistent water pressure and reliable performance for high-rise buildings and large facilities.",
      image: "/images/plumbing-services/booster_pumps_pressure_systems.webp",
    },
    {
      id: 31,
      name: "MS & SS Storage Tanks Integration",
      description:
        "Comprehensive storage tank solutions integrating mild steel and stainless steel systems for optimal water storage and distribution.",
      image:
        "/images/plumbing-services/ms_ss_storage_tanks_integration_02.webp",
    },
  ],
};

const categoryNames = {
  "water-treatment-plants": "Water Treatment Plants",
  "ro-system": "RO System",
  "sewage-treatment-plants": "Sewage Treatment Plants",
  "pumps-pumping-system": "Pumps & Pumping System",
  "heating-systems": "Heating Systems",
  "solar-power-pv": "Solar Power PV",
  "plumbing-services": "Plumbing Services",
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
      setTimeout(() => {
        setProducts(categoryProducts[category]);
        setIsLoading(false);
      }, 400);
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
          minHeight: "450px",
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
        <Box
          sx={{
            position: "relative",
            height: "280px",
            overflow: "hidden",
            width: "100%",
            flexShrink: 0,
          }}
        >
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            sx={{
              borderRadius: 0,
            }}
          />
        </Box>
        <CardContent
          sx={{
            padding: { xs: 2, sm: 2.5, md: 3 },
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
            pb: { xs: 3, sm: 4, md: 6 },
            backgroundColor: "background.default",
            minHeight: "100vh",
            background: "#edf3fc",
          }}
        >
          <Container maxWidth="lg">
            <Box>
              <Breadcrumbs
                items={[
                  { label: "Products", href: "/#products" },
                  {
                    label: categoryNames[currentCategory],
                    href: null,
                  },
                ]}
                showHome={true}
              />
              <SectionTitle
                variant={isSmallMobile ? "h4" : isMobile ? "h3" : "h2"}
                component="h1"
              >
                Our <br />
                <span className="category">
                  {categoryNames[currentCategory]}
                </span>
              </SectionTitle>

              {/* Installation & Commissioning Services Banner for Plumbing Services */}
              {currentCategory === "plumbing-services" && (
                <Box
                  sx={{
                    backgroundColor: "rgba(2, 101, 254, 0.05)",
                    padding: { xs: 3, sm: 4, md: 5 },
                    marginBottom: { xs: 4, sm: 5, md: 6 },
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      background:
                        "linear-gradient(90deg, #0265FE 0%, #00CC87 100%)",
                    },
                  }}
                >
                  <Typography
                    variant={isSmallMobile ? "h5" : isMobile ? "h4" : "h3"}
                    component="h2"
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.text.secondary,
                      marginBottom: { xs: 2, sm: 3 },
                      fontSize: {
                        xs: "1.5rem",
                        sm: "1.75rem",
                        md: "2rem",
                      },
                    }}
                  >
                    Installation & Commissioning Services
                  </Typography>
                  <Typography
                    variant={isSmallMobile ? "body2" : "body1"}
                    sx={{
                      color: theme.palette.text.secondary,
                      lineHeight: 1.7,
                      maxWidth: "800px",
                      margin: "0 auto",
                      fontSize: {
                        xs: "0.9rem",
                        sm: "1rem",
                        md: "1.1rem",
                      },
                    }}
                  >
                    With a focus on quality materials, Precision installation,
                    and Long-Term reliability, We deliver plumbing solutions
                    that ensure smooth operation and sustainability.
                  </Typography>
                </Box>
              )}

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
            pb: { xs: 2, sm: 3, md: 4 },
            backgroundColor: "background.default",
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#edf3fc",
          }}
        >
          <Container maxWidth="lg">
            <Breadcrumbs
              items={[{ label: "Products", href: null }]}
              showHome={true}
            />
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
            pb: { xs: 3, sm: 4, md: 6 },
            backgroundColor: "background.default",
            minHeight: "100vh",
            background: "#edf3fc",
          }}
        >
          <Container maxWidth="lg">
            <Box>
              <Breadcrumbs
                items={[
                  { label: "Products", href: "/#products" },
                  {
                    label: categoryNames[currentCategory],
                    href: null,
                  },
                ]}
                showHome={true}
              />
              <SectionTitle
                variant={isSmallMobile ? "h4" : isMobile ? "h3" : "h2"}
                component="h1"
              >
                Our <br />
                <span className="category">
                  {categoryNames[currentCategory]}
                </span>
              </SectionTitle>

              {/* Installation & Commissioning Services Banner for Plumbing Services */}
              {currentCategory === "plumbing-services" && (
                <Box
                  sx={{
                    backgroundColor: "rgba(2, 101, 254, 0.05)",
                    padding: { xs: 3, sm: 4, md: 5 },
                    marginBottom: { xs: 4, sm: 5, md: 6 },
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      background:
                        "linear-gradient(90deg, #0265FE 0%, #00CC87 100%)",
                    },
                  }}
                >
                  <Typography
                    variant={isSmallMobile ? "h5" : isMobile ? "h4" : "h3"}
                    component="h2"
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.text.secondary,
                      marginBottom: { xs: 2, sm: 3 },
                      fontSize: {
                        xs: "1.5rem",
                        sm: "1.75rem",
                        md: "2rem",
                      },
                    }}
                  >
                    Installation & Commissioning Services
                  </Typography>
                  <Typography
                    variant={isSmallMobile ? "body2" : "body1"}
                    sx={{
                      color: theme.palette.text.secondary,
                      lineHeight: 1.7,
                      maxWidth: "800px",
                      margin: "0 auto",
                      fontSize: {
                        xs: "0.9rem",
                        sm: "1rem",
                        md: "1.1rem",
                      },
                    }}
                  >
                    With a focus on quality materials, Precision installation,
                    and Long-Term reliability, We deliver plumbing solutions
                    that ensure smooth operation and sustainability.
                  </Typography>
                </Box>
              )}

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
          pb: { xs: 3, sm: 4, md: 6 },
          backgroundColor: "background.default",
          minHeight: "100vh",
          background: "#edf3fc",
        }}
      >
        <Container maxWidth="lg">
          <Fade in timeout={400}>
            <Box>
              <Breadcrumbs
                items={[
                  { label: "Products", href: "/#products" },
                  {
                    label: categoryNames[currentCategory],
                    href: null,
                  },
                ]}
                showHome={true}
              />
              <SectionTitle
                variant={isSmallMobile ? "h4" : isMobile ? "h3" : "h1"}
                component="h1"
              >
                Our <br />
                <span className="category">
                  {categoryNames[currentCategory]}
                </span>
              </SectionTitle>

              {/* Installation & Commissioning Services Banner for Plumbing Services */}
              {currentCategory === "plumbing-services" && (
                <Box
                  sx={{
                    backgroundColor: "rgba(2, 101, 254, 0.05)",
                    padding: { xs: 3, sm: 4, md: 5 },
                    marginBottom: { xs: 4, sm: 5, md: 6 },
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      background:
                        "linear-gradient(90deg, #0265FE 0%, #00CC87 100%)",
                    },
                  }}
                >
                  <Typography
                    variant={isSmallMobile ? "h5" : isMobile ? "h5" : "h4"}
                    component="h2"
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.text.secondary,
                      marginBottom: { xs: 2, sm: 3 },
                      fontSize: {
                        xs: "1.5rem",
                        sm: "1.75rem",
                        md: "2rem",
                      },
                    }}
                  >
                    Installation & Commissioning Services
                  </Typography>
                  <Typography
                    variant={isSmallMobile ? "body2" : "body1"}
                    sx={{
                      color: theme.palette.text.secondary,
                      lineHeight: 1.7,
                      maxWidth: "800px",
                      margin: "0 auto",
                      fontSize: {
                        xs: "0.9rem",
                        sm: "1rem",
                        md: "1.1rem",
                      },
                    }}
                  >
                    With a focus on quality materials, Precision installation,
                    and Long-Term reliability, We deliver plumbing solutions
                    that ensure smooth operation and sustainability.
                  </Typography>
                </Box>
              )}

              <Grid
                container
                spacing={{ xs: 3, sm: 4, md: 5 }}
                justifyContent="center"
              >
                {products.map((product, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={4} key={product.id}>
                    <Fade in timeout={400 + index * 100}>
                      <Box>
                        <ProductCard
                          onClick={() => handleProductClick(product)}
                        >
                          <Box
                            sx={{
                              position: "relative",
                              height: "280px",
                              overflow: "hidden",
                              width: "100%",
                              flexShrink: 0,
                            }}
                          >
                            <ProductImage
                              src={product.image}
                              alt={product.name}
                              fill
                              className="product-image"
                              sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
                              style={{
                                objectFit: "contain",
                                objectPosition: "center",
                              }}
                              priority={index < 3}
                            />
                          </Box>

                          <CardContent
                            sx={{
                              padding: { xs: 2, sm: 2.5, md: 3 },
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
                                justifyContent: "center",
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
                                  lineHeight: 1.1,
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
