import { Avatar, Button, Checkbox, DatePicker, Drawer, Input, Select, Tag } from "@/components/ui"
import {  useState } from "react"
import { FaFilter, FaTimesCircle } from "react-icons/fa"
import { MdSearch } from "react-icons/md";

const users = ['Silvia Castillo', 'Ronald Pérez', 'Gabriela Ortiz', 'Oscar Ramírez'];

const ProjectsFilter = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openDrawer = () => {
    setIsOpen(true)
  }

  const onDrawerClose = () => {
    setIsOpen(false)
  }

  const filter = () => {
    onDrawerClose();
  }

  const Footer = (
    <div className="flex w-full items-center justify-between">
        <div>
          10 coincidencias
        </div>
        <Button size="sm" variant="solid" onClick={filter}>
          Guardar filtros
        </Button>
    </div>
  )

  return (
    <>
      <Button className="border-0 p-3" onClick={() => openDrawer()}>
        <FaFilter size={24} />
      </Button>
      <Drawer
        title="Filtrar"
        isOpen={isOpen}
        onClose={onDrawerClose}
        onRequestClose={onDrawerClose}
        showBackdrop={false}
        bodyClass="px-0 py-0"
        footerClass="border-0"
        footer={Footer}
      >
        <div className="flex flex-col px-8 py-5">
          <span className="text-sm font-bold">Periodo</span>
          <div className="mt-4">
            <DatePicker placeholder="Seleccionar periodo" />
          </div>
        </div>
        <div className="flex flex-col px-8 py-5 border-t border-gray-300">
          <span className="text-sm font-bold">Actividades según grupo</span>
          <div className="flex flex-col mt-4 gap-4">
            <Checkbox value="tecnicos">Técnicos</Checkbox>
            <Checkbox value="analistas">Analistas</Checkbox>
            <Checkbox value="supervisores">Supervisores</Checkbox>
            <Checkbox value="coordinadores">Coodinadores</Checkbox>
            <Checkbox value="directores">Directores</Checkbox>
          </div>
        </div>
        <div className="flex flex-col px-8 py-5 border-t border-gray-300">
          <span className="text-sm font-bold">Responsables</span>
          <div className="flex flex-col mt-4 gap-4">
            <Checkbox value="william">Willian Silva</Checkbox>
            <Checkbox value="leonardo">Leonardo Rodriquez</Checkbox>
            <Checkbox value="michael">Michael Gúzman</Checkbox>
          </div>
        </div>
        <div className="flex flex-col px-8 py-5 border-t border-gray-300">
          <span className="text-sm font-bold">Encargados</span>
          <div className="mt-4">
            <Input placeholder="Buscar" prefix={<MdSearch size={24} />} />
          </div>
          <div className="flex gap-3 flex-wrap mt-6">
            {users.map( (name, index) => 
              <div key={index} className="flex bg-[#F4F9FD] rounded-full items-center gap-2">
                <Avatar src="https://thispersondoesnotexist.com/" size={24} className="m-0.5 border-2 border-white box-content">
                </Avatar>
                <div className="text-sm">
                  {name}
                </div>
                <button className="mr-3">
                  <FaTimesCircle size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col px-8 py-5 border-t border-gray-300">
          <span className="text-sm font-bold">Estado</span>
          <div className="mt-4">
            <Select placeholder="Seleccione el estado" options={[]} />
          </div>
        </div>
        <div className="flex flex-col px-8 py-5 border-t border-gray-300">
          <span className="text-sm font-bold">Prioridad</span>
          <div className="mt-4">
            <Select placeholder="Seleccione la prioridad" options={[]} />
          </div>
        </div>
      </Drawer>
    </>
  )
}

export default ProjectsFilter;
