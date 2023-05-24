export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    layout: false,
    name: 'Home',
    showMenu: true,
    routes: [
      {
        name: 'home',
        path: '/home',
        component: './Home',
      },
    ],
  },
  {
    path: '/games',
    layout: false,
    name: 'Games',
    showMenu: true,
    routes: [
      {
        name: 'games',
        path: '/games',
        component: './Games',
      },
    ],
  },
  {
    path: '/developer',
    layout: false,
    name: 'Developer',
    showMenu: true,
    routes: [
      {
        name: 'developer',
        path: '/developer',
        component: './Developer',
      },
    ],
  },
  {
    path: '/marketplace',
    layout: false,
    name: 'Marketplace',
    showMenu: true,
    routes: [
      {
        name: 'marketplace',
        path: '/marketplace',
        component: './Marketplace',
      },
    ],
  },
  {
    path: '/login',
    layout: false,
    name: 'Login',
    showMenu: false,
    routes: [
      {
        name: 'login',
        path: '/login',
        component: './Login',
      },
    ],
  },
  {
    path: '/room-chat',
    layout: false,
    name: 'Chat',
    showMenu: false,
    routes: [
      {
        name: 'chat',
        path: '/room-chat',
        component: './Chat',
      },
    ],
  },
  // {
  //   path: '/home',
  //   layout: false,
  //   name: 'HOME',
  //   showMenu: true,
  //   routes: [
  //     {
  //       name: 'home',
  //       path: '/home',
  //       component: './Home',
  //     },
  //   ],
  // },
  // {
  //   path: '/studio',
  //   layout: false,
  //   name: 'STUDIO',
  //   showMenu: true,
  //   routes: [
  //     {
  //       name: 'studio',
  //       path: '/studio',
  //       component: './Studio',
  //     },
  //   ],
  // },
  // {
  //   path: '/player',
  //   layout: false,
  //   name: 'PLAYER',
  //   showMenu: true,
  //   routes: [
  //     {
  //       name: 'player',
  //       path: '/player',
  //       component: './Player',
  //     },
  //   ],
  // },
  // {
  //   path: '/roadmap',
  //   layout: false,
  //   name: 'ROADMAP',
  //   showMenu: true,
  //   routes: [
  //     {
  //       name: 'roadmap',
  //       path: '/roadmap',
  //       component: './Roadmap',
  //     },
  //   ],
  // },
  // {
  //   path: '/partner',
  //   layout: false,
  //   name: 'PARTNER',
  //   showMenu: true,
  //   routes: [
  //     {
  //       name: 'partner',
  //       path: '/partner',
  //       component: './Partner',
  //     },
  //   ],
  // },
  {
    path: '*',
    layout: false,
    component: './Result/404',
  },
];
