import AddVarianGroup from '@/components/sub-components/AddVarianGroup.vue';
import ProductCatalog from '@/components/sub-components/ProductCatalog.vue';
import VarianGroupOption from '@/components/sub-components/VarianGroupOption.vue';
import VarianOptions from '@/components/sub-components/VarianOptions.vue';
import { shallowMount } from '@vue/test-utils';
import store from '../../src/store';

describe('AddVarianGroup.vue', () => {
  it('should render correctly', () => {
    expect(AddVarianGroup.$el).toMatchSnapshot();
  });

  it('should render name AddVarianGroup', () => {
    expect(AddVarianGroup.name).toBe('AddVarianGroup');
  });

  it('should check props', () => {
    const wrapper = shallowMount(AddVarianGroup, {
      props: {
        isChanged: false,
        data: {
          name: 'tes',
        },
      },
    });
    expect(wrapper.props().isChanged).toEqual(expect.any(Boolean));
  });

  it('should check computed file', () => {
    beforeEach(() => {
      store.commit('SET_MERCHANT', {
        merchant_id: 1,
      });
    });
    const wrapper = shallowMount(AddVarianGroup, {
      props: {
        isChanged: false,
        data: {
          name: 'tes',
        },
      },
    });
    expect(wrapper.vm.merchant).toEqual(expect.any(Object));
  });
});

describe('ProductCatalog.vue', () => {
  it('should render correctly', () => {
    expect(ProductCatalog.$el).toMatchSnapshot();
  });

  it('should render name ProductCatalog', () => {
    expect(ProductCatalog.name).toBe('ProductCatalog');
  });

  it('should check props', () => {
    const wrapper = shallowMount(ProductCatalog, {
      props: {
        itemCatalogs: [],
      },
    });
    expect(wrapper.props().itemCatalogs).toEqual(expect.any(Array));
  });

  it('should return confirm delete methods to be correct payload', () => {
    const wrapper = shallowMount(ProductCatalog, {
      props: {
        itemCatalogs: [],
      },
    });
    expect(wrapper.find('.payloadCatalog').exists()).not.toBe(true);
  });
});

describe('VarianGroupOption.vue', () => {
  it('should render correctly', () => {
    expect(VarianGroupOption.$el).toMatchSnapshot();
  });

  it('should render name VarianGroupOption', () => {
    expect(VarianGroupOption.name).toBe('VarianGroupOption');
  });
});

describe('VarianOptions.vue', () => {
  it('should render correctly', () => {
    expect(VarianOptions.$el).toMatchSnapshot();
  });

  it('should render name VarianOptions', () => {
    expect(VarianOptions.name).toBe('VarianOptions');
  });
});
