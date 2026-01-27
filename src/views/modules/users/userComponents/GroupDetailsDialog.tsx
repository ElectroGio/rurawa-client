import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { apiGetGroupById } from '../../../../services/GroupService';
import { Group, GroupUser } from '../../../../@types/group';
import UserAvatar from '../../../../components/custom/UserAvatar/UserAvatar';
import Button from '@/components/ui/Button';

interface GroupDetailsDialogProps {
  groupId: string;
  onClose: () => void;
  onEdit?: (groupId: string) => void;
}

export default function GroupDetailsDialog({
  groupId,
  onClose,
  onEdit
}: GroupDetailsDialogProps) {
  const [group, setGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadGroup();
  }, [groupId]);

  const loadGroup = async () => {
    try {
      setLoading(true);
      setError(null);
      const groupData = await apiGetGroupById(groupId);
      setGroup(groupData);
    } catch (err: any) {
      setError(err.message || 'Error al cargar el grupo');
      console.error('Error loading group:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-lg p-8 w-full max-w-2xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando grupo...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-lg p-8 w-full max-w-2xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-red-600">Error</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <IoClose size={24} />
            </button>
          </div>
          <p className="text-gray-700">{error}</p>
          <div className="mt-6 flex justify-end">
            <Button onClick={onClose}>
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!group) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">{group.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          {group.description && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                Descripción
              </h3>
              <p className="text-gray-700">{group.description}</p>
            </div>
          )}

          {/* Users List */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
              Miembros del grupo ({group.users?.length || 0})
            </h3>
            
            {group.users && group.users.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {group.users.map((user: GroupUser) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <UserAvatar
                      firstName={user.firstName}
                      lastName={user.lastName}
                      email={user.email}
                      profileImage={user.profileImage}
                      size={48}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No hay miembros en este grupo</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
          {onEdit && (
            <Button
              onClick={() => onEdit(groupId)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Editar grupo
            </Button>
          )}
          <Button onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
}
