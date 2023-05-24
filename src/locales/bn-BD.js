import component from './bn-BD/component';
import globalHeader from './bn-BD/globalHeader';
import menu from './bn-BD/menu';
import pages from './bn-BD/pages';
import pwa from './bn-BD/pwa';
import settingDrawer from './bn-BD/settingDrawer';
import settings from './bn-BD/settings';

export default {
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
  ...pages,
};
