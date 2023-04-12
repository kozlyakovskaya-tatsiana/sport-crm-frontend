import { Guid } from "guid-typescript";

export interface CreateSportPlaygroundRequest {
  SportPlaygroundName: string;
  Base64Image: string;
  AvailableActivitiesIds: Guid[];
}
