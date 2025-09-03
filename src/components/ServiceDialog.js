"use client";

import React, { useState } from "react";
import {
  Dialog,
  IconButton,
  Typography,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    maxWidth: "90vw",
    maxHeight: "90vh",
    width: "600px",
    height: "auto",
    margin: theme.spacing(2),
    borderRadius: theme.spacing(2),
    overflow: "hidden",
    background: "#fff",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
    display: "flex",
    flexDirection: "column",
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

const DialogHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2, 3),
  borderBottom: "1px solid #e0e0e0",
  backgroundColor: "#f8f9fa",
  flexShrink: 0,
}));

const ServiceIcon = styled(Image)(({ theme }) => ({
  marginRight: theme.spacing(2),
  flexShrink: 0,
}));

const FormSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  overflowY: "auto",
  flex: 1,
  minHeight: 0,
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: "white",
  padding: theme.spacing(0.5, 6),
  fontSize: "1.1rem",
  fontWeight: 600,
  borderRadius: theme.spacing(1),
  textTransform: "none",
  "&:hover": {
    background: theme.palette.secondary.main,
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(0, 43, 122, 0.3)",
  },
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
}));

const ServiceDialog = ({ open, onClose, service }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: service?.title || "",
    message: "",
  });

  const getServiceText = (serviceTitle) => {
    if (typeof serviceTitle === "string") {
      return serviceTitle;
    }
    if (React.isValidElement(serviceTitle)) {
      const extractText = (element) => {
        if (typeof element === "string") {
          return element;
        }
        if (Array.isArray(element)) {
          return element.map(extractText).join(" ");
        }
        if (element && element.props && element.props.children) {
          return extractText(element.props.children);
        }
        return "";
      };
      return extractText(serviceTitle);
    }
    return "";
  };

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Form submitted:", formData);

    alert("Thank you for your request! We'll get back to you soon.");
    onClose();
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      service: service?.title || "",
      message: "",
    });
  };

  const getServiceFormFields = () => {
    const baseFields = [
      { name: "name", label: "Full Name", required: true, type: "text" },
      { name: "email", label: "Email Address", required: true, type: "email" },
      { name: "phone", label: "Phone Number", required: false, type: "tel" },
      { name: "company", label: "Company Name", required: false, type: "text" },
    ];

    const serviceText = getServiceText(service?.title);

    if (serviceText.includes("Quote Request")) {
      return [
        ...baseFields,
        {
          name: "projectType",
          label: "Project Type",
          required: true,
          type: "select",
          options: [
            "New Installation",
            "Replacement",
            "Maintenance",
            "Upgrade",
            "Other",
          ],
        },
      ];
    } else if (serviceText.includes("Site Visit")) {
      return [
        ...baseFields,
        {
          name: "address",
          label: "Site Address",
          required: true,
          type: "text",
        },
        {
          name: "siteType",
          label: "Site Type",
          required: true,
          type: "select",
          options: [
            "Residential",
            "Commercial",
            "Industrial",
            "Agricultural",
            "Other",
          ],
        },
        {
          name: "visitDate",
          label: "Preferred Visit Date",
          required: true,
          type: "date",
        },
      ];
    } else if (serviceText.includes("Layout Drawing")) {
      return [
        ...baseFields,
        {
          name: "projectScope",
          label: "Project Scope",
          required: true,
          type: "select",
          options: [
            "Water Treatment",
            "Pumping System",
            "Heat Pump",
            "Solar System",
            "RO System",
            "Other",
          ],
        },
      ];
    } else if (serviceText.includes("Installation")) {
      return [
        ...baseFields,
        {
          name: "equipmentType",
          label: "Equipment Type",
          required: true,
          type: "select",
          options: [
            "Water Treatment Plant",
            "Pumping System",
            "Heat Pump",
            "Solar Panel",
            "RO System",
            "Other",
          ],
        },
        {
          name: "installationDate",
          label: "Preferred Installation Date",
          required: true,
          type: "date",
        },
      ];
    } else if (serviceText.includes("Warranty Service")) {
      return [
        ...baseFields,
        {
          name: "equipmentModel",
          label: "Equipment Model",
          required: true,
          type: "text",
        },
        {
          name: "serialNumber",
          label: "Serial Number",
          required: false,
          type: "text",
        },
        {
          name: "installationDate",
          label: "Installation Date",
          required: false,
          type: "date",
        },
      ];
    }

    return baseFields;
  };

  const renderFormField = (field) => {
    if (field.type === "select") {
      return (
        <FormControl
          fullWidth
          key={field.name}
          required={field.required}
          size="small"
        >
          <InputLabel>{field.label}</InputLabel>
          <Select
            value={formData[field.name] || ""}
            onChange={handleInputChange(field.name)}
            label={field.label}
          >
            {field.options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }

    return (
      <TextField
        key={field.name}
        fullWidth
        label={field.label}
        value={formData[field.name] || ""}
        onChange={handleInputChange(field.name)}
        required={field.required}
        type={field.type}
        variant="outlined"
        margin="dense"
        size="small"
      />
    );
  };

  const formFields = getServiceFormFields();

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      fullWidth
      PaperProps={{
        sx: {
          width: isMobile ? "100vw" : "600px",
          maxWidth: isMobile ? "100vw" : "600px",
          maxHeight: isMobile ? "95vh" : "90vh",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <DialogHeader>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {service?.icon && (
            <ServiceIcon
              src={service.icon}
              alt={service.title}
              width={40}
              height={40}
            />
          )}
          <Typography
            variant="h6"
            component="h2"
            sx={{ fontWeight: 600, color: "#002B7A" }}
          >
            {service?.title}
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogHeader>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
        }}
      >
        <FormSection>
          <Typography variant="body1" sx={{ mb: 2, color: "#666" }}>
            Please fill out the form below and we'll get back to you as soon as
            possible.
          </Typography>

          <Grid container spacing={1.5} sx={{ alignItems: "baseline" }}>
            {formFields.map((field) => (
              <Grid
                item
                xs={12}
                sm={
                  field.name === "name" ||
                  field.name === "email" ||
                  field.name === "address" ||
                  field.name === "siteType" ||
                  field.name === "equipmentModel" ||
                  field.name === "serialNumber"
                    ? 6
                    : 12
                }
                key={field.name}
                sx={{ display: "flex", alignItems: "flex-end" }}
              >
                {renderFormField(field)}
              </Grid>
            ))}
          </Grid>

          <TextField
            fullWidth
            label="Additional Message"
            value={formData.message}
            onChange={handleInputChange("message")}
            multiline
            rows={3}
            variant="outlined"
            margin="dense"
            size="small"
            sx={{ mt: 1.5 }}
            placeholder="Please provide any additional details about your request..."
          />

          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <SubmitButton
              type="submit"
              variant="contained"
              size="large"
              disabled={!formData.name || !formData.email}
            >
              Submit Request
            </SubmitButton>
          </Box>
        </FormSection>
      </form>
    </StyledDialog>
  );
};

export default ServiceDialog;
