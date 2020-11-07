import { elements } from '../views/base';
import * as headerView from '../views/headerView';
import * as storage from '../utils/localStorage';

if (storage.getObj('token')) {
  headerView.renderHeaderLogin();
}
