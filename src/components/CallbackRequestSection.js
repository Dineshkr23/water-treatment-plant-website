"use client";

import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const CallbackContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: "background.default",
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(6, 0),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(4, 0),
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(2),
  "& .request-a": {
    color: "text.primary",
  },
  "& .call-back": {
    color: theme.palette.primary.main,
  },
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
    marginBottom: theme.spacing(1.5),
  },
  [theme.breakpoints.down("sm")]: {
    marginBottom: theme.spacing(1),
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: "white",
  padding: theme.spacing(0.5, 6),
  fontSize: "1rem",
  fontWeight: 600,
  borderRadius: theme.spacing(1),
  "&:hover": {
    backgroundColor: theme.palette.secondary.dark,
    transform: "translateY(-2px)",
  },
  transition: "all 0.3s ease",
  [theme.breakpoints.down("md")]: {
    padding: "8px 40px",
    fontSize: "1.1rem",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "6px 30px",
    fontSize: "1rem",
    width: "100%",
    maxWidth: "200px",
  },
}));

const FormContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#f8f9fa",
  border: "1px solid #e0e0e0",
  padding: "70px 40px",
  borderRadius: 4,
  [theme.breakpoints.down("lg")]: {
    padding: "50px 30px",
  },
  [theme.breakpoints.down("md")]: {
    padding: "40px 25px",
    marginTop: theme.spacing(3),
  },
  [theme.breakpoints.down("sm")]: {
    padding: "30px 20px",
    marginTop: theme.spacing(2),
  },
}));

const CallbackRequestSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <CallbackContainer>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 3, sm: 4, md: 6 }}
          alignItems="center"
          direction={isMobile ? "column" : "row"}
        >
          <Grid item xs={12} md={6}>
            <SectionTitle
              variant={isSmallMobile ? "h4" : isMobile ? "h3" : "h2"}
              component="h2"
            >
              <span className="request-a">Request a</span>{" "}
              <span className="call-back">Call Back</span>
            </SectionTitle>

            <Typography
              variant={isSmallMobile ? "body2" : "body1"}
              sx={{
                fontSize: isSmallMobile
                  ? "0.9rem"
                  : isMobile
                  ? "1rem"
                  : "1.1rem",
                lineHeight: 1.8,
                color: "text.secondary",
                mb: { xs: 2.5, sm: 3, md: 4 },
                textAlign: isMobile ? "center" : "left",
                [theme.breakpoints.down("md")]: {
                  maxWidth: "600px",
                  margin: "0 auto",
                },
              }}
            >
              Have questions or need guidance on the right solution? Share your
              details and our team will get back to you shortly with expert
              advice tailored to your requirements.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={1}
            sx={{ display: { xs: "none", md: "block" } }}
          />
          <Grid item xs={12} md={5}>
            <FormContainer>
              <Grid container spacing={{ xs: 1.5, sm: 2, md: 2 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    size={isSmallMobile ? "small" : "medium"}
                    sx={{
                      backgroundColor: "white",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    variant="outlined"
                    size={isSmallMobile ? "small" : "medium"}
                    sx={{
                      backgroundColor: "white",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Mobile No"
                    variant="outlined"
                    size={isSmallMobile ? "small" : "medium"}
                    sx={{
                      backgroundColor: "white",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="State"
                    variant="outlined"
                    size={isSmallMobile ? "small" : "medium"}
                    sx={{
                      backgroundColor: "white",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Pin Code"
                    variant="outlined"
                    size={isSmallMobile ? "small" : "medium"}
                    sx={{
                      backgroundColor: "white",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sx={{ textAlign: "center", mt: { xs: 2, sm: 2.5, md: 3 } }}
                >
                  <StyledButton type="submit" variant="contained">
                    Submit Request
                  </StyledButton>
                </Grid>
              </Grid>
            </FormContainer>
          </Grid>
        </Grid>
      </Container>
    </CallbackContainer>
  );
};

export default CallbackRequestSection;
