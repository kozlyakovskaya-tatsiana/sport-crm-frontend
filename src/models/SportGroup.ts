import { SportActivity } from "./SportActivity";
import { Tenant } from "./Tenant";
import { BaseEntity } from "./BaseEntity";
import { SportGroupMember } from "./SportGroupMember";

export interface SportGroup extends BaseEntity {
  name: string;
  sportActivity: SportActivity;
  sportActivityId: string;
  tenant: Tenant;
  tenantId: string;
  members: SportGroupMember[];
}
