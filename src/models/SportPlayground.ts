import { SportActivity } from "./SportActivity";
import { Image } from "./Image";
import { BaseEntity } from "./BaseEntity";

export interface SportPlayground extends BaseEntity {
  name: string;
  sportActivities: SportActivity[];
  image: Image;
  imageId: string;
}
