import MenuCard from '@/components/molecules/MenuCard.vue';
import MerchantItemForm from '@/components/molecules/MerchantItemForm.vue';
import Navbar from '@/components/molecules/Navbar.vue';
import SummaryCard from '@/components/molecules/SummaryCard.vue';
import Option from '@/components/molecules/Option.vue';
import Select from '@/components/molecules/Select.vue';
import Sidebar from '@/components/molecules/Sidebar.vue';
import TableFooter from '@/components/molecules/TableFooter.vue';
import { shallowMount } from '@vue/test-utils';

describe('MenuCard.vue', () => {
  it('should render correctly', () => {
    expect(MenuCard.$el).toMatchSnapshot();
  });

  it('should render name MenuCard', () => {
    expect(MenuCard.name).toBe('MenuCard');
  });

  it('should render all props', () => {
    const wrapper = shallowMount(MenuCard, {
      props: {
        raw: {
          name: 'test',
        },
        imageUrl:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        name: 'Untitled',
        category: '-',
        description: '-',
        price: 0,
        availabilityStatus: 'tersedia',
        isActive: true,
        variants: [],
        loading: false,
        isForProduct: true,
        isEdit: true,
      },
    });
    expect(wrapper.props().isEdit).toEqual(expect.any(Boolean));
    expect(wrapper.props().isForProduct).toEqual(expect.any(Boolean));
    expect(wrapper.props().loading).toEqual(expect.any(Boolean));
    expect(wrapper.props().isActive).toEqual(expect.any(Boolean));
  });

  it('should check data', () => {
    const wrapper = shallowMount(MenuCard);
    expect(wrapper.find('.optionItem').exists()).toBe(false);
  });
});

describe('MerchantItemForm.vue', () => {
  it('should render correctly', () => {
    expect(MerchantItemForm.$el).toMatchSnapshot();
  });

  it('should render name MerchantItemForm', () => {
    expect(MerchantItemForm.name).toBe('MerchantItemForm');
  });

  // it('should check computed', () => {
  //   const wrapper = shallowMount(MerchantItemForm);
  //   expect(wrapper.vm.screenWidth).toEqual(expect.any(Number))
  // });

  // it('should check props', () => {
  //   const wrapper = shallowMount(MerchantItemForm, {
  //     props: {
  //       isEditProduct: false,
  //       data: {
  //         id: 1
  //       },
  //     },
  //   });
  //   expect(wrapper.props().isEditProduct).toEqual(expect.any(Boolean));
  // });
});

describe('Navbar.vue', () => {
  it('should render correctly', () => {
    expect(Navbar.$el).toMatchSnapshot();
  });

  it('should render name Navbar', () => {
    expect(Navbar.name).toBe('HelpNavbar');
  });

  it('should check computed', () => {
    const wrapper = shallowMount(Navbar);
    expect(wrapper.vm.mini).toEqual(expect.any(Boolean));
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

  it('should check computed', () => {
    const wrapper = shallowMount(Option, {
      props: {
        options: [],
        default: '',
        selected: 2,
        position: ['bottom', 'right'],
      },
    });
    const obj = {
      label: 'Test',
    };
    expect(wrapper.props().options).toEqual(expect.any(Array));
    expect(wrapper.vm.checkLabel(obj)).toBe('Test');
  });
});

describe('Select.vue', () => {
  it('should render correctly', () => {
    expect(Select.$el).toMatchSnapshot();
  });

  it('should render name Select', () => {
    expect(Select.name).toBe('HelpSelect');
  });

  it('should check props', () => {
    const wrapper = shallowMount(Select, {
      props: {
        label: '',
        modelValue: 10,
        options: []
      }
    });
    expect(wrapper.props().options).toEqual(expect.any(Array));
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

  it('should check props', () => {
    const wrapper = shallowMount(TableFooter, {
      props: {
        offset: 0,
        limit: 10,
        sort: 'desc',
        order: 'Makanan',
        moreDataAvailable: true,
        currentRowCount: 20,
        count: 10,
        isCountActive: false,
      }
    });
    expect(wrapper.props().offset).toEqual(expect.any(Number));
  });

  it('should check props', () => {
    const wrapper = shallowMount(TableFooter, {
      props: {
        offset: 0,
        limit: 10,
        sort: 'desc',
        order: 'Makanan',
        moreDataAvailable: true,
        currentRowCount: 20,
        count: 10,
        isCountActive: false,
      }
    });
    expect(wrapper.find('.firstRow').exists()).toStrictEqual(expect.any(Boolean));
  });

  it('should check computed last row', () => {
    const wrapper = shallowMount(TableFooter, {
      props: {
        offset: 0,
        limit: 10,
        sort: 'desc',
        order: 'Makanan',
        moreDataAvailable: true,
        currentRowCount: 20,
        count: 10,
        isCountActive: false,
      }
    });
    expect(wrapper.vm.lastRow).toEqual(expect.any(Number));
  })
});
