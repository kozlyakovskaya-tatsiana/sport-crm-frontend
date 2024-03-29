import { BaseEntity } from "./BaseEntity";
import { Contract } from "./Contract";
import { SportGroup } from "./SportGroup";

export interface Tenant extends BaseEntity {
  name: string;
  contract: Contract;
  contractId: string;
  sportGroups: SportGroup[];
}
