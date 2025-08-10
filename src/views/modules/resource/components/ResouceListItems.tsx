export type ResourceItem = {
    title: string;
    description: string;
    icon: string;
    count: number;
    color: string;
  };
  
  export const resources: ResourceItem[] = [
    {
      title: 'Cuestionarios',
      description: '5 Cuestionarios',
      icon: '📄',
      count: 5,
      color: 'text-lightgray bg-white',
    },
    {
      title: 'Proyectos',
      description: '8 Proyectos',
      icon: '📁',
      count: 8,
      color: 'text-lightgray bg-white',
    },
    {
      title: 'Libros',
      description: '30 Libros',
      icon: '📚',
      count: 30,
      color: 'text-lightgray bg-white',
    },
    {
      title: 'Galería',
      description: '5 galerías',
      icon: '🖼️',
      count: 5,
      color: 'text-lightgray bg-white',
    },
  ];
  