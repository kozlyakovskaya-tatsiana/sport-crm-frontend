import { AxiosResponse } from "axios";
import selfFitAxios from "../../axios/selfFitAxios";
import { SPORT_GROUPS_API } from "../endpoints";
import { CreateSportGroupRequest } from "./requests/CreateSportGroupRequest";

export async function createSportGroup(
  body: CreateSportGroupRequest
): Promise<AxiosResponse<boolean>> {
  return selfFitAxios.post<boolean>(SPORT_GROUPS_API, body);
}
// export async function getSportGroups(): Promise<AxiosResponse<T[]>> {
//   return selfFitAxios.get<Tenant[]>(TENANTS_API);
// }

export const sportGroupService = {
  createSportGroup,
};
