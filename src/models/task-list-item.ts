import { BaseListItem } from "./base-list-item";
import { CardItem } from "./card-item";

export interface TaskListItem  extends BaseListItem {
    listItems: CardItem[];
    isAddable: boolean;
}