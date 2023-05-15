import { BaseEntity } from "../../../models/BaseEntity";

export interface SportActivityView extends BaseEntity {
  name: string;
  costPerHourInByn: number;
  sportGroups: any[];
}
