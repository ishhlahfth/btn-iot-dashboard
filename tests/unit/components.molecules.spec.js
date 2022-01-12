import MenuCard from '@/components/molecules/MenuCard.vue';
import MerchantItemForm from '@/components/molecules/MerchantItemForm.vue';
import Navbar from '@/components/molecules/Navbar.vue';
import SummaryCard from '@/components/molecules/SummaryCard.vue';
import Option from '@/components/molecules/Option.vue';
import Select from '@/components/molecules/Select.vue';
import Sidebar from '@/components/molecules/Sidebar.vue';
import TableFooter from '@/components/molecules/TableFooter.vue';

// import { mount, shallowMount } from '@vue/test-utils';

describe('MenuCard.vue', () => {
  it('should render correctly', () => {
    expect(MenuCard.$el).toMatchSnapshot();
  });

  it('should render name MenuCard', () => {
    expect(MenuCard.name).toBe('MenuCard');
  });

  // it('should render all props', () => {
  //   const wrapper = mount(MenuCard, {
  //     props: {
  //       raw: {
  //         name: 'test'
  //       },
  //       imageUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  //       name: 'Untitled',
  //       category: '-',
  //       description: '-',
  //       price: 0,
  //       availabilityStatus: 'tersedia',
  //       isActive: true,
  //       variants: [],
  //       loading: false,
  //       isForProduct: true,
  //       isEdit: true,
  //     },
  //   });
  //   expect(wrapper.props().isEdit).toBeTruthy();
  // });
});

describe('MerchantItemForm.vue', () => {
  it('should render correctly', () => {
    expect(MerchantItemForm.$el).toMatchSnapshot();
  });

  it('should render name MerchantItemForm', () => {
    expect(MerchantItemForm.name).toBe('MerchantItemForm');
  });
});

describe('Navbar.vue', () => {
  it('should render correctly', () => {
    expect(Navbar.$el).toMatchSnapshot();
  });

  it('should render name Navbar', () => {
    expect(Navbar.name).toBe('HelpNavbar');
  });
});

describe('SummaryCard.vue', () => {
  it('should render correctly', () => {
    expect(SummaryCard.$el).toMatchSnapshot();
  });

  it('should render name SummaryCard', () => {
    expect(SummaryCard.name).toBe('SummaryCard');
  });
});

describe('Option.vue', () => {
  it('should render correctly', () => {
    expect(Option.$el).toMatchSnapshot();
  });

  it('should render name Option', () => {
    expect(Option.name).toBe('HelpOption');
  });
});

describe('Select.vue', () => {
  it('should render correctly', () => {
    expect(Select.$el).toMatchSnapshot();
  });

  it('should render name Select', () => {
    expect(Select.name).toBe('HelpSelect');
  });
});

describe('Sidebar.vue', () => {
  it('should render correctly', () => {
    expect(Sidebar.$el).toMatchSnapshot();
  });

  it('should render name Sidebar', () => {
    expect(Sidebar.name).toBe('HelpSidebar');
  });
});

describe('TableFooter.vue', () => {
  it('should render correctly', () => {
    expect(TableFooter.$el).toMatchSnapshot();
  });

  it('should render name TableFooter', () => {
    expect(TableFooter.name).toBe('TableFooter');
  });
});

