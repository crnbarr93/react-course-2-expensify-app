import { login, startLogin, logout, startLogout } from '../../actions/auth';

let uid;

beforeEach(() => {
  uid = '123';
});

test('should login by uid', () => {
  const action = login(uid);
  expect(action).toEqual({
    type: 'LOGIN',
    uid
  });
});

test('should logout', () => {
  const action = logout();
  expect(action).toEqual({
    type: 'LOGOUT'
  });
});
