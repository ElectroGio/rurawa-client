import { Avatar } from '@/components/ui';

interface ProjectOverviewProps {
  code: string;
  description: string;
  status: string;
  zone: string;
  owner: any;
  teamMembers: any[];
  activities: number;
  farms: number;
  createdAt: string;
  deadline: string;
}

const ProjectOverview = (props: ProjectOverviewProps) => {
  const {
    code,
    description,
    status,
    zone,
    owner,
    teamMembers,
    activities,
    farms,
    createdAt,
    deadline,
  } = props;

  return (
    <aside className="max-w-64 rounded-3xl bg-white">
      <div className="flex flex-col gap-6 px-6 py-6">
        <div>
          <div className="text-sm">Proyecto</div>
          <div className="mt-2">{code}</div>
        </div>
        <div>
          <div className="text-sm">Descripción</div>
          <div className="mt-2">{description}</div>
        </div>
        <div>
          <div className="text-sm">Estado</div>
          <div className="mt-2">{status}</div>
        </div>
        <div>
          <div className="text-sm">Zona</div>
          <div className="mt-2">{zone}</div>
        </div>
        <div>
          <div className="text-sm">Responsable</div>
          <div className="mt-2 flex gap-3">
            <Avatar src={owner.picture} size={24}></Avatar>
            <div>{owner.name}</div>
          </div>
        </div>
        <div>
          <div className="text-sm">Encargados</div>
          <div className="mt-2">
            <Avatar.Group
              chained
              maxCount={3}
              omittedAvatarProps={{ shape: 'circle', size: 24 }}
            >
              {teamMembers.map((member, index) => (
                <Avatar key={index} src={member.picture} size={24}>
                  {member.name}
                </Avatar>
              ))}
            </Avatar.Group>
          </div>
        </div>
        <div>
          <div className="text-sm">Actividades</div>
          <div className="mt-2">{activities}</div>
        </div>
        <div>
          <div className="text-sm">Fincas</div>
          <div className="mt-2">{farms}</div>
        </div>
        <div>
          <div className="text-sm">Fecha de creación</div>
          <div className="mt-2">{createdAt}</div>
        </div>
        <div>
          <div className="text-sm">Fecha limite de entrega</div>
          <div className="mt-2">{deadline}</div>
        </div>
        <div className="flex gap-4"></div>
      </div>
    </aside>
  );
};

export default ProjectOverview;
