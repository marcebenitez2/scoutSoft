import React from "react";
import Navbar from "../../components/navbar";
import { useState } from "react";

function Consejos() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className='className="w-screen h-screen flex flex-col pt-4 pb-6 px-16 gap-4 mdn:px-0 mdn:pt-0 overflow-x-hidden dark:bg-custon-black dark:text-white'>
      <Navbar />
      <div
        className={`w-full h-full ${
          modalOpen ? "blur" : ""
        } flex flex-col gap-4`}
      >
        <h1 className="text-3xl text-center dark:text-white">Consejos</h1>
        <div className="flex absolute right-20 ">
          <button
            onClick={() => setModalOpen(true)}
            className="bg-custon-red px-4 py-1 "
          >
            Agregar
          </button>
        </div>
      </div>
    </main>
  );
}

export default Consejos;
