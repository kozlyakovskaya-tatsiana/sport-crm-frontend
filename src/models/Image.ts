import { SportPlayground } from "./SportPlayground";
import { BaseEntity } from "./BaseEntity";

export interface Image extends BaseEntity {
  base64Data: string;
  sportPlayground: SportPlayground;
}
