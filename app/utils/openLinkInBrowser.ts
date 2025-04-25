import { Linking } from 'react-native';

/**
 * Opens a URL in the device's external browser.
 * First checks if the URL can be opened, then opens it if possible.
 *
 * @param {string} url - The URL to open in the external browser.
 * @returns {Promise<void>} - A promise that resolves when the URL is opened.
 */
export function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url));
}
