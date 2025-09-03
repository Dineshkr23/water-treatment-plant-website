"use client";

import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";

const ServiceItem = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  textAlign: "left",
  flex: 1,
  minWidth: "100px",
  transition: "all 0.3s ease",
}));

const ServiceIcon = styled(Image)(({ theme }) => ({
  marginRight: theme.spacing(2),
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
        <span style={{ fontWeight: 400 }}>Free</span>{" "}
        <span style={{ fontWeight: 600 }}>Layout Drawing</span>
      </>
    ),
  },
  {
    icon: "/images/free-installation.png",
    title: (
      <>
        <span style={{ fontWeight: 400 }}>Free</span>{" "}
        <span style={{ fontWeight: 600 }}>Installation</span>
      </>
    ),
  },
  {
    icon: "/images/free-waranty-service.png",
    title: (
      <>
        <span style={{ fontWeight: 400 }}>Free</span>{" "}
        <span style={{ fontWeight: 600 }}>Warranty Service</span>
      </>
    ),
  },
];

const ServiceFeatures = () => {
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
          mt: 4,
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
    </Container>
  );
};

export default ServiceFeatures;
