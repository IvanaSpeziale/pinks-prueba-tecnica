import Kanban from "@/components/Kanban/Kanban";
import { columnDisplayHistoryList } from "@/constants/constants";
import HistoryLayout from "@/layouts/HistoryLayout/HistoryLayout";

export default function History() {
  return (
    <HistoryLayout>
      <Kanban columnsConfig={columnDisplayHistoryList} />
    </HistoryLayout>
  );
}
