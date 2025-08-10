import React from 'react'
import { HiLocationMarker, HiCalendar } from 'react-icons/hi'
import { PiNotePencil } from "react-icons/pi";
import { Avatar } from '@/components/ui'


const SidebarContainer = () => {
  return (
    <div className="bg-white p-4  rounded-3xl shadow-md">

      <div className="flex justify-between items-center">
        <Avatar src="https://thispersondoesnotexist.com/" size={80}></Avatar>
        <button className="bg-gray-100 p-2 rounded-full">
          <PiNotePencil className="text-gray-600 size-5" />
        </button>
      </div>
      <div className="mt-4 ">
        <h2 className="text-xl font-bold">Antonio Ramirez</h2>
        <div className="flex space-x-4">
          <p className="text-gray-600">RH - O+</p>
          <p className="text-gray-600">35 años</p>
        </div>
      </div>
      <hr className="my-4 border-gray-300" />


      <div>
        <h3 className="text-lg font-bold">Info principal</h3>
        <div className="mt-4">
          <label className="text-gray-700">Profesión</label>
          <input
            type="text"
            value="Ing. Agrónomo"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            readOnly
          />
        </div>
        <div className="mt-4">
          <label className="text-gray-700">Grupo</label>
          <input
            type="text"
            value="Supervisar"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            readOnly
          />
        </div>
        <div className="mt-4">
          <label className="text-gray-700">Ubicación</label>
          <div className="relative">
            <input
              type="text"
              value="Pitalito, Huila"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              readOnly
            />
            <HiLocationMarker className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 text-xl" />
          </div>
        </div>
        <div className="mt-4">
          <label className="text-gray-700">Fecha de nacimiento</label>
          <div className="relative">
            <input
              type="text"
              value="Jun 12, 1988"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              readOnly
            />
            <HiCalendar className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 text-xl" />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-bold">Contacto</h3>
        <div className="mt-4">
          <label className="text-gray-700">Email</label>
          <input
            type="text"
            value="antonior@gmail.com"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            readOnly
          />
        </div>
        <div className="mt-4">
          <label className="text-gray-700">Número de telefóno</label>
          <input
            type="text"
            value="+57 314 346 23-10"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            readOnly
          />
        </div>
        <div className="mt-4">
          <label className="text-gray-700">Organización</label>
          <input
            type="text"
            value="Cafetales S.A.S"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            readOnly
          />
        </div>
      </div>
    </div>
  )
}

export default SidebarContainer