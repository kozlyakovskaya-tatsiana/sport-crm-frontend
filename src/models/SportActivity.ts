import { BaseEntity } from "./BaseEntity";
import { SportPlayground } from "./SportPlayground";

export interface SportActivity extends BaseEntity {
  name: string;
  costPerHourInByn: number;
  sportPlaygrounds: SportPlayground[];
  sportGroups: any[];
}
