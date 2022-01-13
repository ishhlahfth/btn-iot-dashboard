import AdminAddEdit from '@/components/modals/AdminAddEdit.vue';
import AdminDetail from '@/components/modals/AdminDetail.vue';
import BannerDetail from '@/components/modals/BannerDetail.vue';
import BannerForm from '@/components/modals/BannerForm.vue';
import Commission from '@/components/modals/Commission.vue';
import Confirmation from '@/components/modals/Confirmation.vue';
import ItemStatus from '@/components/modals/ItemStatus.vue';
import ListAdmin from '@/components/modals/ListAdmin.vue';
import MerchantDetail from '@/components/modals/MerchantDetail.vue';
import MerchantFilter from '@/components/modals/MerchantFilter.vue';
import MerchantVerification from '@/components/modals/MerchantVerification.vue';
import MerchantVerificationOption from '@/components/modals/MerchantVerificationOption.vue';
import OperationalHour from '@/components/modals/OperationalHour.vue';
import OrderDetail from '@/components/modals/OrderDetail.vue';
import OrderFilter from '@/components/modals/OrderFilter.vue';
import RoleAdd from '@/components/modals/RoleAdd.vue';
import RoleDetail from '@/components/modals/RoleDetail.vue';
import StatusHistory from '@/components/modals/StatusHistory.vue';
import TransferFilter from '@/components/modals/TransferFilter.vue';
import { shallowMount } from '@vue/test-utils';
import store from '../../src/store';

describe('AdminAddEdit.vue', () => {
  it('should render correctly', () => {
    expect(AdminAddEdit.$el).toMatchSnapshot();
  });

  it('should render name AdminAddEdit', () => {
    expect(AdminAddEdit.name).toBe('AdminAddEdit');
  });
});

describe('AdminDetail.vue', () => {
  it('should render correctly', () => {
    expect(AdminDetail.$el).toMatchSnapshot();
  });

  it('should render name AdminDetail', () => {
    expect(AdminDetail.name).toBe('AdminDetail');
  });
});

describe('BannerDetail.vue', () => {
  it('should render correctly', () => {
    expect(BannerDetail.$el).toMatchSnapshot();
  });

  it('should render name BannerDetail', () => {
    expect(BannerDetail.name).toBe('BannerDetail');
  });
});

describe('BannerForm.vue', () => {
  it('should render correctly', () => {
    expect(BannerForm.$el).toMatchSnapshot();
  });

  it('should render name BannerForm', () => {
    expect(BannerForm.name).toBe('BannerForm');
  });

  it('should check mounted data', () => {
    let tempData;
    beforeEach(() => {
      tempData = {
        title: '',
        hyperlink: '',
        startDate: '',
        endDate: '',
        isPermanent: false,
        src: '',
        isActive: true,
        loading: false,
        imageFile: null,
        S3BaseURL: process.env.VUE_APP_S3_BASE_URL,
        imageIsChanged: false,
      };
    });
    const wrapper = shallowMount(BannerForm, {
      data: tempData,
    });

    expect(wrapper.vm.screenWidth).toEqual(expect.any(Number));
  });
});

describe('Commission.vue', () => {
  it('should render correctly', () => {
    expect(Commission.$el).toMatchSnapshot();
  });

  it('should render name Commission', () => {
    expect(Commission.name).toBe('Commission');
  });
});

describe('Confirmation.vue', () => {
  it('should render correctly', () => {
    expect(Confirmation.$el).toMatchSnapshot();
  });

  it('should render name Confirmation', () => {
    expect(Confirmation.name).toBe('Confirmation');
  });
});

describe('ItemStatus.vue', () => {
  it('should render correctly', () => {
    expect(ItemStatus.$el).toMatchSnapshot();
  });

  it('should render name ItemStatus', () => {
    expect(ItemStatus.name).toBe('ItemStatus');
  });

  it('should check computed data', () => {
    const wrapper = shallowMount(ItemStatus);
    expect(wrapper.vm.screenWidth).toEqual(expect.any(Number));
  });
});

describe('ListAdmin.vue', () => {
  it('should render correctly', () => {
    expect(ListAdmin.$el).toMatchSnapshot();
  });

  it('should render name ListAdmin', () => {
    expect(ListAdmin.name).toBe('ListAdmin');
  });

  it('should check props', () => {
    beforeEach(() => {
      store.commit('SET_ADMIN_LIST', [
        {
          banner: {
            location:
              'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
          },
          profile: {
            name: 'Waluyo',
          },
        },
      ]);
    });
    const wrapper = shallowMount(ListAdmin, {
      props: {
        filter: {},
      },
    });
    expect(wrapper.props().filter).toEqual(expect.any(Object));
  });

  it('should check computed data', () => {
    beforeEach(() => {
      store.commit('SET_ADMIN_LIST', [
        {
          banner: {
            location:
              'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
          },
          profile: {
            name: 'Waluyo',
          },
        },
      ]);
    });
    const wrapper = shallowMount(ListAdmin);
    expect(wrapper.vm.screenWidth).toEqual(expect.any(Number));
  });
});

