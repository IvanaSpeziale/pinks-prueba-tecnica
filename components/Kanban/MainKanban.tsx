// components/MainKanban.tsx
import Kanban from "./Kanban";
import { columnDisplayList } from "@/constants/constants";

export default function MainKanban() {
  return <Kanban columnsConfig={columnDisplayList} />;
}
