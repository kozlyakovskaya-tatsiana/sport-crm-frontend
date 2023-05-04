import React from "react";
import { Grid, IconButton, Typography, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AxiosError } from "axios";
import { DialogWrapperWithCrossButton } from "../../components/DialogWrapperWithCrossButton";
import {
  TenantForm,
  TenantFormValues,
} from "../../components/tenants/tenantForm/TenantForm";
import { CreateTenantRequest } from "../../api/tenants/requests/CreateTenantRequest";
import { tenantsService } from "../../api/tenants/tenantService";
import { TenantsTable } from "../../components/tenants/tenantsTable/TenantsTable";
import { Tenant } from "../../models/Tenant";

export const TenantsPage: React.FC = () => {
  const [isGroupModalDialogOpen, setIsGroupModalDialogOpen] =
    React.useState(false);
  const [tenants, setTenants] = React.useState<Tenant[]>([]);

  React.useEffect(() => {
    loadTenants();
  }, []);

  const theme = useTheme();

  const loadTenants = () => {
    tenantsService.getTenants().then((response) => {
      setTenants(response.data);
    });
  };

  const onCreateTenantSubmit = async (values: TenantFormValues) => {
    const body: CreateTenantRequest = {
      contractEndDate: values.contractEndDate,
      contractStartDate: values.contractStartDate,
      name: values.name,
    };
    try {
      const response = await tenantsService.createTenant(body);
      setIsGroupModalDialogOpen(false);
    } catch (error) {
      console.log(error as AxiosError);
    }
  };
  const renderTenantFormDialog = () => (
    <DialogWrapperWithCrossButton
      isOpen={isGroupModalDialogOpen}
      onCloseModalClick={() => setIsGroupModalDialogOpen(false)}
    >
      <TenantForm onSubmit={onCreateTenantSubmit} />
    </DialogWrapperWithCrossButton>
  );

  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center", paddingTop: "3%" }}>
        Tenants management
      </Typography>
      <Grid container sx={{ paddingTop: "2%", paddingBottom: "1%" }}>
        <Grid item xs={1} md={1} lg={1} />
        <Grid item xs={10} sm={10} md={10} lg={10}>
          <IconButton
            onClick={() => setIsGroupModalDialogOpen(true)}
            sx={{ color: theme.palette.primary.main }}
          >
            <AddIcon fontSize="large" />
          </IconButton>
        </Grid>
        <Grid item xs={1} md={1} lg={1} />
      </Grid>
      <Grid container>
        <Grid item xs={1} md={1} lg={1} />
        <Grid item xs={10} sm={10} md={10} lg={10}>
          <TenantsTable tenants={tenants} />
        </Grid>
        <Grid item xs={1} sm={1} md={1} lg={1} />
      </Grid>
      {renderTenantFormDialog()}
    </>
  );
};
