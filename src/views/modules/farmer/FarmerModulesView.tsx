import TabSwitcher from "@/components/custom/TabSwitcher/TabSwitcher";
import GroupList from "@/components/template/HorizontalUserCard/HorizontalGroupList";
import UserCard from "./farmerComponents/HorizontalFarmerCard";
import UserList from "@/components/template/HorizontalUserCard/UserList";
import UserModal from "@/components/template/HorizontalUserCard/UserModal";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const users = [
  {
    profileImage: "public/img/rurawa-logo/user1.png",
    name: "James Ortigoza",
    email: "james.ortigoza@example.com",
    group: "Admins",
    zone: "Santander, Bucaramanga",
    contact: "329 999 9999",
    vereda: "Vereda El Palmar",
    isActive: true,
  },
  {
    profileImage: "public/img/rurawa-logo/user2.png",
    name: "Ana Martínez",
    email: "ana.martinez@example.com",
    group: "Editors",
    zone: "Antioquia, Medellín",
    contact: "301 555 1234",
    vereda: "Vereda La Loma",
    isActive: false,
  },
  {
    profileImage: "public/img/rurawa-logo/user3.png",
    name: "Carlos Gómez",
    email: "carlos.gomez@example.com",
    group: "Viewers",
    zone: "Cundinamarca, Bogotá",
    contact: "315 888 5678",
    vereda: "Vereda Santa Bárbara",
    isActive: true,
  },
  {
    profileImage: "public/img/rurawa-logo/user4.png",
    name: "Lucía Fernández",
    email: "lucia.fernandez@example.com",
    group: "Admins",
    zone: "Valle del Cauca, Cali",
    contact: "320 123 4567",
    vereda: "Vereda La Esperanza",
    isActive: true,
  },
  {
    profileImage: "public/img/rurawa-logo/user5.png",
    name: "Pedro Torres",
    email: "pedro.torres@example.com",
    group: "Editors",
    zone: "Boyacá, Tunja",
    contact: "300 444 7777",
    vereda: "Vereda San Agustín",
    isActive: false,
  },
  {
    profileImage: "public/img/rurawa-logo/user6.png",
    name: "Laura Castro",
    email: "laura.castro@example.com",
    group: "Viewers",
    zone: "Risaralda, Pereira",
    contact: "302 789 6543",
    vereda: "Vereda El Porvenir",
    isActive: true,
  },
  {
    profileImage: "public/img/rurawa-logo/user7.png",
    name: "Miguel Rojas",
    email: "miguel.rojas@example.com",
    group: "Admins",
    zone: "Nariño, Pasto",
    contact: "305 111 2222",
    vereda: "Vereda El Rosario",
    isActive: true,
  },
  {
    profileImage: "public/img/rurawa-logo/user8.png",
    name: "Sara López",
    email: "sara.lopez@example.com",
    group: "Editors",
    zone: "Atlántico, Barranquilla",
    contact: "311 333 4444",
    vereda: "Vereda Los Cedros",
    isActive: false,
  },
  {
    profileImage: "public/img/rurawa-logo/user9.png",
    name: "Andrés Mejía",
    email: "andres.mejia@example.com",
    group: "Viewers",
    zone: "Huila, Neiva",
    contact: "316 555 6666",
    vereda: "Vereda San Juan",
    isActive: true,
  },
  {
    profileImage: "public/img/rurawa-logo/user10.png",
    name: "Daniela Rodríguez",
    email: "daniela.rodriguez@example.com",
    group: "Admins",
    zone: "Caldas, Manizales",
    contact: "317 777 8888",
    vereda: "Vereda La Unión",
    isActive: true,
  },
  {
    profileImage: "public/img/rurawa-logo/user11.png",
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    group: "Viewers",
    zone: "Córdoba, Montería",
    contact: "318 999 0000",
    vereda: "Vereda El Diamante",
    isActive: false,
  },
  {
    profileImage: "public/img/rurawa-logo/user12.png",
    name: "Natalia Sánchez",
    email: "natalia.sanchez@example.com",
    group: "Editors",
    zone: "Magdalena, Santa Marta",
    contact: "319 101 2020",
    vereda: "Vereda El Progreso",
    isActive: true,
  },
  {
    profileImage: "public/img/rurawa-logo/user13.png",
    name: "Ricardo Vargas",
    email: "ricardo.vargas@example.com",
    group: "Admins",
    zone: "Cesar, Valledupar",
    contact: "322 303 4040",
    vereda: "Vereda Las Flores",
    isActive: true,
  },
  {
    profileImage: "public/img/rurawa-logo/user14.png",
    name: "Mónica Herrera",
    email: "monica.herrera@example.com",
    group: "Editors",
    zone: "Tolima, Ibagué",
    contact: "323 505 6060",
    vereda: "Vereda Los Ángeles",
    isActive: false,
  },
  {
    profileImage: "public/img/rurawa-logo/user15.png",
    name: "Oscar Ramírez",
    email: "oscar.ramirez@example.com",
    group: "Viewers",
    zone: "Norte de Santander, Cúcuta",
    contact: "324 707 8080",
    vereda: "Vereda La Victoria",
    isActive: true,
  },
];

/** Example purpose only */
const FarmerModulesView = () => {
  const tabs = ["Lista", "Actividades"];
  const [selectedTab, setSelectedTab] = useState<string>("Lista");
  const [isModalOpen, setModalOpen] = useState<boolean>(false);


  const renderContent = () => {
    if (selectedTab === "Lista") {
      return (
        <div className="grid gap-4 p-1">
          {users.map((us) => (
            <UserCard
              profileImage={us.profileImage}
              name={us.name}
              email={us.email}
              group={us.group}
              zone={us.zone}
              vereda={us.vereda}
              contact={us.contact}
              isActive={us.isActive}
            />
          ))}
        </div>
      );
    }
    if (selectedTab === "Actividades") return <UserList />;
    return null;
  };

  return (
    <div className="min-h-screen">
      <nav className="flex items-center justify-between px-6 py-4 ">
        <h1 className="text-xl font-bold text-gray-800">Agricultores</h1>
        <div className="mx-40">
        <TabSwitcher
          tabs={tabs}
          selectedTab={selectedTab}
          onTabChange={(tab) => setSelectedTab(tab)}
        />
        </div>
        <button
          onClick={() => setModalOpen(true)} 
          className="flex items-center gap-2 px-4 py-2 bg-[#008B00] text-white font-medium rounded-full hover:bg-[#008B20] transition"
        >
          <FaPlus />
          Nuevo Agricultor
        </button>
      </nav>
      <main className="p-4">{renderContent()}</main>
      {isModalOpen && <UserModal onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default FarmerModulesView;
