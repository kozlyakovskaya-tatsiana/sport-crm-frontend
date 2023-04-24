import { Guid } from "guid-typescript";
import { AxiosResponse } from "axios";
import { CreateSportPlaygroundRequest } from "./requests/CreateSportPlaygroundRequest";
import selfFitAxios from "../../axios/selfFitAxios";
import { SPORT_PLAYGROUNDS_API } from "../endpoints";
import { SportPlayground } from "../../models/SportPlayground";

const createSportPlayground = async (
  body: CreateSportPlaygroundRequest
): Promise<AxiosResponse<boolean>> =>
  selfFitAxios.post<boolean>(SPORT_PLAYGROUNDS_API, body);

const getSportPlaygrounds = async (): Promise<
  AxiosResponse<SportPlayground[]>
> => selfFitAxios.get<SportPlayground[]>(SPORT_PLAYGROUNDS_API);

const deleteSportPlayground = async (
  id: Guid
): Promise<AxiosResponse<boolean>> =>
  selfFitAxios.delete<boolean>(`${SPORT_PLAYGROUNDS_API}/${id}`);

export const sportPlaygroundsService = {
  getSportPlaygrounds,
  createSportPlayground,
  deleteSportPlayground,
};
