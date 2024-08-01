// layouts/HistoryLayout.tsx
import Logo from "@/bases/Logo";
import { useRouter } from "next/router";
import Link from "next/link";
import s from "../Layout.module.scss";
import { ReactNode } from "react";

export default function HistoryLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  const navigateToOrders = () => {
    router.push("/");
  };

  return (
    <div className={s["pk-layout"]}>
      <header className={s["pk-layout__navbar"]}>
        <Link href="/" passHref>
          <nav className={s["pk-layout__navbar"]}>
            <Logo size="S" />
            <span>KDS: Krazy Display Service</span>
          </nav>
        </Link>
        <div className={s["pk-layout__button-container"]}>
          <button onClick={navigateToOrders} className={s["pk-layout__button"]}>
            Órdenes
          </button>
        </div>
      </header>
      <div className={s["pk-layout__app"]}>{children}</div>
    </div>
  );
}
