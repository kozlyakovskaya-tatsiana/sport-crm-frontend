import { Guid } from "guid-typescript";

export interface CreateSportGroupRequest {
  name: string;
  activityId: string;
  tenantId: string;
  members: {
    name: string;
    mobilePhoneNumber: string;
  }[];
}
