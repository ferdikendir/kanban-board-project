import { BaseList } from "./base-list-item";
import { TaskList } from "./task-list";


export interface BoardItem  extends BaseList {
    link: string;
    linkName: string;
    taskLists: TaskList[]
}