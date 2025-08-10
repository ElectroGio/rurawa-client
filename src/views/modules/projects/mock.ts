export const projects = [
  {
    code: 'PN0001245',
    name: 'Renovación de café',
    description:
      'Registro y control de renovación de café, de fincas asociadas a la organización Agrocafé S.A.S.',
    status: 'Aprobado',
    zone: 'La Plata, Huila',
    owner: {
      name: 'Evan Yepes',
      picture: 'https://thispersondoesnotexist.com/',
    },
    teamMembers: [
      {
        name: 'Willian Silva',
        picture: 'https://thispersondoesnotexist.com/',
      },
    ],
    activities: 3,
    farms: 100,
    createdAt: 'Sep 12, 2023',
    deadline: 'Oct 1, 2023',
  },
  {
    code: 'PN0001221',
    name: 'Verificar y registrar usuarios.',
    description: '',
    status: 'En revisión',
    zone: 'La Plata, Huila',
    owner: {
      name: 'Evan Yepes',
      picture: 'https://thispersondoesnotexist.com/',
    },
    teamMembers: [
      {
        name: 'Willian Silva',
        picture: 'https://thispersondoesnotexist.com/',
      },
    ],
    activities: 3,
    farms: 100,
    createdAt: 'Sep 10, 2023',
    deadline: 'Oct 1, 2023',
  },
  {
    code: 'PN0001290',
    name: 'Aplicación de encuesta.',
    description: '',
    status: 'En progreso',
    zone: 'La Plata, Huila',
    owner: {
      name: 'Evan Yepes',
      picture: 'https://thispersondoesnotexist.com/',
    },
    teamMembers: [
      {
        name: 'Willian Silva',
        picture: 'https://thispersondoesnotexist.com/',
      },
    ],
    activities: 3,
    farms: 100,
    createdAt: 'Sep 2, 2023',
    deadline: 'Oct 1, 2023',
  },
];

export const activities = [
  {
    code: 'PN0001290',
    name: 'Registrar agricultores',
    description:
      'Verificar datos de los agricultores registrados en la plataforma. Al finalizar cada uno de los registros adjunte el link del usuario registrado a la fuente de la actividad.',
    farms: 100,
    route: 'Vereda Segovianas',
    supervisor: {
      name: 'Evan Yepes',
      picture: 'https://thispersondoesnotexist.com/',
    },
    asignees: [
      {
        name: 'Willian Silva',
        picture: 'https://thispersondoesnotexist.com/',
      },
    ],
    status: 'Aprobado',
    progress: 100,
    files: [],
    recentActivity: [
      {
        type: 'update',
        field: 'estado',
        value: 'En progreso',
      },
      { type: 'upload' },
    ],
    createdAt: 'Sep 28, 2023',
    deadline: 'Oct 15, 2023',
  },
  {
    code: 'PN0001290',
    name: 'Verificar datos de los agricultores',
    description: '',
    farms: 100,
    route: 'Vereda Segovianas',
    supervisor: {
      name: 'Evan Yepes',
      picture: 'https://thispersondoesnotexist.com/',
    },
    asignees: [
      {
        name: 'Willian Silva',
        picture: 'https://thispersondoesnotexist.com/',
      },
    ],
    status: 'En revisión',
    progress: 90,
    files: [],
    recentActivity: [],
    createdAt: 'Sep 28, 2023',
    deadline: 'Oct 15, 2023',
  },
  {
    code: 'PN0001290',
    name: 'Aplicar cuestionario de censo rural',
    description: '',
    farms: 50,
    route: 'Vereda Segovianas',
    supervisor: {
      name: 'Evan Yepes',
      picture: 'https://thispersondoesnotexist.com/',
    },
    asignees: [
      {
        name: 'Willian Silva',
        picture: 'https://thispersondoesnotexist.com/',
      },
    ],
    status: 'En progreso',
    progress: 60,
    files: [],
    recentActivity: [],
    createdAt: 'Sep 28, 2023',
    deadline: 'Oct 15, 2023',
  },
];
