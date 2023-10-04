import React from "react";
import { ramas } from "../services/ramas";
import { useState } from "react";
import { useEffect } from "react";

function Tabla({ beneficiarios, setModalOpen, setSeleccionada }) {
  const [beneficiariosCopia, setBeneficiariosCopia] = useState([]);


  // Funcion para filtrar por rama 
  const filtradoPorRama = (rama) => {
    if (rama === "Todos") {
      return setBeneficiariosCopia(beneficiarios);
    }
    const beneficiariosFiltrados = beneficiarios.filter(
      (beneficiario) => beneficiario.branch === rama
    );
    setBeneficiariosCopia(beneficiariosFiltrados);
  };


  // Funcion para filtrar por campo de input
  const filtradoPorNombre = (nombre) => {
    const beneficiariosFiltrados = beneficiarios.filter((beneficiario) =>
      beneficiario.name.toLowerCase().includes(nombre.toLowerCase())
    );
    setBeneficiariosCopia(beneficiariosFiltrados);
  };


  // Funcion para seleccionar beneficiario y editarlo
  // Desde aca se puede abrir el modal
  const seleccionarBeneficiario = (beneficiario) => {
    setSeleccionada(beneficiario);
    setModalOpen(true);
  };

  // Funcion para agregar un beneficiario nuevo
  const agregarBeneficiario = () => {
    setSeleccionada(null);
    setModalOpen(true);
  }

  // Funcion para cambiar los valores de 0 y 1 por Si y No
  useEffect(() => {
    beneficiarios.forEach((x) => {
      x.active = x.active === "1" ? "Si" : "No";
      x.medical_file = x.medical_file === "1" ? "Si" : "No";
      x.personal_file = x.personal_file === "1" ? "Si" : "No";
    });
    setBeneficiariosCopia(beneficiarios);
  }, [beneficiarios]);

  return (
    <section className="w-full h-full dark:text-white flex flex-col gap-4 overflow-x-auto">
      <div className="w-full flex justify-between">
        {ramas.map((rama) => (
          <span
            className="bg-custon-red w-24 h-9 flex items-center justify-center rounded-lg cursor-pointer"
            key={rama.id}
            onClick={() => filtradoPorRama(rama.nombre)}
          >
            {rama.nombre}
          </span>
        ))}
      </div>
      <input
        className="bg-custon-black border px-4 py-2 rounded-xl"
        onChange={(e) => filtradoPorNombre(e.target.value)}
      />
      <table className="w-full h-full">
        <thead className="w-full h-full">
          <tr className="w-full h-full text-custon-red font-semibold">
            <th className="w-1/12 h-full">Nombre</th>
            <th className="w-1/12 h-full">nacimiento</th>
            <th className="w-1/12 h-full">Direccion</th>
            <th className="w-1/12 h-full">Telefono</th>
            <th className="w-1/12 h-full">Correo</th>
            <th className="w-1/12 h-full">Rama</th>
            <th className="w-1/12 h-full">Ficha personal</th>
            <th className="w-1/12 h-full">Ficha Medica</th>
            <th className="w-1/12 h-full">Cuota</th>
            <th className="w-1/12 h-full">Activo</th>
            <th className="w-1/12 h-full"></th>
          </tr>
        </thead>
        <tbody className="w-full h-full">
          {beneficiariosCopia.map((beneficiario) => (
            <tr className="w-full h-full text-center" key={beneficiario.id}>
              <td className="w-1/12 h-full">{beneficiario.name}</td>
              <td className="w-1/12 h-full">{beneficiario.birth}</td>
              <td className="w-1/12 h-full">{beneficiario.direction}</td>
              <td className="w-1/12 h-full">{beneficiario.tel}</td>
              <td className="w-1/12 h-full">{beneficiario.mail}</td>
              <td className="w-1/12 h-full">{beneficiario.branch}</td>
              <td className="w-1/12 h-full">{beneficiario.personal_file}</td>
              <td className="w-1/12 h-full">{beneficiario.medical_file}</td>
              <td className="w-1/12 h-full">{beneficiario.cuota}</td>
              <td className="w-1/12 h-full">{beneficiario.active}</td>
              <td onClick={() => seleccionarBeneficiario(beneficiario)}>
                Editar
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="bg-custon-red w-1/6 h-10 rounded-xl m-auto" onClick={()=>agregarBeneficiario()}>
        Agregar nuevo
      </button>
    </section>
  );
}

export default Tabla;
