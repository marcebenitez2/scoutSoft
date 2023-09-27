import React from "react";
import Navbar from "../components/navbar";
import { useEffect } from "react";
import { fetchBD } from "../services/fetchBD";
import { useState } from "react";
import Notificacion from "../components/notificacion";

function Menu() {
  const [notificaciones, setNotificaciones] = useState([]);
  const [activas, setActivas] = useState([]);
  const [inactivas, setInactivas] = useState([]);

  useEffect(() => {
    fetchBD(setNotificaciones, "http://localhost/notification.php");
  }, []);

  useEffect(() => {
    setActivas(
      notificaciones.filter((notificacion) => notificacion.active === "1")
    );
    setInactivas(
      notificaciones.filter((notificacion) => notificacion.active !== "1")
    );
  }, [notificaciones]);

  return (
    <main className="w-screen min-h-screen dark:bg-custon-black flex flex-col pt-4 pb-6 px-16 gap-4 mdn:px-0 mdn:pt-0 overflow-x-hidden">
      <Navbar />
      {activas ? (
        <section className="flex flex-col gap w-full h-full mdn:px-8">
          <div className="w-full h-full flex flex-col gap-4">
            <h1 className="text-3xl text-center dark:text-white">
              Mensajes nuevos ({activas.length})
            </h1>
            <div className="w-full h-full grid grid-cols-5 gap-x-4 gap-y-4 xln:grid-cols-3 lgn:grid-cols-2 smn:grid-cols-1  grid-rows-2">
              {activas.map((noti) => (
                <Notificacion noti={noti} key={noti.id} />
              ))}
            </div>
          </div>
          <div className="w-full h-full flex flex-col gap-4">
            <h1 className="text-3xl text-center dark:text-white">
              Mensajes vistos
            </h1>
            <div className="w-full h-full grid grid-cols-5 gap-x-4 gap-y-4 grid-rows-2 xln:grid-cols-3 lgn:grid-cols-2 smn:grid-cols-1 ">
              {inactivas.map((noti) => (
                <Notificacion noti={noti} key={noti.id} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <span className="loader"></span>
      )}
    </main>
  );
}

export default Menu;
