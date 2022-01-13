import _Component from '@/components/templates/_Component.vue';
import Modal from '@/components/templates/Modal.vue';
import Table from '@/components/templates/Table.vue';

describe('_Component.vue', () => {
  it('should render correctly', () => {
    expect(_Component.$el).toMatchSnapshot();
  });

  it('should render name Component', () => {
    expect(_Component.name).toBe('Component');
  });
});

describe('Modal.vue', () => {
  it('should render correctly', () => {
    expect(Modal.$el).toMatchSnapshot();
  });

  it('should render name Modal', () => {
    expect(Modal.name).toBe('HelpModal');
  });
});

describe('Table.vue', () => {
  it('should render correctly', () => {
    expect(Table.$el).toMatchSnapshot();
  });

  it('should render name Table', () => {
    expect(Table.name).toBe('HelpTable');
  });
});
