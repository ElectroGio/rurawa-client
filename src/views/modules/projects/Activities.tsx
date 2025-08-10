import { Avatar, Button, Progress } from '@/components/ui';
import { FaMap, FaPaperclip, FaPlus, FaUpload } from 'react-icons/fa';
import { activities, projects } from './mock';
import Activity from './components/Activity';
import ProjectOverview from './components/ProjectOverview';

interface ActivitiesProps {}

const Activities = () => {
  return (
    <div className="">
      <nav className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Proyectos</h1>
        <Button
          variant="solid"
          className="flex items-center justify-center gap-2"
        >
          <FaPlus /> Nueva actividad
        </Button>
      </nav>
      <div className="mt-6 flex gap-8">
        <ProjectOverview {...projects.at(0)!} />
        {/* <div className="grow space-y-5">
          <div className="rounded-xl bg-[#E6EDF5] py-2 text-center font-bold">
            Actividades actuales
          </div>
          <div>
            <ul className="flex flex-col gap-4">
              {activities.map((activity, index) => (
                <li key={index}>
                  <article className="grid grid-cols-12 items-center gap-4 rounded-3xl bg-white px-8 py-6">
                    <div className="col-span-3">
                      <div>Actividad</div>
                      <div className="line-clamp-1">{activity.description}</div>
                    </div>
                    <div>
                      <div>Fincas</div>
                      <div>{activity.farms}</div>
                    </div>
                    <div className="col-span-3">
                      <div>Ruta</div>
                      <div className="line-clamp-1">{activity.route}</div>
                    </div>
                    <div className="col-span-2">
                      <div>Encargado</div>
                      <div>
                        <Avatar src={activity.responsible.picture} size={24}>
                          {activity.responsible.name}
                        </Avatar>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <Tag className="bg-[#F9E6FC] text-xs text-[#C419E6]">
                        {activity.status}
                      </Tag>
                    </div>
                    <Progress
                      variant="circle"
                      showInfo={false}
                      width={24}
                      percent={activity.progress}
                    />
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div> */}
        <Activity {...activities.at(0)!} />
      </div>
    </div>
  );
};

export default Activities;
