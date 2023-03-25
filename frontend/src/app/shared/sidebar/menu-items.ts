import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
 
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/administration/hotels',
    title: 'Hôtel',
    icon: 'bi bi-card-text',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/administration/chambres',
    title: 'Chambre',
    icon: 'bi bi-hdd-stack',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/administration/reservations',
    title: 'Reservation',
    icon: 'bi bi-patch-check',
    class: '',
    extralink: false,
    submenu: []
  },
  // {
  //   path: '/agri-elevage/profile-utilisateur',
  //   title: 'Profile',
  //   icon: 'bi bi-people',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // },
  {
    path: '/agri-elevage/utilisateurs',
    title: 'Utilisateur',
    icon: 'bi bi-people',
    class: '',
    extralink: false,
    submenu: []
  },
  // {
  //   path: '/agri-elevage/roles',
  //   title: 'Role',
  //   icon: 'bi bi-pause-btn',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // },
  {
    path: '/agri-elevage/publications',
    title: 'Equipement',
    icon: 'bi bi-layout-split',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/agri-elevage/discussions',
    title: 'Discussion',
    icon: 'bi bi-bell',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/about',
    title: 'About',
    icon: 'bi bi-menu-app',
    class: '',
    extralink: false,
    submenu: []
  }
];
