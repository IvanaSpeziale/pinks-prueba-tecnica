import Logo from "@/bases/Logo";
import s from "../Layout.module.scss";
import Riders from "@/components/Riders";
import MainKanban from "@/components/Kanban/MainKanban";
import { useRouter } from "next/router";
import Link from "next/link";

export default function OrdersLayout() {
  const router = useRouter();

  const navigateToHistory = () => {
    router.push("/_history");
  };

  return (
    <main className={s["pk-layout"]}>
      <Link href="/" passHref>
        <nav className={s["pk-layout__navbar"]}>
          <Logo size="S" />
          <span>KDS: Krazy Display Service</span>
        </nav>
      </Link>
      <div className={s["pk-layout__button-container"]}>
        <button onClick={navigateToHistory} className={s["pk-layout__button"]}>
          Historial
        </button>
      </div>
      <article className={s["pk-layout__app"]}>
        <MainKanban />
        <Riders />
      </article>
    </main>
  );
}
