import { AxiosResponse } from "axios";
import { CreateTenantRequest } from "./requests/CreateTenantRequest";
import selfFitAxios from "../../axios/selfFitAxios";
import { TENANTS_API } from "../endpoints";
import { Tenant } from "../../models/Tenant";

export async function createTenant(
  body: CreateTenantRequest
): Promise<AxiosResponse<boolean>> {
  return selfFitAxios.post<boolean>(TENANTS_API, body);
}
export async function getTenants(): Promise<AxiosResponse<Tenant[]>> {
  return selfFitAxios.get<Tenant[]>(TENANTS_API);
}

export const tenantsService = {
  createTenant,
  getTenants,
};
