import { Guid } from "guid-typescript";
import { SportGroup } from "./SportGroup";
import { BaseEntity } from "./BaseEntity";

export interface SportGroupMember extends BaseEntity {
  firstName: string;
  lastName: string;
  mobilePhoneNumber: string;
  sportGroup: SportGroup;
  sportGroupId: Guid;
}
