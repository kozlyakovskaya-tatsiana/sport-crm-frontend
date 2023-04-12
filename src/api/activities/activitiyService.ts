import { Guid } from "guid-typescript";
import { CreateActivityRequest } from "./requests/CreateActivityRequest";
import selfFitAxios from "../../axios/selfFitAxios";
import { SPORT_ACTIVITIES_API } from "../endpoints";
import { SportActivity } from "../../models/SportActivity";

async function getActivities() {
  return selfFitAxios.get<SportActivity[]>(SPORT_ACTIVITIES_API);
}
async function createActivity(createActivityRequest: CreateActivityRequest) {
  return selfFitAxios.post(SPORT_ACTIVITIES_API, createActivityRequest);
}
async function deleteActivity(activityId: Guid) {
  return selfFitAxios.delete(`${SPORT_ACTIVITIES_API}/${activityId}`);
}

export const activityService = {
  createActivity,
  getActivities,
  deleteActivity,
};
