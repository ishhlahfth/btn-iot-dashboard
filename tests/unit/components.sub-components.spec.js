import AddVarianGroup from '@/components/sub-components/AddVarianGroup.vue';
import ProductCatalog from '@/components/sub-components/ProductCatalog.vue';
import VarianGroupOption from '@/components/sub-components/VarianGroupOption.vue';
import VarianOptions from '@/components/sub-components/VarianOptions.vue';

describe('AddVarianGroup.vue', () => {
  it('should render correctly', () => {
    expect(AddVarianGroup.$el).toMatchSnapshot();
  });

  it('should render name AddVarianGroup', () => {
    expect(AddVarianGroup.name).toBe('AddVarianGroup');
  });
});

describe('ProductCatalog.vue', () => {
  it('should render correctly', () => {
    expect(ProductCatalog.$el).toMatchSnapshot();
  });

  it('should render name ProductCatalog', () => {
    expect(ProductCatalog.name).toBe('ProductCatalog');
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
