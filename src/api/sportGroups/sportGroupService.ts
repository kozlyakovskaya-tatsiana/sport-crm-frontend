import { AxiosResponse } from "axios";
import selfFitAxios from "../../axios/selfFitAxios";
import { SPORT_GROUPS_API } from "../endpoints";
import { CreateSportGroupRequest } from "./requests/CreateSportGroupRequest";
import { SportGroupView } from "./viewModels/SportGroupView";

export async function createSportGroup(
  body: CreateSportGroupRequest
): Promise<AxiosResponse<boolean>> {
  return selfFitAxios.post<boolean>(SPORT_GROUPS_API, body);
}
export async function getSportGroups(): Promise<
  AxiosResponse<SportGroupView[]>
> {
  return selfFitAxios.get<SportGroupView[]>(SPORT_GROUPS_API);
}

export const sportGroupService = {
  createSportGroup,
  getSportGroups,
};
