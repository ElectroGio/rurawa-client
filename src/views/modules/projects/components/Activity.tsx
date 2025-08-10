import { Avatar, Button, Progress } from '@/components/ui';
import { FaMap, FaPaperclip, FaUpload } from 'react-icons/fa';

interface ActivityProps {
  code: string;
  name: string;
  description: string;
  supervisor: any;
  asignees: any[];
  status: string;
  route: string;
  files: any[];
  recentActivity: any[];
  createdAt: string;
  deadline: string;
}

const Activity = (props: ActivityProps) => {
  const {
    code,
    name,
    description,
    supervisor,
    status,
    route,
    files,
    recentActivity,
    createdAt,
    deadline,
  } = props;

  const RecentActivityItem = ({ activity }: { activity: any }) => {
    switch (activity.type) {
      case 'update':
        return (
          <div className="flex gap-4 rounded-xl bg-[#F4F9FD] px-6 py-4">
            <FaUpload size={24} className="text-[#008B00]" />
            <div>
              Se actualizó el {activity.field} de la actividad{' '}
              <span className="font-bold text-[#3F8CFF]">{activity.value}</span>
            </div>
          </div>
        );
      case 'upload':
        return (
          <div className="flex gap-4 rounded-xl bg-[#F4F9FD] px-6 py-4">
            <FaPaperclip size={24} className="text-[#6D5DD3]" />
            <div>Archivos adjuntos a la actividad</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="grow space-y-5">
        <div className="rounded-3xl bg-white">
          <div className="px-6 py-6">
            <div>
              <div className="text-sm">{code}</div>
              <div className="mt-2">{name}</div>
              <p className="mt-4">{description}</p>
            </div>
            <div className="mt-9">
              <div>Adjunto de actividades</div>
              <div className="mt-2 flex">
                <div className="max-w-40 overflow-hidden rounded-xl border border-gray-200 bg-white">
                  <div className="relative">
                    <img
                      src="https://via.placeholder.com/200"
                      alt=""
                      className="h-40 w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-blue-500 bg-opacity-10"></div>
                  </div>
                  <div className="rounded-xl p-2">
                    <p className="text-sm font-medium text-gray-700">
                      Agricultor: Antonio R.
                    </p>
                    <p className="text-xs text-gray-500">
                      Oct 14, 2023 | 3:52 AM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-px w-full bg-gray-300" />
          <div className="px-6 py-6">
            <div>Actividad reciente</div>
            <div className="mt-6 flex gap-4">
              <Avatar
                src="https://thispersondoesnotexist.com/"
                size="lg"
              ></Avatar>
              <div>
                <div>William Silva</div>
                <div>Técnico</div>
              </div>
            </div>
            <ul className="mt-6 flex flex-col gap-6">
              {recentActivity.map((activity, index) => (
                <li key={index}>
                  <RecentActivityItem activity={activity} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-64 space-y-8">
        <div className="flex flex-col gap-6 rounded-3xl bg-white px-6 py-6">
          <div>Información de la actividad</div>
          <div>
            <div className="text-sm">Responsable</div>
            <div className="mt-2 flex gap-3">
              <Avatar
                src="https://thispersondoesnotexist.com/"
                size={24}
              ></Avatar>
              <div>{supervisor.name}</div>
            </div>
          </div>
          {/* <div>
            <div className="text-sm">Encargados</div>
            <div className="mt-2">
              <Avatar.Group
                chained
                maxCount={3}
                omittedAvatarProps={{ shape: 'circle', size: 24 }}
              >
                <Avatar
                  src="https://thispersondoesnotexist.com/"
                  size={24}
                ></Avatar>
                <Avatar
                  src="https://thispersondoesnotexist.com/"
                  size={24}
                ></Avatar>
                <Avatar
                  src="https://thispersondoesnotexist.com/"
                  size={24}
                ></Avatar>
                <Avatar
                  src="https://thispersondoesnotexist.com/"
                  size={24}
                ></Avatar>
              </Avatar.Group>
            </div>
          </div> */}
          <div>
            <div className="text-sm">Estado</div>
            <div className="mt-2">{status}</div>
          </div>
          <div className="space-y-2 rounded-2xl bg-[#F4F9FD] px-5 py-5">
            <div className="text-sm">Ruta</div>
            <div className="flex items-center gap-4">
              <div>
                <Progress
                  variant="circle"
                  showInfo={false}
                  width={32}
                  percent={80}
                />
              </div>
              <div>{route}</div>
            </div>
            <Button
              variant="solid"
              className="flex items-center justify-center gap-2"
            >
              <FaMap /> Ver ruta
            </Button>
          </div>
          <div>
            <div className="text-sm">Fecha de creación</div>
            <div className="mt-2">{createdAt}</div>
          </div>
          <div>
            <div className="text-sm">Fecha limite</div>
            <div className="mt-2">{deadline}</div>
          </div>
        </div>
        <div className="flex flex-col gap-6 rounded-3xl bg-white px-6 py-6">
          <div>Datos de la actividad</div>
          <div className="flex items-center gap-4">
            <div>
              <Progress
                variant="circle"
                showInfo={false}
                width={32}
                percent={80}
              />
            </div>
            <div>
              <div>100</div>
              <div>Asignadas</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <Progress
                variant="circle"
                showInfo={false}
                width={32}
                percent={80}
              />
            </div>
            <div>
              <div>13</div>
              <div>Pendientes</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <Progress
                variant="circle"
                showInfo={false}
                width={32}
                percent={80}
              />
            </div>
            <div>
              <div>87</div>
              <div>Cumplidas</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Activity;
