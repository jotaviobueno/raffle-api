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
        name: 'Produtos',
        href: '/listagem-de-produtos',
      },
      {
        name: 'Categorias',
        href: '/listagem-de-categorias',
      },
    ],
  },
];
