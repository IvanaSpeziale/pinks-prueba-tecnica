import Kanban from "./Kanban";
import { columnDisplayHistoryList } from "@/constants/constants";

export default function HistoryKanban() {
  return <Kanban columnsConfig={columnDisplayHistoryList} />;
}
