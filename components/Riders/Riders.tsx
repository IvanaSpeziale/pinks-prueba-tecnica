import s from "./Riders.module.scss";
import Rider from "@/bases/Rider";
import { useRiders } from "@/contexts/Riders.context";

export default function Riders() {
  const { riders, activateRider } = useRiders();

  return (
    <section className={s["pk-riders__container"]}>
      <div className={s["pk-riders"]}>
        <h3>Riders:</h3>
        {riders.map((rider) => (
          <div key={rider.id} className={s["pk-rider"]}>
            <Rider {...rider} />
            {rider.orderWanted.state === "READY" && (
              <button onClick={() => activateRider(rider.orderWanted.id)}>
                Entregar y eliminar
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