describe('MerchantDetail.vue', () => {
  it('should render correctly', () => {
    expect(MerchantDetail.$el).toMatchSnapshot();
  });

  it('should render name MerchantDetail', () => {
    expect(MerchantDetail.name).toBe('MerchantDetail');
  });
});

describe('MerchantFilter.vue', () => {
  it('should render correctly', () => {
    expect(MerchantFilter.$el).toMatchSnapshot();
  });

  it('should render name MerchantFilter', () => {
    expect(MerchantFilter.name).toBe('MerchantFilter');
  });
});

describe('MerchantVerification.vue', () => {
  it('should render correctly', () => {
    expect(MerchantVerification.$el).toMatchSnapshot();
  });

  it('should render name MerchantVerification', () => {
    expect(MerchantVerification.name).toBe('MerchantVerification');
  });
});

describe('MerchantVerificationOption.vue', () => {
  it('should render correctly', () => {
    expect(MerchantVerificationOption.$el).toMatchSnapshot();
  });

  it('should render name MerchantVerificationOption', () => {
    expect(MerchantVerificationOption.name).toBe('MerchantVerificationOption');
  });
});

describe('OperationalHour.vue', () => {
  it('should render correctly', () => {
    expect(OperationalHour.$el).toMatchSnapshot();
  });

  it('should render name OperationalHour', () => {
    expect(OperationalHour.name).toBe('OperationalHour');
  });
});

describe('OrderDetail.vue', () => {
  it('should render correctly', () => {
    expect(OrderDetail.$el).toMatchSnapshot();
  });

  it('should render name OrderDetail', () => {
    expect(OrderDetail.name).toBe('OrderDetail');
  });
});

describe('OrderFilter.vue', () => {
  it('should render correctly', () => {
    expect(OrderFilter.$el).toMatchSnapshot();
  });

  it('should render name OrderFilter', () => {
    expect(OrderFilter.name).toBe('OrderFilter');
  });

  const wrapper = shallowMount(OrderFilter, {
    props: {
      filter: {
        merchantName: 'Hello',
        orderStatus: 'PENDING',
        paymentMethod: 'OVO',
      },
    },
  });
  expect(wrapper.props().filter).toMatchObject({
    merchantName: expect.any(String),
    orderStatus: expect.any(String),
    paymentMethod: expect.any(String),
  });
});

describe('RoleAdd.vue', () => {
  it('should render correctly', () => {
    expect(RoleAdd.$el).toMatchSnapshot();
  });

  it('should render name RoleAdd', () => {
    expect(RoleAdd.name).toBe('RoleAdd');
  });

  it('should return flagging methods', () => {
    const wrapper = shallowMount(RoleAdd);
    const row = {
      id: 28,
    };
    expect(wrapper.vm.flagging(row)).toBeFalsy();
  });

  it('should return filter access to be array', () => {
    const wrapper = shallowMount(RoleAdd);
    const arr = [
      {
        id: 1,
        code: '',
        name: 'Dashboard Read',
        description: 'Access for read dashboard data',
        module: 'DASHBOARD',
        action: 'READ',
        required: [],
      },
      {
        id: 2,
        code: '',
        name: 'Customer Read',
        description: 'Access for read customer data',
        module: 'CUSTOMER',
        action: 'READ',
        required: [],
      },
    ];
    expect(wrapper.vm.filterAccess(arr)).toEqual(expect.any(Array));
  });
});

describe('RoleDetail.vue', () => {
  it('should render correctly', () => {
    expect(RoleDetail.$el).toMatchSnapshot();
  });

  it('should render name RoleDetail', () => {
    expect(RoleDetail.name).toBe('RoleDetail');
  });

  it('should return flagging methods', () => {
    const wrapper = shallowMount(RoleDetail);
    const row = {
      id: 28,
    };
    expect(wrapper.vm.flagging(row)).toBeFalsy();
  });
});

describe('StatusHistory.vue', () => {
  it('should render correctly', () => {
    expect(StatusHistory.$el).toMatchSnapshot();
  });

  it('should render name StatusHistory', () => {
    expect(StatusHistory.name).toBe('StatusHistory');
  });

  it('should render props history', () => {
    const wrapper = shallowMount(StatusHistory, {
      props: {
        filter: {
          merchantName: 'Hello',
        },
        currentPropStep: 'in-progress',
        updateAccess: false,
      },
    });
    expect(wrapper.props().currentPropStep).toMatch('');
    expect(wrapper.props().updateAccess).toBeFalsy();
    expect(wrapper.props().filter).toMatchObject({
      merchantName: expect.any(String),
    });
  });
});

describe('TransferFilter.vue', () => {
  it('should render correctly', () => {
    expect(TransferFilter.$el).toMatchSnapshot();
  });

  it('should render name TransferFilter', () => {
    expect(TransferFilter.name).toBe('TransferFilter');
  });

  it('should render return exist screenWidth', () => {
    const wrapper = shallowMount(TransferFilter, {
      props: {
        filter: {
          merchantName: 'Hello',
        },
      },
    });
    expect(wrapper.find('.screenWidth').exists()).toBeFalsy();
  });
});
