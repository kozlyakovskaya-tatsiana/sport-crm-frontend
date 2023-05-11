import { SportGroup } from "./SportGroup";
import { BaseEntity } from "./BaseEntity";

export interface SportGroupMember extends BaseEntity {
  name: string;
  mobilePhoneNumber: string;
  sportGroup: SportGroup;
  sportGroupId: string;
}
