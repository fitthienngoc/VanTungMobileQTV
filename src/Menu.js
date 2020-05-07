const Menu = [
    {
        heading: 'Menu',
        translate: 'sidebar.heading.HEADER'
    },
    // {
    //     name: 'Dashboard',
    //     path: '/',
    //     icon : 'fa fa-dashboard',
    //     translate: 'sidebar.nav.SINGLEVIEW'
    // }
    // ,
    // {
    //     name: 'Kho hàng',
    //     icon: 'fa fa-home',
    //     translate: 'sidebar.nav.MENU',
    //     // label: { value: 1, color: 'info' },
    //     submenu: [
    //         {
    //             name: 'Tất cả',
    //             translate: 'sidebar.nav.SUBMENU',
    //             path: '/warehouses'
    //         },
    //         {
    //             name: 'Thêm mới',
    //             translate: 'sidebar.nav.SUBMENU',
    //             path: '/warehouses/create'
    //         }
    //     ]
    // },
    {
        name: 'Dashboard',
        icon: 'fa fa-dashboard',
        translate: 'sidebar.nav.MENU',
        path: '/'
    },
    ,
    {
        name: 'Order',
        icon: 'fa fa-shopping-cart',
        translate: 'sidebar.nav.MENU',
        path: '/orders',
        // submenu: [
        //     {
        //         name: '• Orders',
        //         translate: 'sidebar.nav.SUBMENU',
        //         icon: 'fa fa-shopping-cart',
        //         path: '/orders'
        //     },
        //     {
        //         name: '• E-Ticket',
        //         translate: 'sidebar.nav.SUBMENU',
        //         icon: 'fa fa-ticket',
        //         path: '/orders/ticket/e-ticket'
        //     },
        //     {
        //         name: '• D-Ticket',
        //         icon: 'fa fa-car',
        //         translate: 'sidebar.nav.SUBMENU',

        //         path: '/orders/ticket/cod'
        //     },
        //     {
        //         name: '• Refund Request',
        //         translate: 'sidebar.nav.SUBMENU',
        //         icon: 'fa fa-exchange',

        //         path: '/refund'
        //     },
        // ]
    },
    {
        name: 'Categories',
        icon: 'fa fa-tags',
        translate: 'sidebar.nav.MENU',
        path: '/categories',
        submenu: [
            {
                name: '• Categories',
                translate: 'sidebar.nav.SUBMENU',
                icon: 'fa fa-tags',
                path: '/categories'
            },
            {
                name: '• New',
                translate: 'sidebar.nav.SUBMENU',
                icon: 'fa fa-plus',
                path: '/categories-new'
            },
        ]
    },
    {
        name: 'Products',
        icon: 'fa fa-mobile',
        translate: 'sidebar.nav.MENU',
        path: '/products',
        submenu: [
            {
                name: '• Products',
                translate: 'sidebar.nav.SUBMENU',
                icon: 'fa fa-mobile',
                path: '/products'
            },
            {
                name: '• New',
                translate: 'sidebar.nav.SUBMENU',
                icon: 'fa fa-plus',
                path: '/products-new'
            },
        ]
    },
    {
        name: 'Comment',
        icon: 'fa fa-comment',
        translate: 'sidebar.nav.MENU',
        path: '/comments',
    },
    {
        name: 'Users',
        icon: 'fa fa-users',
        translate: 'sidebar.nav.MENU',
        path: '/users'
    },
];

export default Menu;
