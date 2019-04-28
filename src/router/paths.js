export default [
  {
    path: '*',
    meta: {
      public: true,
    },
    redirect: {
      path: '/404'
    }
  },
  {
    path: '/404',
    meta: {
      public: true,
    },
    name: 'NotFound',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/NotFound.vue`
    )
  },
  {
    path: '/403',
    meta: {
      public: true,
    },
    name: 'AccessDenied',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/Deny.vue`
    )
  },
  {
    path: '/500',
    meta: {
      public: true,
    },
    name: 'ServerError',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/Error.vue`
    )
  },
  {
    path: '/login',
    meta: {
      public: true,
    },
    name: 'Login',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/Login.vue`
    )
  },
  {
    path: '/',
    meta: {},
    name: 'Root',
    redirect: {
      name: 'dashboard'
    }
  },
  {
    path: '/dashboard',
    meta: { breadcrumb: true },
    name: 'dashboard',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/Dashboard.vue`
    )
  },
  {
    path: '/quotation',
    meta: { breadcrumb: true },
    name: 'quotation',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/dat/quotation/ListQuotation.vue`
    )
  },
  {
    path: '/quotation/add',
    meta: { breadcrumb: true },
    name: 'quotation/add',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/dat/quotation/AddQuotation.vue`
    )
  },
  {
    path: '/quotation/edit/:id',
    meta: { breadcrumb: true },
    name: 'quotation/edit',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/dat/quotation/AddQuotation.vue`
    )
  },
  {
    path: '/item',
    meta: { breadcrumb: true },
    name: 'item',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/dat/item/ListItem.vue`
    )
  },
  {
    path: '/item/add',
    meta: { breadcrumb: true },
    name: 'item/add',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/dat/item/AddItem.vue`
    )
  },
  {
    path: '/item/edit/:code',
    meta: { breadcrumb: true },
    name: 'item/edit',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/dat/item/AddItem.vue`
    )
  },
  {
    path: '/customer',
    meta: { breadcrumb: true },
    name: 'customer',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/dat/Customer/ListCustomer.vue`
    )
  },
  {
    path: '/customer/add',
    meta: { breadcrumb: true },
    name: 'customer/add',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/dat/Customer/AddCustomer.vue`
    )
  },
  {
    path: '/customer/edit/:code',
    meta: { breadcrumb: true },
    name: 'customer/edit',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/dat/Customer/AddCustomer.vue`
    )
  },
  {
    path: '/employee',
    meta: { breadcrumb: true },
    name: 'employee',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/dat/employee/ListEmployee.vue`
    )
  },
  {
    path: '/employee/add',
    meta: { breadcrumb: true },
    name: 'employee/add',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/dat/employee/AddEmployee.vue`
    )
  },
  {
    path: '/employee/edit/:id',
    meta: { breadcrumb: true },
    name: 'employee/edit',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/dat/employee/AddEmployee.vue`
    )
  },
  {
    path: '/order',
    meta: { breadcrumb: true },
    name: 'order',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/dat/order/ListOrder.vue`
    )
  },
  {
    path: '/order/add',
    meta: { breadcrumb: true },
    name: 'order/add',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/dat/order/AddOrder.vue`
    )
  },
  {
    path: '/order/edit/:id',
    meta: { breadcrumb: true },
    name: 'order/edit',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/dat/order/AddOrder.vue`
    )
  }
];
