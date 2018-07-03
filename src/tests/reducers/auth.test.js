import authReducer from '../../reducers/auth'

test('should set default state', () => {
  const state = authReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual({});
});

test('should set uid upon login', () => {
  const uid = '123';
  const state = authReducer(undefined, { type: 'LOGIN', uid: uid});
  expect(state).toEqual({
    uid: uid
  });
});

test('should clear uid upon logout', () => {
  const preState = {
    uid: '123'
  };
  const state = authReducer(preState, { type: 'LOGOUT' });
  expect(state).toEqual({});
})
