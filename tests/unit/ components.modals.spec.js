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
});

describe('ListAdmin.vue', () => {
  it('should render correctly', () => {
    expect(ListAdmin.$el).toMatchSnapshot();
  });

  it('should render name ListAdmin', () => {
    expect(ListAdmin.name).toBe('ListAdmin');
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
});

describe('RoleAdd.vue', () => {
  it('should render correctly', () => {
    expect(RoleAdd.$el).toMatchSnapshot();
  });

  it('should render name RoleAdd', () => {
    expect(RoleAdd.name).toBe('RoleAdd');
  });
});

describe('RoleDetail.vue', () => {
  it('should render correctly', () => {
    expect(RoleDetail.$el).toMatchSnapshot();
  });

  it('should render name RoleDetail', () => {
    expect(RoleDetail.name).toBe('RoleDetail');
  });
});

describe('StatusHistory.vue', () => {
  it('should render correctly', () => {
    expect(StatusHistory.$el).toMatchSnapshot();
  });

  it('should render name StatusHistory', () => {
    expect(StatusHistory.name).toBe('StatusHistory');
  });
});

describe('TransferFilter.vue', () => {
  it('should render correctly', () => {
    expect(TransferFilter.$el).toMatchSnapshot();
  });

  it('should render name TransferFilter', () => {
    expect(TransferFilter.name).toBe('TransferFilter');
  });
});
