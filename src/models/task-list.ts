
import { BaseList } from "./base-list-item";
import { CardItem } from "./card-item";

export interface TaskList  extends BaseList {
    cards: CardItem[];
    isAddable: boolean;
}