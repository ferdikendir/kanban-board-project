import { BaseListItem } from "./base-list-item";
import { TaskListItem } from "./task-list-item";

export interface BoardItem  extends BaseListItem {
    link: string;
    taskListItems: TaskListItem[]
}