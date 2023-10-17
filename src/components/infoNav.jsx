import React from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ImHome } from "react-icons/im";

function InfoNav() {
  return (
    <nav className="w-full h-12 flex fixed justify-between px-10 items-center bg-red-600 text-white font-semibold smn:px-1">
      <div>
        <Link to={'/'}>
          <ImHome size={30} />
        </Link>
      </div>
      <div className="flex gap-11 smn:gap-3">
        <Link to={'/nosotros'}>
          <span>Nosotros</span>
        </Link>
        <Link to={'/scoutismo'}>
          <span>Scoutismo</span>
        </Link>
        <Link to={'/formulario'}>
          <span>Formulario</span>
        </Link>
      </div>
      <Link to={"/login"}>
        <FaUser size={30} />
      </Link>
    </nav>
  );
}

export default InfoNav;