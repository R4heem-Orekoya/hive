export const PRODUCTS_CATEGORIES = [
   {
      label: 'UI Kits',
      value: 'ui_kits' as const,
      features: [
         {
            name: 'Editor picks',
            href: '#',
            imageSrc: '/nav/ui-kits/digicraft.webp'
         },
         {
            name: 'New Arrivals',
            href: '/products?category=ui_kits&sort=desc',
            imageSrc: '/nav/ui-kits/blue.png',
         },
          {
            name: 'Bestsellers',
            href: '/products?category=ui_kits',
            imageSrc: '/nav/ui-kits/orange.png',
         },
      ]
   },
   {
      label: 'Icons',
      value: 'icons' as const,
      features: [
        {
          name: 'Favorite Icon Picks',
          href: `/products?category=icons`,
          imageSrc: '/nav/icons/picks.jpg',
        },
        {
          name: 'New Arrivals',
          href: '/products?category=icons&sort=desc',
          imageSrc: '/nav/icons/new.jpg',
        },
        {
          name: 'Bestselling Icons',
          href: '/products?category=icons',
          imageSrc: '/nav/icons/bestsellers.jpg',
        },
      ],
   },
]