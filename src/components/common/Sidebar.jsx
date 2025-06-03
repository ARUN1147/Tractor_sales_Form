import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  FolderIcon,
  DocumentIcon,
  TableIcon,
  UsersIcon
} from '@heroicons/react/outline'; // if you have heroicons installed; otherwise swap with any icons

const Sidebar = () => {
  const linkClasses = ({ isActive }) =>
    `flex items-center px-4 py-2 hover:bg-gray-200 transition ${
      isActive ? 'bg-gray-200 font-semibold' : ''
    }`;

  return (
    <div className="w-64 bg-white border-r">
      <div className="p-4 text-xl font-semibold">Menu</div>
      <nav className="flex flex-col space-y-1">
        <NavLink to="/dashboard" className={linkClasses}>
          <HomeIcon className="h-5 w-5 mr-2" /> Dashboard
        </NavLink>
        <NavLink to="/sales" className={linkClasses}>
          <FolderIcon className="h-5 w-5 mr-2" /> Sales
        </NavLink>
        <NavLink to="/reports" className={linkClasses}>
          <DocumentIcon className="h-5 w-5 mr-2" /> Reports
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
