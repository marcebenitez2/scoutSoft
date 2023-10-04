import React from "react";
import { ramas } from "../services/ramas";
import { useState } from "react";
import { postBD } from "../services/postBD";

function ModalBeneficiarios({ isOpen, toClose, seleccionada }) {
  if (!isOpen) {
    return null; // Si el modal no está abierto, no renderiza nada
  }
  const [id, setId] = useState(seleccionada ? seleccionada.id : null);
  const [nombre, setNombre] = useState(seleccionada ? seleccionada.name : null);
  const [nacimiento, setNacimiento] = useState(
    seleccionada ? seleccionada.birth : null
  );
  const [direccion, setDireccion] = useState(
    seleccionada ? seleccionada.direction : null
  );
  const [telefono, setTelefono] = useState(
    seleccionada ? seleccionada.tel : null
  );
  const [mail, setMail] = useState(seleccionada ? seleccionada.mail : null);
  const [rama, setRama] = useState(seleccionada ? seleccionada.branch : null);
  const [personal, setPersonal] = useState(
    seleccionada ? seleccionada.personal_file : null
  );
  const [medical, setMedical] = useState(
    seleccionada ? seleccionada.medical_file : null
  );
  const [cuota, setCuota] = useState(seleccionada ? seleccionada.cuota : null);
  const [activo, setActivo] = useState(
    seleccionada ? seleccionada.active : null
  );

  const guardarCambios = () => {
    // Convierte "on" y "off" en 1 y 0
    const personalValue = personal === "Si" ? 1 : 0;
    const medicalValue = medical === "Si" ? 1 : 0;
    const activoValue = activo === "Si" ? 1 : 0;

    const beneficiario = {
      id,
      nombre,
      nacimiento,
      direccion,
      telefono,
      mail,
      rama,
      personal: personalValue, // Asigna el valor convertido
      medical: medicalValue, // Asigna el valor convertido
      cuota,
      activo: activoValue,
    };

    postBD(beneficiario,"http://localhost/addBeneficiarie.php")
    toClose(false)
    window.location.reload();


  };

  return (
    <main>
      {isOpen ? (
        <section className="h-screen w-screen top-0 left-0 flex items-center justify-center fixed dark:text-white">
          <div className="w-1/2 h-1/2 bg-custon-black rounded-xl border border-gray-600 flex flex-col items-center justify-between py-4 px-6 xln:w-2/4 mdn:w-4/5 animate-fade-up animate-once animate-duration-[800ms]">
            <h3 className="text-2xl">
              {seleccionada ? "Editar Beneficiario" : "Agregar nuevo"}
            </h3>
            <div className="w-full flex justify-between flex-wrap">
              <article className="flex flex-col items-center">
                <label>Nombre</label>
                <input
                  className="bg-custon-black border rounded-md px-2 py-1"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </article>
              <article className="flex flex-col items-center">
                <label>Nacimiento</label>
                <input
                  type="date"
                  className="bg-custon-black border rounded-md px-2 py-1"
                  defaultValue={seleccionada ? seleccionada.birth : ""}
                  onChange={(e) => setNacimiento(e.target.value)}
                />
              </article>
              <article className="flex flex-col items-center">
                <label>Direccion</label>
                <input
                  className="bg-custon-black border rounded-md px-2 py-1"
                  defaultValue={seleccionada ? seleccionada.direction : ""}
                  onChange={(e) => setDireccion(e.target.value)}
                />
              </article>
              <article className="flex flex-col items-center">
                <label>Telefono</label>
                <input
                  className="bg-custon-black border rounded-md px-2 py-1"
                  defaultValue={seleccionada ? seleccionada.tel : ""}
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </article>
            </div>

            {/*  */}

            <div className="w-full flex justify-between flex-wrap">
              <article className="flex flex-col items-center">
                <label>Mail</label>
                <input
                  className="bg-custon-black border rounded-md px-2 py-1"
                  defaultValue={seleccionada ? seleccionada.mail : ""}
                  onChange={(e) => setMail(e.target.value)}
                />
              </article>
              <article className="flex flex-col items-center">
                <label>Rama</label>
                <select
                  className="bg-custon-black border"
                  defaultValue={seleccionada ? seleccionada.branch : ""}
                  onChange={(e) => setRama(e.target.value)}
                >
                  {ramas.map((rama) => (
                    <option key={rama.id}>{rama.nombre}</option>
                  ))}
                </select>
              </article>
              <article className="flex flex-col items-center">
                <label>Ficha personal</label>
                <input
                  type="checkbox"
                  className="w-6 h-6"
                  checked={personal === "Si"} // Establecer el estado inicial en función de personal
                  onChange={(e) => setPersonal(e.target.checked ? "Si" : "No")} // Actualizar el estado en el evento onChange
                />
              </article>
              <article className="flex flex-col items-center">
                <label>Ficha medica</label>
                <input
                  type="checkbox"
                  className="w-6 h-6"
                  checked={medical === "Si"} // Establecer el estado inicial en función de medical
                  onChange={(e) => setMedical(e.target.checked ? "Si" : "No")} // Actualizar el estado en el evento onChange
                />
              </article>
              <article className="flex flex-col items-center">
                <label>Cuota</label>
                <input
                  type="date"
                  className="bg-custon-black border"
                  defaultValue={seleccionada ? seleccionada.cuota : ""}
                  onChange={(e) => setCuota(e.target.value)}
                />
              </article>
              <article className="flex flex-col items-center">
                <label>Activo</label>
                <input
                  type="checkbox"
                  className="w-6 h-6"
                  checked={activo === "Si"} // Establecer el estado inicial en función de activo
                  onChange={(e) => setActivo(e.target.checked ? "Si" : "No")} // Actualizar el estado en el evento onChange
                />
              </article>
            </div>
            <div className="flex w-full justify-center">
              <button
                onClick={() => toClose(false)}
                className="w-1/5 h-10 dark:text-white mdn:w-2/5"
              >
                Cancelar
              </button>
              <button
                onClick={() => guardarCambios()}
                className="bg-custon-red w-1/5 h-10 rounded-xl font-semibold mdn:w-2/5"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}

export default ModalBeneficiarios;
