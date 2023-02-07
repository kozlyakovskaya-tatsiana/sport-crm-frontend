import { CreateActivityRequest } from "./requests/CreateActivityRequest";
import selfFitAxios from "../../axios/selfFitAxios";
import { ACTIVITIES_ENDPOINT } from "../endpoints";

async function createActivity(createActivityRequest: CreateActivityRequest) {
  return selfFitAxios.post(ACTIVITIES_ENDPOINT, createActivityRequest);
}

export const activityService = { createActivity };
