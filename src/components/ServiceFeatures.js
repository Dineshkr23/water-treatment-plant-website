"use client";

import { useState, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import ServiceDialog from "./ServiceDialog";

const ServiceItem = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  textAlign: "left",
  flex: 1,
  minWidth: "100px",
  transition: "all 0.3s ease",
  cursor: "pointer",
  padding: theme.spacing(1),
  "&:hover": {
    backgroundColor: "rgba(0, 43, 122, 0.05)",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 20px rgba(0, 43, 122, 0.1)",
  },
}));

const ServiceIcon = styled(Image)(({ theme }) => ({
  marginRight: theme.spacing(0),
  flexShrink: 0,
  transition: "all 0.3s ease",
}));

const services = [
  {
    icon: "/images/free-quote-request.png",
    title: (
      <>
        <span style={{ fontWeight: 400 }}>Free</span>{" "}
        <span style={{ fontWeight: 600 }}>Quote Request</span>
      </>
    ),
  },
  {
    icon: "/images/free-site-visit.png",
    title: (
      <>
        <span style={{ fontWeight: 400 }}>Free</span>{" "}
        <span style={{ fontWeight: 600 }}>Site Visit</span>
      </>
    ),
  },
  {
    icon: "/images/free-layout-drawing.png",
    title: (
      <>
        <span style={{ fontWeight: 400 }}>Layout</span>{" "}
        <span style={{ fontWeight: 600 }}>Drawing</span>
      </>
    ),
  },
  {
    icon: "/images/free-installation.png",
    title: (
      <>
        <span style={{ fontWeight: 400 }}>Installation &</span>{" "}
        <span style={{ fontWeight: 600 }}>Commissioning Support</span>
      </>
    ),
  },
  {
    icon: "/images/free-waranty-service.png",
    title: (
      <>
        <span style={{ fontWeight: 400 }}>Warranty</span>{" "}
        <span style={{ fontWeight: 600 }}>Services</span>
      </>
    ),
  },
];

const ServiceFeatures = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedService(null);
  };

  const openQuoteDialog = () => {
    const quoteService = services[0];
    setSelectedService(quoteService);
    setDialogOpen(true);
  };

  useEffect(() => {
    window.openQuoteDialog = openQuoteDialog;

    const handleOpenQuoteDialog = () => {
      openQuoteDialog();
    };

    window.addEventListener("openQuoteDialog", handleOpenQuoteDialog);

    return () => {
      window.removeEventListener("openQuoteDialog", handleOpenQuoteDialog);
      delete window.openQuoteDialog;
    };
  }, []);

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row" },
          margin: "0 auto",
          flexGrow: 1,
          gap: 0,
          overflowX: "auto",
          mt: 1,
        }}
      >
        <Box
          sx={{
            display: { xs: "none", sm: "none", md: "flex" },
            flexDirection: "row",
            gap: 0,
            width: "100%",
          }}
        >
          {services.map((service, index) => (
            <ServiceItem
              key={`desktop-${index}`}
              // onClick={() => handleServiceClick(service)}
              sx={{
                borderRight:
                  index < services.length - 1 ? "1px solid #BCBCBC" : "none",
                flex: "1",
              }}
            >
              <ServiceIcon
                src={service.icon}
                alt={service.title}
                width={80}
                height={80}
              />
              <Typography
                variant="p"
                component="p"
                sx={{
                  fontWeight: 600,
                  color: "#002B7A",
                }}
              >
                {service.title}
              </Typography>
            </ServiceItem>
          ))}
        </Box>

        <Box
          sx={{
            display: { xs: "none", sm: "flex", md: "none" },
            flexDirection: "row",
            gap: 0,
            flex: "1",
          }}
        >
          <ServiceItem
            // onClick={() => handleServiceClick(services[0])}
            sx={{
              flex: "1",
            }}
          >
            <ServiceIcon
              src={services[0].icon}
              alt={services[0].title}
              width={80}
              height={80}
            />
            <Typography
              variant="p"
              component="p"
              sx={{
                fontWeight: 600,
                color: "#002B7A",
              }}
            >
              {services[0].title}
            </Typography>
          </ServiceItem>
          <ServiceItem
            // onClick={() => handleServiceClick(services[1])}
            sx={{
              flex: "1",
            }}
          >
            <ServiceIcon
              src={services[1].icon}
              alt={services[1].title}
              width={80}
              height={80}
            />
            <Typography
              variant="p"
              component="p"
              sx={{
                fontWeight: 600,
                color: "#002B7A",
              }}
            >
              {services[1].title}
            </Typography>
          </ServiceItem>
        </Box>

        <Box
          sx={{
            display: { xs: "none", sm: "flex", md: "none" },
            flexDirection: "row",
            gap: 0,
            flex: "1",
          }}
        >
          <ServiceItem
            // onClick={() => handleServiceClick(services[2])}
            sx={{
              flex: "1",
            }}
          >
            <ServiceIcon
              src={services[2].icon}
              alt={services[2].title}
              width={80}
              height={80}
            />
            <Typography
              variant="p"
              component="p"
              sx={{
                fontWeight: 600,
                color: "#002B7A",
              }}
            >
              {services[2].title}
            </Typography>
          </ServiceItem>
          <ServiceItem
            // onClick={() => handleServiceClick(services[3])}
            sx={{
              flex: "1",
            }}
          >
            <ServiceIcon
              src={services[3].icon}
              alt={services[3].title}
              width={80}
              height={80}
            />
            <Typography
              variant="p"
              component="p"
              sx={{
                fontWeight: 600,
                color: "#002B7A",
              }}
            >
              {services[3].title}
            </Typography>
          </ServiceItem>
        </Box>

        <Box
          sx={{
            display: { xs: "none", sm: "flex", md: "none" },
            gap: 0,
            flex: "1",
          }}
        >
          <ServiceItem
            // onClick={() => handleServiceClick(services[4])}
            sx={{
              flex: "1",
              maxWidth: "50%",
            }}
          >
            <ServiceIcon
              src={services[4].icon}
              alt={services[4].title}
              width={80}
              height={80}
            />
            <Typography
              variant="p"
              component="p"
              sx={{
                fontWeight: 600,
                color: "#002B7A",
              }}
            >
              {services[4].title}
            </Typography>
          </ServiceItem>
        </Box>

        {services.map((service, index) => (
          <ServiceItem
            key={`mobile-${index}`}
            // onClick={() => handleServiceClick(service)}
            sx={{
              display: { xs: "flex", sm: "none", md: "none" },
              width: "100%",
              borderBottom:
                index < services.length - 1 ? "1px solid #BCBCBC" : "none",
            }}
          >
            <ServiceIcon
              src={service.icon}
              alt={service.title}
              width={80}
              height={80}
            />
            <Typography
              variant="p"
              component="p"
              sx={{
                fontWeight: 600,
                color: "#002B7A",
              }}
            >
              {service.title}
            </Typography>
          </ServiceItem>
        ))}
      </Box>

      <ServiceDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        service={selectedService}
      />
    </Container>
  );
};

export default ServiceFeatures;
