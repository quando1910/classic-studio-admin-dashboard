export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'primary',
        text: 'NEW'
      }
    },
    {
      title: true,
      name: 'Admin - Show chụp',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Hợp đồng',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Tạo mới',
          url: '/contracts/new',
          icon: 'icon-puzzle'
        },
        {
          name: 'Lịch chụp',
          url: '/contracts',
          icon: 'icon-puzzle'
        },
        {
          name: 'Tìm kiếm',
          url: '/contracts/search',
          icon: 'icon-puzzle'
        },
        {
          name: 'Thống kê',
          url: '/base/cards',
          icon: 'icon-puzzle'
        }
      ]
    },
    {
      name: 'Thợ ảnh',
      url: '/base',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Danh sách thợ',
          url: '/photographers',
          icon: 'icon-puzzle'
        },
        {
          name: 'Chia ca chụp',
          url: '/photographers/schedule',
          icon: 'icon-puzzle'
        }
        // {
        //   name: 'Carousels',
        //   url: '/base/carousels',
        //   icon: 'icon-puzzle'
        // },
        // {
        //   name: 'Collapses',
        //   url: '/base/collapses',
        //   icon: 'icon-puzzle'
        // },
      ]
    },
    {
      title: true,
      name: 'Admin - Lịch làm việc',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Lịch làm việc',
      url: '/base',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Cố định',
          url: '/base/cards',
          icon: 'icon-puzzle'
        },
        {
          name: 'Phát sinh',
          url: '/base/cards',
          icon: 'icon-puzzle'
        },
        {
          name: 'Lịch sử',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle'
        }
        // {
        //   name: 'Carousels',
        //   url: '/base/carousels',
        //   icon: 'icon-puzzle'
        // },
        // {
        //   name: 'Collapses',
        //   url: '/base/collapses',
        //   icon: 'icon-puzzle'
        // },
      ]
    },
    {
      title: true,
      name: 'Admin - kho đồ',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Tổng kho',
      url: '/base',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Tạo mới',
          url: '/base/cards',
          icon: 'icon-puzzle'
        },
        {
          name: 'Thống kê tồn kho',
          url: '/base/cards',
          icon: 'icon-puzzle'
        },
        {
          name: 'Danh sách tổng',
          url: '/inventories',
          icon: 'icon-puzzle'
        }
        // {
        //   name: 'Carousels',
        //   url: '/base/carousels',
        //   icon: 'icon-puzzle'
        // },
        // {
        //   name: 'Collapses',
        //   url: '/base/collapses',
        //   icon: 'icon-puzzle'
        // },
      ]
    },
    {
      name: 'Hợp đồng thuê',
      url: '/base',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Thống kê',
          url: '/base/cards',
          icon: 'icon-puzzle'
        },
        {
          name: 'Danh sách thuê',
          url: '/base/cards',
          icon: 'icon-puzzle'
        },
        // {
        //   name: 'Carousels',
        //   url: '/base/carousels',
        //   icon: 'icon-puzzle'
        // },
        // {
        //   name: 'Collapses',
        //   url: '/base/collapses',
        //   icon: 'icon-puzzle'
        // },
      ]
    },
    {
      name: 'Đối tác',
      url: '/base',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Tạo mới',
          url: '/base/cards',
          icon: 'icon-puzzle'
        },
        {
          name: 'Đối tác thuê',
          url: '/base/cards',
          icon: 'icon-puzzle'
        },
        {
          name: 'Thống kê',
          url: '/base/carousels',
          icon: 'icon-puzzle'
        },
        // {
        //   name: 'Collapses',
        //   url: '/base/collapses',
        //   icon: 'icon-puzzle'
        // },
      ]
    },
    {
      title: true,
      name: 'Khách hàng',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Hợp đồng',
      url: '/base',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Thông tin',
          url: '/base/cards',
          icon: 'icon-puzzle'
        },
        // {
        //   name: 'Carousels',
        //   url: '/base/carousels',
        //   icon: 'icon-puzzle'
        // },
        // {
        //   name: 'Collapses',
        //   url: '/base/collapses',
        //   icon: 'icon-puzzle'
        // },
      ]
    },
    {
      name: 'Trang phục',
      url: '/base',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Lịch thử',
          url: '/base/cards',
          icon: 'icon-puzzle'
        },
        {
          name: 'Size đồ',
          url: '/base/cards',
          icon: 'icon-puzzle'
        },
        {
          name: 'Tình trạng thuê',
          url: '/base/carousels',
          icon: 'icon-puzzle'
        },
        // {
        //   name: 'Collapses',
        //   url: '/base/collapses',
        //   icon: 'icon-puzzle'
        // },
      ]
    },
    {
      name: 'Ảnh in',
      url: '/base',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Lựa ảnh',
          url: '/base/cards',
          icon: 'icon-puzzle'
        }
        // {
        //   name: 'Collapses',
        //   url: '/base/collapses',
        //   icon: 'icon-puzzle'
        // },
      ]
    },
    {
      title: true,
      name: 'Admin - Lợi nhuận',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Lương',
      url: '/base',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Thợ ảnh',
          url: '/base/cards',
          icon: 'icon-puzzle'
        },
        {
          name: 'Hậu cần',
          url: '/base/cards',
          icon: 'icon-puzzle'
        }
        // {
        //   name: 'Collapses',
        //   url: '/base/collapses',
        //   icon: 'icon-puzzle'
        // },
      ]
    },
    {
      name: 'Hợp đồng',
      url: '/base',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Thống kê lợi nhuận',
          url: '/base/cards',
          icon: 'icon-puzzle'
        }
        // {
        //   name: 'Collapses',
        //   url: '/base/collapses',
        //   icon: 'icon-puzzle'
        // },
      ]
    },
    {
      name: 'Đối tác',
      url: '/base',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Thống kê lợi nhuận',
          url: '/base/cards',
          icon: 'icon-puzzle'
        }
        // {
        //   name: 'Collapses',
        //   url: '/base/collapses',
        //   icon: 'icon-puzzle'
        // },
      ]
    },
    {
      title: true,
      name: 'Theme',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Colors',
      url: '/theme/colors',
      icon: 'icon-drop'
    },
    {
      name: 'Typography',
      url: '/theme/typography',
      icon: 'icon-pencil'
    },
    {
      title: true,
      name: 'Components',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Base',
      url: '/base',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Breadcrumbs',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle'
        },
        {
          name: 'Cards',
          url: '/base/cards',
          icon: 'icon-puzzle'
        },
        {
          name: 'Carousels',
          url: '/base/carousels',
          icon: 'icon-puzzle'
        },
        {
          name: 'Collapses',
          url: '/base/collapses',
          icon: 'icon-puzzle'
        },
        {
          name: 'Forms',
          url: '/base/forms',
          icon: 'icon-puzzle'
        },
        {
          name: 'Jumbotrons',
          url: '/base/jumbotrons',
          icon: 'icon-puzzle'
        },
        {
          name: 'List Groups',
          url: '/base/list-groups',
          icon: 'icon-puzzle'
        },
        {
          name: 'Navs',
          url: '/base/navs',
          icon: 'icon-puzzle'
        },
        {
          name: 'Navbars',
          url: '/base/navbars',
          icon: 'icon-puzzle'
        },
        {
          name: 'Paginations',
          url: '/base/paginations',
          icon: 'icon-puzzle'
        },
        {
          name: 'Popovers',
          url: '/base/popovers',
          icon: 'icon-puzzle'
        },
        {
          name: 'Progress Bars',
          url: '/base/progress-bars',
          icon: 'icon-puzzle'
        },
        {
          name: 'Switches',
          url: '/base/switches',
          icon: 'icon-puzzle'
        },
        {
          name: 'Tables',
          url: '/base/tables',
          icon: 'icon-puzzle'
        },
        {
          name: 'Tabs',
          url: '/base/tabs',
          icon: 'icon-puzzle'
        },
        {
          name: 'Tooltips',
          url: '/base/tooltips',
          icon: 'icon-puzzle'
        }
      ]
    },
    {
      name: 'Buttons',
      url: '/buttons',
      icon: 'icon-cursor',
      children: [
        {
          name: 'Buttons',
          url: '/buttons/standard-buttons',
          icon: 'icon-cursor'
        },
        {
          name: 'Button Dropdowns',
          url: '/buttons/dropdowns',
          icon: 'icon-cursor'
        },
        {
          name: 'Button Groups',
          url: '/buttons/button-groups',
          icon: 'icon-cursor'
        },
        {
          name: 'Brand Buttons',
          url: '/buttons/brand-buttons',
          icon: 'icon-cursor'
        }
      ]
    },
    {
      name: 'Charts',
      url: '/charts',
      icon: 'icon-pie-chart'
    },
    {
      name: 'Icons',
      url: '/icons',
      icon: 'icon-star',
      children: [
        {
          name: 'CoreUI Icons',
          url: '/icons/coreui-icons',
          icon: 'icon-star',
          badge: {
            variant: 'info',
            text: 'NEW'
          }
        },
        {
          name: 'Flags',
          url: '/icons/flags',
          icon: 'icon-star'
        },
        {
          name: 'Font Awesome',
          url: '/icons/font-awesome',
          icon: 'icon-star',
          badge: {
            variant: 'secondary',
            text: '4.7'
          }
        },
        {
          name: 'Simple Line Icons',
          url: '/icons/simple-line-icons',
          icon: 'icon-star'
        }
      ]
    },
    {
      name: 'Notifications',
      url: '/notifications',
      icon: 'icon-bell',
      children: [
        {
          name: 'Alerts',
          url: '/notifications/alerts',
          icon: 'icon-bell'
        },
        {
          name: 'Badges',
          url: '/notifications/badges',
          icon: 'icon-bell'
        },
        {
          name: 'Modals',
          url: '/notifications/modals',
          icon: 'icon-bell'
        }
      ]
    },
    {
      name: 'Widgets',
      url: '/widgets',
      icon: 'icon-calculator',
      badge: {
        variant: 'primary',
        text: 'NEW'
      }
    },
    {
      divider: true
    },
    {
      title: true,
      name: 'Extras'
    },
    {
      name: 'Pages',
      url: '/pages',
      icon: 'icon-star',
      children: [
        {
          name: 'Login',
          url: '/pages/login',
          icon: 'icon-star'
        },
        {
          name: 'Register',
          url: '/pages/register',
          icon: 'icon-star'
        },
        {
          name: 'Error 404',
          url: '/pages/404',
          icon: 'icon-star'
        },
        {
          name: 'Error 500',
          url: '/pages/500',
          icon: 'icon-star'
        }
      ]
    },
    {
      name: 'Disabled',
      url: '/dashboard',
      icon: 'icon-ban',
      badge: {
        variant: 'secondary',
        text: 'NEW'
      },
      attributes: { disabled: true },
    },
    {
      name: 'Download CoreUI',
      url: 'http://coreui.io/vue/',
      icon: 'icon-cloud-download',
      class: 'mt-auto',
      variant: 'success',
      attributes: { target: '_blank', rel: 'noopener' }
    },
    {
      name: 'Try CoreUI PRO',
      url: 'http://coreui.io/pro/vue/',
      icon: 'icon-layers',
      variant: 'danger',
      attributes: { target: '_blank', rel: 'noopener' }
    },
  ]
}
