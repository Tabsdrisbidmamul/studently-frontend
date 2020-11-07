import '@babel/polyfill';
import '../sass/main.scss';
import * as overview from './controllers/overviewController';
import * as alert from './controllers/alertController';
import * as headerController from './controllers/headerController';
import * as cardController from './controllers/cardController';
/***
 * N.B
 * COOKIE WERE NOT WORKING IN DEV SERVER, SO INSTEAD USED TOKEN BASED APPROACH BY PUTTING THEM IN THE HEADERS
 *
 * THIS LINE OF CODE IS PRETTY MUCH EVERYWHERE - HOPING WHEN WE PUSH THE SITE TO AN ACTUAL HTTPS SERVER THE COOKIES WILL WORK
 * const token = state.user.token || storage.getObj('user');
 *
 */
