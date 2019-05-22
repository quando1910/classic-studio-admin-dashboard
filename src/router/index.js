import Vue from 'vue'
import Router from 'vue-router'
import { AuthService } from '../service/authService.js'

// Containers
const DefaultContainer = () => import( '@/containers/DefaultContainer' )

// Views
const Dashboard = () => import( '@/views/Dashboard' )

const Colors = () => import( '@/views/theme/Colors' )
const Typography = () => import( '@/views/theme/Typography' )

const Charts = () => import( '@/views/Charts' )
const Widgets = () => import( '@/views/Widgets' )

// Views - Components
const Cards = () => import( '@/views/base/Cards' )
const Forms = () => import( '@/views/base/Forms' )
const Switches = () => import( '@/views/base/Switches' )
const Tables = () => import( '@/views/base/Tables' )
const Tabs = () => import( '@/views/base/Tabs' )
const Breadcrumbs = () => import( '@/views/base/Breadcrumbs' )
const Carousels = () => import( '@/views/base/Carousels' )
const Collapses = () => import( '@/views/base/Collapses' )
const Jumbotrons = () => import( '@/views/base/Jumbotrons' )
const ListGroups = () => import( '@/views/base/ListGroups' )
const Navs = () => import( '@/views/base/Navs' )
const Navbars = () => import( '@/views/base/Navbars' )
const Paginations = () => import( '@/views/base/Paginations' )
const Popovers = () => import( '@/views/base/Popovers' )
const ProgressBars = () => import( '@/views/base/ProgressBars' )
const Tooltips = () => import( '@/views/base/Tooltips' )

// Views - Buttons
const StandardButtons = () => import( '@/views/buttons/StandardButtons' )
const ButtonGroups = () => import( '@/views/buttons/ButtonGroups' )
const Dropdowns = () => import( '@/views/buttons/Dropdowns' )
const BrandButtons = () => import( '@/views/buttons/BrandButtons' )

// Views - Icons
const Flags = () => import( '@/views/icons/Flags' )
const FontAwesome = () => import( '@/views/icons/FontAwesome' )
const SimpleLineIcons = () => import( '@/views/icons/SimpleLineIcons' )
const CoreUIIcons = () => import( '@/views/icons/CoreUIIcons' )

// Views - Notifications
const Alerts = () => import( '@/views/notifications/Alerts' )
const Badges = () => import( '@/views/notifications/Badges' )
const Modals = () => import( '@/views/notifications/Modals' )

// Views - Pages
const Page404 = () => import( '@/views/pages/Page404' )
const Page500 = () => import( '@/views/pages/Page500' )
const Login = () => import( '@/views/pages/Login' )
const Register = () => import( '@/views/pages/Register' )

// Users
const Users = () => import( '@/views/users/Users' )
const User = () => import( '@/views/users/User' )


///////////////
const ContractNew = () => import( '@/views/contracts/ContractNew' )
const ContractSearch = () => import( '@/views/contracts/ContractSearch' )
const ContractSchedule = () => import( '@/views/contracts/ContractSchedule' )
const ContractDetail = () => import( '@/views/contracts/ContractDetail' )
const ContractPublic = () => import( '@/views/contracts/ContractPublic' )
const ContractPayment = () => import( '@/views/contracts/ContractPayment' )
const Photographers = () => import( '@/views/photographers/Photographers' )
const PhotographerSchedule = () => import( '@/views/photographers/PhotographerSchedule' )
const Inventories = () => import( '@/views/inventory/Inventories' )
const Partners = () => import( '@/views/partners/PartnerList' )
const PartnerDetail = () => import( '@/views/partners/PartnerDetail' )
const PartnerHire = () => import( '@/views/partners/PartnerHire' )
const MemberPictures = () => import( '@/views/members/Pictures' )





const auth = new AuthService();
Vue.use( Router )

