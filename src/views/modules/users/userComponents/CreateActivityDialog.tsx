import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { IoClose } from 'react-icons/io5';
import { apiCreateActivity } from '@/services/ActivityService';
import { apiGetProjects } from '@/services/ProjectService';
import { Project } from '@/@types/project';
import { Button } from '@/components/ui/button';

interface CreateActivityDialogProps {
  onClose: () => void;
  onSuccess?: () => void;
}

interface ActivityFormData {
  name: string;
  description: string;
  type: string;
  startDate: string;
  endDate: string;
  projectId: string;
}

export default function CreateActivityDialog({
  onClose,
  onSuccess
}: CreateActivityDialogProps) {
  const [loading, setLoading] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty }
  } = useForm<ActivityFormData>();

  const startDate = watch('startDate');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoadingProjects(true);
      const response = await apiGetProjects();
      setProjects(response.items || []);
    } catch (err: any) {
      setError('Error al cargar proyectos');
      console.error('Error loading projects:', err);
    } finally {
      setLoadingProjects(false);
    }
  };

  const onSubmit = async (data: ActivityFormData) => {
    try {
      setLoading(true);
      setError(null);

      await apiCreateActivity({
        name: data.name,
        description: data.description,
        type: data.type,
        startDate: data.startDate,
        endDate: data.endDate,
        projectId: data.projectId
      });

      if (onSuccess) {
        await onSuccess();
      }

      alert('Actividad creada exitosamente');
      onClose();
    } catch (err: any) {
      setError(err.message || 'Error al crear la actividad');
      console.error('Error creating activity:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Nueva Actividad</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de la actividad <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('name', {
                required: 'El nombre es requerido',
                minLength: {
                  value: 3,
                  message: 'El nombre debe tener al menos 3 caracteres'
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ej: Capacitación de seguridad"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Type Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo <span className="text-red-500">*</span>
            </label>
            <select
              {...register('type', { required: 'El tipo es requerido' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Seleccionar tipo</option>
              <option value="Training">Capacitación</option>
              <option value="Survey">Encuesta</option>
            </select>
            {errors.type && (
              <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
            )}
          </div>

          {/* Project Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Proyecto <span className="text-red-500">*</span>
            </label>
            {loadingProjects ? (
              <p className="text-sm text-gray-500">Cargando proyectos...</p>
            ) : projects.length === 0 ? (
              <p className="text-sm text-red-600">No hay proyectos disponibles</p>
            ) : (
              <select
                {...register('projectId', { required: 'El proyecto es requerido' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Seleccionar proyecto</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            )}
            {errors.projectId && (
              <p className="mt-1 text-sm text-red-600">{errors.projectId.message}</p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('description', { required: 'La descripción es requerida' })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Describe los objetivos y detalles de la actividad..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          {/* Date Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha inicio <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                {...register('startDate', {
                  required: 'La fecha de inicio es requerida'
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.startDate && (
                <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha fin <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                {...register('endDate', {
                  required: 'La fecha de fin es requerida',
                  validate: (value) =>
                    !startDate || value >= startDate || 'La fecha de fin debe ser posterior a la fecha de inicio'
                })}
                min={startDate}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.endDate && (
                <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!isDirty || loading || loadingProjects || projects.length === 0}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {loading ? 'Creando...' : 'Crear actividad'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
