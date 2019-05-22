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
      name: 'Khách hàng',
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
          name: 'Thông tin',
          url: '/contracts/new',
          icon: 'icon-puzzle'
        },
        {
          name: 'Thanh toán',
          url: '/contracts',
          icon: 'icon-puzzle'
        }
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
          url: '/members/pictures',
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
