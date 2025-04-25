import { Instance, SnapshotOut, types } from 'mobx-state-tree';

export const AuthenticationStoreModel = types
  .model('AuthenticationStore')
  .props({
    authToken: types.maybe(types.string),
    authEmail: '',
  })
  .views((store) => ({
    /**
     * Checks if the user is currently authenticated.
     * @returns {boolean} - True if the user has an auth token, false otherwise.
     */
    get isAuthenticated() {
      return !!store.authToken;
    },
    /**
     * Validates the current auth email and returns any validation error.
     * @returns {string} - Empty string if valid, error message if invalid.
     */
    get validationError() {
      if (store.authEmail.length === 0) return "can't be blank";
      if (store.authEmail.length < 6) return 'must be at least 6 characters';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.authEmail))
        return 'must be a valid email address';
      return '';
    },
  }))
  .actions((store) => ({
    /**
     * Sets the authentication token.
     * @param {string} [value] - The new auth token value. If undefined, clears the token.
     */
    setAuthToken(value?: string) {
      store.authToken = value;
    },
    /**
     * Sets the authentication email, removing any whitespace.
     * @param {string} value - The new email value.
     */
    setAuthEmail(value: string) {
      store.authEmail = value.replace(/ /g, '');
    },
    /**
     * Logs out the user by clearing the auth token and email.
     */
    logout() {
      store.authToken = undefined;
      store.authEmail = '';
    },
  }));

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {}
