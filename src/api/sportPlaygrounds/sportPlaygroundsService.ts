import { CreateSportPlaygroundRequest } from "./requests/CreateSportPlaygroundRequest";
import selfFitAxios from "../../axios/selfFitAxios";
import { SPORT_PLAYGROUNDS_API } from "../endpoints";

const createSportPlayground = async (body: CreateSportPlaygroundRequest) =>
  selfFitAxios.post(SPORT_PLAYGROUNDS_API, body);
const getSportPlaygrounds = async () => selfFitAxios.get(SPORT_PLAYGROUNDS_API);

export const sportPlaygroundsService = {
  getSportPlaygrounds,
  createSportPlayground,
};
