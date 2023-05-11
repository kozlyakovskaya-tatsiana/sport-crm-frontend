import { BaseEntity } from "../../../models/BaseEntity";
import { SportActivityView } from "../../activities/viewModels/SportActivityView";

export interface SportGroupView extends BaseEntity {
  name: string;
  sportActivity: SportActivityView;
  tenant: {
    id: string;
    name: string;
    contract: {
      id: string;
      startDate: Date;
      endDate: Date;
    };
  };
  members: { id: string; name: string; mobilePhoneNumber: string }[];
}
