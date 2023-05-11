import { BaseEntity } from "../../../models/BaseEntity";

export interface SportActivityView extends BaseEntity {
  name: string;
  CostPerHourInBYN: number;
}
