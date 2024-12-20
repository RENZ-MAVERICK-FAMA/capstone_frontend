import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import Units from '../views/Units.vue'
import AddUnit from '../views/AddUnit.vue'
import Profile from '@/views/Profile.vue'
import NotFound from '../views/NotFound.vue'  
import Index from '../views/Index.vue' 
import Topup from '../views/Topup.vue' 
import Deduct from '../views/Deduct.vue' 
import LoginTeller from '../views/LoginTeller.vue'
import AddTeller from '../views/AddTeller.vue'
import HomeTeller from '../views/HomeTeller.vue'
import Test from '../views/Test.vue' 
import ResetPassword from '../views/ResetPassword.vue' 
import LoginUnitView from '../views/LoginUnitView.vue'
import UnitDashboard from '../views/UnitDashboard.vue'
import MotorelaScan from '../views/MotorelaScan.vue'
import MulticabScan from '../views/MulticabScan.vue'
import kiosktopup from '../views/kiosktopup.vue'
import kiosktopup2 from '../views/kiosktopup2.vue'
import HomeAdmin from '../views/HomeAdmin.vue'
import LoginAdmin from '../views/LoginAdmin.vue'
import AddAdmin from '../views/AddAdmin.vue'
import Loginkiosk from '../views/loginkiosk.vue'
import addkiosk from '../views/addkiosk.vue'
import kioskhome from '../views/kioskhome.vue'
import HomeSuperAdmin from '../views/HomeSuperAdmin.vue'
import Unit from '../views/Unit.vue'
import Operators from '../views/Operators.vue'
import Teller from '../views/Teller.vue'
import Admin  from '../views/Admin.vue'
import AddSuperAdmin from '../views/AddSuperAdmin.vue'
import Kiosk from '../views/Kiosk.vue' 
import Officeteller from '../views/Officeteller.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: Test
    },
    
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true, accountType: 'operator' },
      props: (route) => ({ operator: route.params.operator })
    },  {
      path: '/homeTeller',
      name: 'homeTeller',
      component: HomeTeller,
      meta: { requiresAuth: true, accountType: 'teller' },
      props: (route) => ({ teller: route.params.teller })
    },{
      path: '/homeunit',
      name: 'homeunit',
      component: UnitDashboard,
      meta: { requiresAuth: true, accountType: 'unit' },
      props: (route) => ({ unit: route.params.unit })
    },{
      path: '/homeadmin',
      name: 'homeadmin',
      component: HomeAdmin,
      meta: { requiresAuth: true, accountType: 'admin' },
      props: (route) => ({ admin: route.params.admin })
    }, {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },{
      path: '/addTeller',
      name: 'addTeller',
      component: AddTeller
    },{
      path: '/addAdmin',
      name: 'addAdmin',
      component: AddAdmin
    },{
      path: '/addkiosk',
      name: 'addkiosk',
      component: addkiosk,
      meta: { requiresAuth: true, accountType: 'SuperAdmin' },
      props: (route) => ({ SuperAdmin: route.params.SuperAdmin })
    }, {
      path: '/login',
      name: 'login',
      component: LoginView
    },{
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/loginkiosk',
      name: 'loginkiosk',
      component: Loginkiosk
    },{
      path: '/reset',
      name: 'reset',
      component:  ResetPassword
    },{
      path: '/units',
      name: 'units',
      component: Units,
      meta: { requiresAuth: true, accountType: 'operator' },
      props: (route) => ({ operator: route.params.operator })
    },{
      path: '/addunit',
      name: 'addunit',
      component: AddUnit,
      meta: { requiresAuth: true, accountType: 'operator' },
      props: (route) => ({ operator: route.params.operator })
    },{
      path: '/topup',
      name: 'topup',
      component: Topup,
      meta: { requiresAuth: true, accountType: 'teller' },
   props: (route) => ({ teller: route.params.teller })
    },{
      path: '/kiosktopup',
      name: 'kiosktopup',
      component: kiosktopup,
      meta: { requiresAuth: true, accountType: 'kiosk' },
   props: (route) => ({ kiosk: route.params.kiosk })
    },{
      path: '/kioskminimum',
      name: 'kioskminimum',
      component: kiosktopup2,
      meta: { requiresAuth: true, accountType: 'kiosk' },
   props: (route) => ({ kiosk: route.params.kiosk })
    },{
      path: '/kioskhome',
      name: 'kioskhome',
      component: kioskhome,
      meta: { requiresAuth: true, accountType: 'kiosk' },
   props: (route) => ({ kiosk: route.params.kiosk })
    },{
      path: '/deduct',
      name: 'deduct',
      component: Deduct,
      meta: { requiresAuth: true, accountType: 'teller' },
  props: (route) => ({ teller: route.params.teller })
    },
    {
      path: '/motorelascan',
      name: 'motorelascan',
      component: MotorelaScan,
      meta: { requiresAuth: true, accountType: 'teller' },
      props: (route) => ({ teller: route.params.teller })
    },
    {
      path: '/officeteller',
      name: 'officeteller',
      component: Officeteller,
      meta: { requiresAuth: true, accountType: 'teller' },
      props: (route) => ({ teller: route.params.teller })
    }, {
      path: '/multicabscan',
      name: 'multicabscan',
      component: MulticabScan,
      meta: { requiresAuth: true, accountType: 'teller' },
      props: (route) => ({ teller: route.params.teller })
    }, {
      path: '/HomeSuperAdmin',
      name: 'HomeSuperAdmin',
      component: HomeSuperAdmin,
      meta: { requiresAuth: true, accountType: 'SuperAdmin' },
      props: (route) => ({ SuperAdmin: route.params.SuperAdmin })
    },{
      path: '/AddSuperAdmin',
      name: 'AddSuperAdmin',
      component: AddSuperAdmin
    }
    ,{
      path: '/unit',
      name: 'unit',
      component: Unit,
      meta: { requiresAuth: true, accountType: 'SuperAdmin' },
      props: (route) => ({ SuperAdmin: route.params.SuperAdmin })

    },{
      path: '/user',
      name: 'user',
      component: Operators,
      meta: { requiresAuth: true, accountType: 'SuperAdmin' },
      props: (route) => ({ SuperAdmin: route.params.SuperAdmin })
    },{
      path: '/kiosk',
      name: 'kiosk',
      component: Kiosk,
      meta: { requiresAuth: true, accountType: 'SuperAdmin' },
      props: (route) => ({ SuperAdmin: route.params.SuperAdmin })
    },{
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: { requiresAuth: true, accountType: 'SuperAdmin' },
      props: (route) => ({ SuperAdmin: route.params.SuperAdmin })
    },{
      path: '/teller',
      name: 'teller',
      component: Teller,
      meta: { requiresAuth: true, accountType: 'SuperAdmin' },
      props: (route) => ({ SuperAdmin: route.params.SuperAdmin })
    },
    {
      path: '/:catchAll(.*)',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('access_token');
  const accountType = localStorage.getItem('accountType');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'index' });
    } else if (!['unit', 'operator', 'admin', 'teller','kiosk','SuperAdmin'].includes(accountType)) {
      next({ name: 'index' });
    } else {
      switch (accountType) {
        case 'unit':
          if (to.meta.accountType && to.meta.accountType !== 'unit') {
            next({ name: 'homeunit' });
          } else {
            next();
          }
          break;
        case 'operator':
          if (to.meta.accountType && to.meta.accountType !== 'operator') {
            next({ name: 'home' });
          } else {
            next();
          }
          break;
        case 'admin':
          if (to.meta.accountType && to.meta.accountType !== 'admin') {
            next({ name: 'homeadmin' });
          } else {
            next();
          }
          break;
        case 'teller':
          if (to.meta.accountType && to.meta.accountType !== 'teller') {
            next({ name: 'homeTeller' });
          } else {
            next();
          }
          break;
          case 'SuperAdmin':
            if (to.meta.accountType && to.meta.accountType !== 'SuperAdmin') {
              next({ name: 'HomeSuperAdmin' });
            } else {
              next();
            }
            break;
          case 'kiosk':
            if (to.meta.accountType && to.meta.accountType !== 'kiosk') {
              next({ name: 'kioskminimum' });
            } else {
              next();
            }
            break;
        default:
          next({ name: 'index' });
          break;
      }
    }
  } else {
    next();
  }
});



export default router
