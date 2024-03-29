export const data = [
  {
    name: 'Inicio',
    href: '/home',
    icon: 'Home',
  },
  {
    label: 'Catálogo',
    name: 'Catálogo',
    icon: 'CopyMinus',
    subMenus: [
      {
        name: 'Propriedades',
        href: '/listagem-de-propriedades',
      },
      {
        name: 'Condominios',
        href: '/listagem-de-condominios',
      },
      {
        name: 'Atributos',
        href: '/listagem-de-atributos',
      },
    ],
  },
];
