import { Guid } from "guid-typescript";
import { SportActivity } from "./SportActivity";
import { Tenant } from "./Tenant";
import { BaseEntity } from "./BaseEntity";
import { SportGroupMember } from "./SportGroupMember";

export interface SportGroup extends BaseEntity {
  name: string;
  sportActivity: SportActivity;
  sportActivityId: Guid | null;
  tenant: Tenant;
  tenantId: Guid | null;
  members: SportGroupMember[];
}
