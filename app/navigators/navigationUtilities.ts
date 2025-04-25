import { useState, useEffect, useRef } from 'react';
import { BackHandler, Linking, Platform } from 'react-native';
import {
  NavigationState,
  PartialState,
  createNavigationContainerRef,
} from '@react-navigation/native';
import Config from '../config';
import type { PersistNavigationConfig } from '../config/config.base';
import { useIsMounted } from '../utils/useIsMounted';
import type { AppStackParamList, NavigationProps } from './AppNavigator';

import * as storage from '../utils/storage';

type Storage = typeof storage;

/**
 * Reference to the root App Navigator.
 *
 * If needed, you can use this to access the navigation object outside of a
 * `NavigationContainer` context. However, it's recommended to use the `useNavigation` hook whenever possible.
 * @see [Navigating Without Navigation Prop]{@link https://reactnavigation.org/docs/navigating-without-navigation-prop/}
 *
 * The types on this reference will only let you reference top level navigators. If you have
 * nested navigators, you'll need to use the `useNavigation` with the stack navigator's ParamList type.
 */
export const navigationRef = createNavigationContainerRef<AppStackParamList>();

/**
 * Gets the current screen from any navigation state.
 * @param {NavigationState | PartialState<NavigationState>} state - The navigation state to traverse.
 * @returns {keyof AppStackParamList} - The name of the current screen.
 * @throws {Error} - If the navigation state is invalid or empty.
 */
export function getActiveRouteName(
  state: NavigationState | PartialState<NavigationState>,
): keyof AppStackParamList {
  if (!state.routes || state.routes.length === 0) {
    throw new Error('Invalid navigation state: no routes found');
  }

  const route = state.routes[state.index ?? 0];
  if (!route) {
    throw new Error('Invalid navigation state: route not found at index');
  }

  // Found the active route -- return the name
  if (!route.state) return route.name as keyof AppStackParamList;

  // Recursive call to deal with nested routers
  return getActiveRouteName(route.state as NavigationState<AppStackParamList>);
}

const iosExit = () => false;

/**
 * Hook that handles Android back button presses and forwards those on to
 * the navigation or allows exiting the app.
 * @see [BackHandler]{@link https://reactnative.dev/docs/backhandler}
 * @param {(routeName: string) => boolean} canExit - Function that returns whether we can exit the app.
 * @returns {void}
 */
export function useBackButtonHandler(canExit: (routeName: string) => boolean): void {
  // The reason we're using a ref here is because we need to be able
  // to update the canExit function without re-setting up all the listeners
  const canExitRef = useRef(Platform.OS !== 'android' ? iosExit : canExit);

  useEffect(() => {
    canExitRef.current = canExit;
  }, [canExit]);

  useEffect(() => {
    // We'll fire this when the back button is pressed on Android.
    const onBackPress = () => {
      if (!navigationRef.isReady()) {
        return false;
      }

      try {
        // grab the current route
        const routeName = getActiveRouteName(navigationRef.getRootState());

        // are we allowed to exit?
        if (canExitRef.current(routeName)) {
          // exit and let the system know we've handled the event
          BackHandler.exitApp();
          return true;
        }

        // we can't exit, so let's turn this into a back action
        if (navigationRef.canGoBack()) {
          navigationRef.goBack();
          return true;
        }
      } catch (error) {
        console.error('[Navigation] Error handling back button:', error);
      }

      return false;
    };

    // Subscribe when we come to life
    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    // Unsubscribe when we're done
    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, []);
}

/**
 * This helper function will determine whether we should enable navigation persistence
 * based on a config setting and the __DEV__ environment (dev or prod).
 * @param {PersistNavigationConfig} persistNavigation - The config setting for navigation persistence.
 * @returns {boolean} - Whether to restore navigation state by default.
 */
function navigationRestoredDefaultState(persistNavigation: PersistNavigationConfig): boolean {
  if (persistNavigation === 'always') return false;
  if (persistNavigation === 'dev' && __DEV__) return false;
  if (persistNavigation === 'prod' && !__DEV__) return false;

  // all other cases, disable restoration by returning true
  return true;
}

/**
 * Custom hook for persisting navigation state.
 * @param {Storage} storage - The storage utility to use.
 * @param {string} persistenceKey - The key to use for storing the navigation state.
 * @returns {object} - The navigation state and persistence functions.
 */
export function useNavigationPersistence(storage: Storage, persistenceKey: string) {
  const [initialNavigationState, setInitialNavigationState] =
    useState<NavigationProps['initialState']>();
  const isMounted = useIsMounted();

  const initNavState = navigationRestoredDefaultState(Config.persistNavigation);
  const [isRestored, setIsRestored] = useState(initNavState);

  const routeNameRef = useRef<keyof AppStackParamList | undefined>();

  const onNavigationStateChange = (state: NavigationState | undefined) => {
    try {
      const previousRouteName = routeNameRef.current;
      if (state !== undefined) {
        const currentRouteName = getActiveRouteName(state);

        if (previousRouteName !== currentRouteName) {
          // track screens.
          if (__DEV__) {
            console.log('[Navigation] Screen changed:', currentRouteName);
          }
        }

        // Save the current route name for later comparison
        routeNameRef.current = currentRouteName as keyof AppStackParamList;

        // Persist state to storage
        storage.save(persistenceKey, state);
      }
    } catch (error) {
      console.error('[Navigation] Error saving navigation state:', error);
    }
  };

  const restoreState = async () => {
    try {
      const initialUrl = await Linking.getInitialURL();

      // Only restore the state if app has not started from a deep link
      if (!initialUrl) {
        const state = await storage.load<NavigationProps['initialState']>(persistenceKey);
        if (state) setInitialNavigationState(state);
      }
    } catch (error) {
      console.error('[Navigation] Error restoring navigation state:', error);
    } finally {
      if (isMounted()) setIsRestored(true);
    }
  };

  useEffect(() => {
    if (!isRestored) restoreState();
    // runs once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { onNavigationStateChange, restoreState, isRestored, initialNavigationState };
}

/**
 * Navigate to a route in the app.
 * @param name - The name of the route to navigate to.
 * @param params - The params to pass to the route.
 * @throws {Error} - If navigation is not ready.
 */
export function navigate<T extends keyof AppStackParamList>(
  name: T,
  params?: AppStackParamList[T],
): void {
  if (!navigationRef.isReady()) {
    throw new Error(
      'Navigation is not ready. Make sure to call this after navigation is initialized.',
    );
  }

  navigationRef.navigate({
    name,
    params,
  } as never);
}

/**
 * Go back in the navigation stack if possible.
 * @returns {boolean} - Whether the back action was handled.
 */
export function goBack(): boolean {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
    return true;
  }
  return false;
}

/**
 * Reset the navigation state to the provided state.
 * @param {Parameters<typeof navigationRef.resetRoot>[0]} state - The new navigation state.
 * @throws {Error} - If navigation is not ready.
 */
export function resetRoot(
  state: Parameters<typeof navigationRef.resetRoot>[0] = { index: 0, routes: [] },
): void {
  if (!navigationRef.isReady()) {
    throw new Error(
      'Navigation is not ready. Make sure to call this after navigation is initialized.',
    );
  }
  try {
    navigationRef.resetRoot(state);
  } catch (error) {
    console.error('[Navigation] Error resetting navigation root:', error);
    throw error;
  }
}
