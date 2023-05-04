import { Tenant } from "./Tenant";
import { BaseEntity } from "./BaseEntity";

export interface Contract extends BaseEntity {
  startDate: string;
  endDate: string;
  tenant: Tenant;
}
