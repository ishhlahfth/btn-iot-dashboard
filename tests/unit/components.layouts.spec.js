import Main from '@/components/layouts/Main.vue';

describe('Main.vue', () => {
  it('should render correctly', () => {
    expect(Main.$el).toMatchSnapshot();
  });

  it('should render name Main', () => {
    expect(Main.name).toBe('Main');
  });
});
