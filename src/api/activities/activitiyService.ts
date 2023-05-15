import { AxiosResponse } from "axios";
import { CreateActivityRequest } from "./requests/CreateActivityRequest";
import selfFitAxios from "../../axios/selfFitAxios";
import { SPORT_ACTIVITIES_API } from "../endpoints";
import { SportActivityView } from "./viewModels/SportActivityView";

async function getActivities(): Promise<AxiosResponse<SportActivityView[]>> {
  return selfFitAxios.get<SportActivityView[]>(SPORT_ACTIVITIES_API);
}
async function createActivity(
  createActivityRequest: CreateActivityRequest
): Promise<AxiosResponse<boolean>> {
  return selfFitAxios.post(SPORT_ACTIVITIES_API, createActivityRequest);
}
async function deleteActivity(
  activityId: string
): Promise<AxiosResponse<boolean>> {
  return selfFitAxios.delete(`${SPORT_ACTIVITIES_API}/${activityId}`);
}

export const sportActivitiesService = {
  createActivity,
  getActivities,
  deleteActivity,
};
