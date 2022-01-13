import App from '@/App.vue';

describe('App.vue', () => {
  it('has the expected html structure', () => {
    expect(App.$el).toMatchSnapshot();
  });

  it('should have "App" as name', () => {
    expect(App.name).toBe('App');
  });
});
