import React from 'react'

const statsData = [
  {
    value: '12%',
    title: 'Cobertura',
    subtitle: 'Cobertura de Fincas Monitoreadas',
    color: 'blue'
  },
  {
    value: '6',
    title: 'Participación',
    subtitle: 'Asistencia a Espacios de Desarrollo',
    color: 'red'
  },
  {
    value: '42',
    title: 'Actividades',
    subtitle: 'Desempeño de Tareas asignadas',
    color: 'purple'
  },
  {
    value: '12%',
    title: 'BPA',
    subtitle: 'Tasa de cumplimiento de BPA',
    color: 'blue'
  },
  {
    value: '6',
    title: 'Productividad',
    subtitle: 'Rendimiento de las fincas',
    color: 'red'
  },
  {
    value: '42',
    title: 'Eficiencia',
    subtitle: 'Tiempo promedio de ejecución',
    color: 'purple'
  }
]

const getColorClasses = (color: string) => {
  switch (color) {
    case 'blue':
      return {
        border: 'border-blue-400',
        text: 'text-blue-400'
      }
    case 'red':
      return {
        border: 'border-red-400',
        text: 'text-red-400'
      }
    case 'purple':
      return {
        border: 'border-purple-400',
        text: 'text-purple-400'
      }
    default:
      return {
        border: 'border-gray-400',
        text: 'text-gray-400'
      }
  }
}

const StatCard = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {statsData.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl p-4">
          <div className="flex items-start">
            <button 
              disabled 
              className={`size-16 rounded-full border-2 flex items-center justify-center ${getColorClasses(stat.color).border}`}
            >
              <div className={`font-bold text-lg ${getColorClasses(stat.color).text}`}>
                {stat.value}
              </div>
            </button>
          </div>
          <div className="mt-3">
            <div className="text-sm font-semibold text-black">{stat.title}</div>
            <div className="text-xs text-gray-500 mt-1">{stat.subtitle}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatCard