import store from '../../src/store';

describe('mutations', () => {
  it('INCREMENT', () => {
    // apply mutation
    store.commit('SET_ROLE_ID', 1);
    store.commit('SET_BANNER_ID', 1);
    store.commit('SET_LOADING', { type: 'merchant', payload: true });
    store.commit('SET_CURRENT_USER', { name: 'Ahmad Waluyo' });
    store.commit('SET_SCREEN_WIDTH', window.innerWidth);

    expect(store.state.roleId).toBe(1);
    expect(store.state.bannerId).toBe(1);
    expect(store.state.loading.merchant).toBe(true);
    expect(store.state.currentUser).toMatchObject(
      expect.objectContaining({
        name: expect.any(String),
      }),
    );
    expect(store.state.screenWidth).toEqual(expect.any(Number));
  });
});