export default new Router( {
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ( { y: 0 } ),
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: DefaultContainer,
      // beforeEnter: auth.ifAuthenticated,
      children: [
        {
          path: '/members',
          name: 'ContractNew',
          beforeEnter: auth.ifAuthenticated,
          component: ContractNew
        },
        {
          path: '/members/pictures',
          name: 'MemberPictures',
          beforeEnter: auth.ifAuthenticated,
          component: MemberPictures
        },
        {
          path: '/contracts/new',
          name: 'ContractNew',
          beforeEnter: auth.ifAuthenticated,
          component: ContractNew
        },
        {
          path: '/contracts/search',
          name: 'ContractSearch',
          beforeEnter: auth.ifAuthenticated,
          component: ContractSearch
        },
        {
          path: '/contracts',
          name: 'ContractSchedule',
          beforeEnter: auth.ifAuthenticated,
          component: ContractSchedule
        },
        {
          path: '/contracts/:id/show',
          name: 'ContractDetail',
          beforeEnter: auth.ifAuthenticated,
          component: ContractDetail
        },
        {
          path: '/contracts/:id',
          name: 'ContractEdit',
          beforeEnter: auth.ifAuthenticated,
          component: ContractNew
        },
        {
          path: '/contracts/:id/payment',
          name: 'ContractPayment',
          beforeEnter: auth.ifAuthenticated,
          component: ContractPayment
        },
        {
          path: '/photographers',
          name: 'Photographers',
          beforeEnter: auth.ifAuthenticated,
          component: Photographers
        },
        {
          path: '/photographers/schedule',
          name: 'PhotographerSchedule',
          beforeEnter: auth.ifAuthenticated,
          component: PhotographerSchedule
        },
        {
          path: '/inventories',
          name: 'Inventories',
          beforeEnter: auth.ifAuthenticated,
          component: Inventories
        },
        {
          path: '/partners',
          name: 'Partners',
          beforeEnter: auth.ifAuthenticated,
          component: Partners
        },
        {
          path: '/partners/hire',
          name: 'PartnerHire',
          beforeEnter: auth.ifAuthenticated,
          component: PartnerHire
        },
        {
          path: '/partners/:id',
          name: 'PartnerDetail',
          beforeEnter: auth.ifAuthenticated,
          component: PartnerDetail
        },
        {
          path: 'forms',
          name: 'Forms',
          beforeEnter: auth.ifAuthenticated,
          component: Forms
        },
        {
          path: 'dashboard',
          name: 'Dashboard',
          beforeEnter: auth.ifAuthenticated,
          component: Dashboard
        },
        {
          path: 'theme',
          redirect: '/theme/colors',
          name: 'Theme',
          component: {
            render ( c ) { return c( 'router-view' ) }
          },
          children: [
            {
              path: 'colors',
              name: 'Colors',
              component: Colors
            },
            {
              path: 'typography',
              name: 'Typography',
              component: Typography
            }
          ]
        },
        {
          path: 'charts',
          name: 'Charts',
          component: Charts
        },
        {
          path: 'widgets',
          name: 'Widgets',
          component: Widgets
        },
        {
          path: 'users',
          meta: { label: 'Users' },
          component: {
            render ( c ) { return c( 'router-view' ) }
          },
          children: [
            {
              path: '',
              component: Users,
            },
            {
              path: ':id',
              meta: { label: 'User Details' },
              name: 'User',
              component: User,
            },
          ]
        },
        {
          path: 'base',
          redirect: '/base/cards',
          name: 'Base',
          component: {
            render ( c ) { return c( 'router-view' ) }
          },
          children: [
            {
              path: 'cards',
              name: 'Cards',
              component: Cards
            },
            {
              path: 'forms',
              name: 'Forms',
              component: Forms
            },
            {
              path: 'switches',
              name: 'Switches',
              component: Switches
            },
            {
              path: 'tables',
              name: 'Tables',
              component: Tables
            },
            {
              path: 'tabs',
              name: 'Tabs',
              component: Tabs
            },
            {
              path: 'breadcrumbs',
              name: 'Breadcrumbs',
              component: Breadcrumbs
            },
            {
              path: 'carousels',
              name: 'Carousels',
              component: Carousels
            },
            {
              path: 'collapses',
              name: 'Collapses',
              component: Collapses
            },
            {
              path: 'jumbotrons',
              name: 'Jumbotrons',
              component: Jumbotrons
            },
            {
              path: 'list-groups',
              name: 'List Groups',
              component: ListGroups
            },
            {
              path: 'navs',
              name: 'Navs',
              component: Navs
            },
            {
              path: 'navbars',
              name: 'Navbars',
              component: Navbars
            },
            {
              path: 'paginations',
              name: 'Paginations',
              component: Paginations
            },
            {
              path: 'popovers',
              name: 'Popovers',
              component: Popovers
            },
            {
              path: 'progress-bars',
              name: 'Progress Bars',
              component: ProgressBars
            },
            {
              path: 'tooltips',
              name: 'Tooltips',
              component: Tooltips
            }
          ]
        },
        {
          path: 'buttons',
          redirect: '/buttons/standard-buttons',
          name: 'Buttons',
          component: {
            render ( c ) { return c( 'router-view' ) }
          },
          children: [
            {
              path: 'standard-buttons',
              name: 'Standard Buttons',
              component: StandardButtons
            },
            {
              path: 'button-groups',
              name: 'Button Groups',
              component: ButtonGroups
            },
            {
              path: 'dropdowns',
              name: 'Dropdowns',
              component: Dropdowns
            },
            {
              path: 'brand-buttons',
              name: 'Brand Buttons',
              component: BrandButtons
            }
          ]
        },
        {
          path: 'icons',
          redirect: '/icons/font-awesome',
          name: 'Icons',
          component: {
            render ( c ) { return c( 'router-view' ) }
          },
          children: [
            {
              path: 'coreui-icons',
              name: 'CoreUI Icons',
              component: CoreUIIcons
            },
            {
              path: 'flags',
              name: 'Flags',
              component: Flags
            },
            {
              path: 'font-awesome',
              name: 'Font Awesome',
              component: FontAwesome
            },
            {
              path: 'simple-line-icons',
              name: 'Simple Line Icons',
              component: SimpleLineIcons
            }
          ]
        },
        {
          path: 'notifications',
          redirect: '/notifications/alerts',
          name: 'Notifications',
          component: {
            render ( c ) { return c( 'router-view' ) }
          },
          children: [
            {
              path: 'alerts',
              name: 'Alerts',
              component: Alerts
            },
            {
              path: 'badges',
              name: 'Badges',
              component: Badges
            },
            {
              path: 'modals',
              name: 'Modals',
              component: Modals
            }
          ]
        }
      ]
    },
    {
      path: '/public/contracts/:id',
      name: 'ContractPublic',
      component: ContractPublic
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render ( c ) { return c( 'router-view' ) }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        }
      ]
    }
  ]
} )
