import { Avatar, Button, Tabs, Tag } from '@/components/ui';
import { useState } from 'react';
import { FaCalendar, FaChevronDown, FaPlus } from 'react-icons/fa';
import {
  MdAlignHorizontalCenter,
  MdAlignVerticalTop,
  MdMenu,
} from 'react-icons/md';
import ProjectsFilter from './components/ProjectsFilter';
import { projects } from './mock';

const { TabNav, TabList, TabContent } = Tabs;

const activities = [
  'Registrar agricultores a la plataforma, de la asociación Agrocafé del municipio de...',
  'Verificar datos de los agricultores en la plataforma y generar permisos de uso.',
  'Aplicar cuestionario de censo rural de la vereda Alto Retiro del municipio de...',
];

const Projects = () => {
  const [selectedTab, setSelectedTab] = useState<string>('list');

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div className="">
      <nav className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Proyectos</h1>
        <Button
          variant="solid"
          className="flex items-center justify-center gap-2"
        >
          <FaPlus /> Nuevo proyecto
        </Button>
      </nav>
      <div className="mt-6 flex gap-8">
        <aside className="max-w-64 rounded-3xl bg-white">
          <div className="flex items-center gap-6 px-6 py-4 font-bold">
            Todos los proyectos
            <FaChevronDown />
          </div>
          <div className="h-px w-full bg-gray-100" />
          <ul>
            {projects.map((project) => (
              <li className="px-2 py-2">
                <article
                  key={project.code}
                  className="cursor-pointer rounded-2xl px-3 py-3 hover:bg-[#F4F9FD]"
                >
                  <span className="text-xs text-gray-400">{project.code}</span>
                  <div className="mt-1 text-base font-semibold">
                    {project.name}
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-xs text-gray-400">
                    <FaCalendar /> {project.createdAt}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </aside>
        <div className="grow space-y-5">
          <div className="relative flex items-center justify-center gap-4">
            <Button
              onClick={() => handleTabChange('list')}
              className="border-0 p-3"
            >
              <MdMenu size={24} />
            </Button>
            <Button
              onClick={() => handleTabChange('grid')}
              className="border-0 p-3"
            >
              <MdAlignVerticalTop size={24} />
            </Button>
            <Button
              onClick={() => handleTabChange('calendar')}
              className="border-0 p-3"
            >
              <MdAlignHorizontalCenter size={24} />
            </Button>
            <div className="absolute right-0">
              <ProjectsFilter />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="min-w-36 rounded-3xl border-4 border-white bg-[#F4F9FD] py-3 text-center font-bold">
              Sin iniciar
            </div>
            <div className="min-w-36 rounded-3xl border-4 border-white bg-[#F4F9FD] py-3 text-center font-bold">
              En progreso
            </div>
            <div className="min-w-36 rounded-3xl border-4 border-white bg-[#F4F9FD] py-3 text-center font-bold">
              En revisión
            </div>
            <div className="min-w-36 rounded-3xl border-4 border-white bg-[#F4F9FD] py-3 text-center font-bold">
              Aprobados
            </div>
          </div>
          <div className="rounded-xl bg-[#E6EDF5] py-2 text-center font-bold">
            Proyectos actuales
          </div>
          {selectedTab === 'list' && (
            <div>
              <ul className="flex flex-col gap-4">
                {projects.map((project) => (
                  <li key={project.code}>
                    <article className="flex rounded-3xl bg-white">
                      <div className="flex flex-1 flex-col px-7 py-6">
                        <div className="flex gap-6">
                          <div className="size-12 bg-purple-600" />
                          <div>
                            <span className="text-xs text-gray-400">
                              {project.code}
                            </span>
                            <div className="mt-1 text-base font-semibold">
                              {project.name}
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-1 text-sm text-gray-400">
                            <FaCalendar /> {project.createdAt}
                          </div>
                          <Tag className="bg-[#F9E6FC] text-xs text-[#C419E6]">
                            En revisión
                          </Tag>
                        </div>
                      </div>
                      <div className="h-auto w-px bg-gray-100" />
                      <div className="flex flex-1 flex-col px-7 py-6">
                        <div className="font-bold">Datos del proyecto</div>
                        <div className="mt-4 flex gap-9">
                          <div>
                            <div className="">Asignadas</div>
                            <div className="mt-1 font-bold leading-6">100</div>
                          </div>
                          <div>
                            <div>Cumplidas</div>
                            <div className="mt-1 font-bold leading-6">96</div>
                          </div>
                          <div>
                            <div>Encargados</div>
                            <div className="mt-1">
                              <Avatar.Group
                                chained
                                maxCount={3}
                                omittedAvatarProps={{
                                  shape: 'circle',
                                  size: 24,
                                }}
                              >
                                <Avatar
                                  src="https://thispersondoesnotexist.com/"
                                  size={24}
                                >
                                  NL
                                </Avatar>
                                <Avatar
                                  src="https://thispersondoesnotexist.com/"
                                  size={24}
                                >
                                  AS
                                </Avatar>
                                <Avatar
                                  src="https://thispersondoesnotexist.com/"
                                  size={24}
                                >
                                  WD
                                </Avatar>
                                <Avatar
                                  src="https://thispersondoesnotexist.com/"
                                  size={24}
                                >
                                  WD
                                </Avatar>
                              </Avatar.Group>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {selectedTab === 'grid' && (
            <div className="grid grid-cols-3 gap-x-9 gap-y-4">
              {projects.map((project) => (
                <article
                  key={project.code}
                  className="rounded-3xl bg-white px-5 py-5"
                >
                  <div>
                    <span className="text-xs text-gray-400">
                      {project.code}
                    </span>
                    <div className="mt-1 text-base font-semibold">
                      {project.name}
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-xs text-gray-400">
                    <FaCalendar /> {project.createdAt}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <Tag className="bg-[#F9E6FC] text-xs text-[#C419E6]">
                      En revisión
                    </Tag>
                    <Avatar.Group
                      chained
                      maxCount={3}
                      omittedAvatarProps={{ shape: 'circle', size: 24 }}
                    >
                      <Avatar
                        src="https://thispersondoesnotexist.com/"
                        size={24}
                      >
                        NL
                      </Avatar>
                      <Avatar
                        src="https://thispersondoesnotexist.com/"
                        size={24}
                      >
                        AS
                      </Avatar>
                      <Avatar
                        src="https://thispersondoesnotexist.com/"
                        size={24}
                      >
                        WD
                      </Avatar>
                      <Avatar
                        src="https://thispersondoesnotexist.com/"
                        size={24}
                      >
                        WD
                      </Avatar>
                    </Avatar.Group>
                  </div>
                </article>
              ))}
            </div>
          )}
          {selectedTab === 'calendar' && (
            <div className="flex rounded-3xl bg-white">
              <div className="w-1/3 border-r">
                <div className="border-b px-6 py-4">
                  <div className="flex items-center gap-6 font-bold">
                    Todas las actividades
                    <FaChevronDown />
                  </div>
                  <span className="text-xs">3 actividades encontradas</span>
                </div>
                <ul>
                  {activities.map((activity, index) => (
                    <li
                      key={index}
                      className="border-t px-6 py-3 first:border-0"
                    >
                      <span className="line-clamp-2 text-sm">{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
