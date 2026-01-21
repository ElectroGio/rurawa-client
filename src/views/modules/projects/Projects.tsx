import { Avatar, Button, Tabs, Tag } from '@/components/ui';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendar, FaChevronDown, FaPlus } from 'react-icons/fa';
import {
  MdAlignHorizontalCenter,
  MdAlignVerticalTop,
  MdMenu,
} from 'react-icons/md';
import ProjectsFilter from './components/ProjectsFilter';
import CreateProjectDialog from './components/CreateProjectDialog';
import { apiGetProjects } from '@/services/ProjectService';
import { useSessionUser } from '@/store/authStore';
import { getProjectAvatar } from '@/utils/projectAvatars';
import type { Project } from '@/@types/project';

const { TabNav, TabList, TabContent } = Tabs;

const activities = [
  'Registrar agricultores a la plataforma, de la asociación Agrocafé del municipio de...',
  'Verificar datos de los agricultores en la plataforma y generar permisos de uso.',
  'Aplicar cuestionario de censo rural de la vereda Alto Retiro del municipio de...',
];

const Projects = () => {
  const { user: currentUser } = useSessionUser();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<string>('list');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const response = await apiGetProjects(100, 1);
      setProjects(response.items || []);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const handleCreateSuccess = () => {
    loadProjects();
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/proyectos/${projectId}`);
  };

  return (
    <div className="">
      <nav className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Proyectos</h1>
        <Button
          variant="solid"
          className="flex items-center justify-center gap-2"
          onClick={() => setShowCreateDialog(true)}
        >
          <FaPlus /> Nuevo proyecto
        </Button>
      </nav>

      <CreateProjectDialog
        isOpen={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        onSuccess={handleCreateSuccess}
      />
      <div className="mt-6 flex gap-8">
        <aside className="max-w-64 rounded-3xl bg-white">
          <div className="flex items-center gap-6 px-6 py-4 font-bold">
            Todos los proyectos
            <FaChevronDown />
          </div>
          <div className="h-px w-full bg-gray-100" />
          {loading ? (
            <div className="p-4 text-center text-gray-500">Cargando...</div>
          ) : projects.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No hay proyectos</div>
          ) : (
            <ul>
              {projects.map((project) => (
                <li key={project.id} className="px-2 py-2">
                  <article 
                    className="cursor-pointer rounded-2xl px-3 py-3 hover:bg-[#F4F9FD]"
                    onClick={() => handleProjectClick(project.id)}
                  >
                    <span className="text-xs text-gray-400">{project.id.substring(0, 10)}</span>
                    <div className="mt-1 text-base font-semibold">
                      {project.name}
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-xs text-gray-400">
                      <FaCalendar /> {project.startDate ? new Date(project.startDate).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Sin fecha'}
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
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
                  <li key={project.id}>
                    <article 
                      className="flex rounded-3xl bg-white cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleProjectClick(project.id)}
                    >
                      <div className="flex flex-1 flex-col px-7 py-6">
                        <div className="flex gap-6">
                          <div className="size-12 rounded-lg overflow-hidden">
                            {(() => {
                              const avatar = getProjectAvatar(project.imageUrl)
                              return (
                                <div className={`w-full h-full ${avatar.color} flex items-center justify-center text-2xl`}>
                                  {avatar.emoji}
                                </div>
                              )
                            })()}
                          </div>
                          <div>
                            <span className="text-xs text-gray-400">
                              {project.id.substring(0, 10)}
                            </span>
                            <div className="mt-1 text-base font-semibold">
                              {project.name}
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-1 text-sm text-gray-400">
                            <FaCalendar /> {project.startDate ? new Date(project.startDate).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Sin fecha'}
                          </div>
                          <Tag className={`text-xs ${
                            project.state === 'Aprobado' ? 'bg-green-100 text-green-600' :
                            project.state === 'En progreso' ? 'bg-blue-100 text-blue-600' :
                            project.state === 'En revisión' ? 'bg-purple-100 text-purple-600' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {project.state}
                          </Tag>
                        </div>
                      </div>
                      <div className="h-auto w-px bg-gray-100" />
                      <div className="flex flex-1 flex-col px-7 py-6">
                        <div className="font-bold">Datos del proyecto</div>
                        <div className="mt-4 space-y-2">
                          <div>
                            <span className="text-sm text-gray-600">Ubicación: </span>
                            <span className="text-sm font-semibold">{project.location || 'No especificado'}</span>
                          </div>
                          <div>
                            <span className="text-sm text-gray-600">Descripción: </span>
                            <span className="text-sm">{project.description || 'Sin descripción'}</span>
                          </div>
                          <div className="flex gap-4 mt-3">
                            <div>
                              <div className="text-xs text-gray-500">Inicio</div>
                              <div className="text-sm font-semibold">{project.startDate ? new Date(project.startDate).toLocaleDateString('es-ES') : '-'}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500">Fin</div>
                              <div className="text-sm font-semibold">{project.endDate ? new Date(project.endDate).toLocaleDateString('es-ES') : '-'}</div>
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
                  key={project.id}
                  className="rounded-3xl bg-white px-5 py-5 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleProjectClick(project.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg overflow-hidden flex-shrink-0">
                      {(() => {
                        const avatar = getProjectAvatar(project.imageUrl)
                        return (
                          <div className={`w-full h-full ${avatar.color} flex items-center justify-center text-xl`}>
                            {avatar.emoji}
                          </div>
                        )
                      })()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs text-gray-400 block truncate">
                        {project.id.substring(0, 10)}
                      </span>
                      <div className="text-base font-semibold truncate">
                        {project.name}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-xs text-gray-400">
                    <FaCalendar /> {project.startDate ? new Date(project.startDate).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Sin fecha'}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <Tag className={`text-xs ${
                      project.state === 'Aprobado' ? 'bg-green-100 text-green-600' :
                      project.state === 'En progreso' ? 'bg-blue-100 text-blue-600' :
                      project.state === 'En revisión' ? 'bg-purple-100 text-purple-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {project.state}
                    </Tag>
                    <span className="text-xs text-gray-500">{project.location}</span>
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
