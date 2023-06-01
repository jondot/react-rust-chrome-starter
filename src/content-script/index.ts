import { browser } from 'webextension-polyfill-ts';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import pageProvider from './pageProvider/index.ts?script&module';

/**
 * Injects a script tag into the current document
 *
 * @param {string} content - Code to be executed in the current document
 */
function injectScript() {
  try {
    const container = document.head || document.documentElement;
    const scriptTag = document.createElement("script");
    scriptTag.setAttribute("async", "false");
    scriptTag.setAttribute("type", "module");
    scriptTag.src = browser.runtime.getURL(pageProvider);
    container.insertBefore(scriptTag, container.children[0]);
    container.removeChild(scriptTag);
  } catch (error) {
    console.error("Unisat: Provider injection failed.", error);
  }
}
injectScript();
