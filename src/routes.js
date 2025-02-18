import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from '@vkontakte/vk-mini-apps-router';

export const DEFAULT_ROOT = 'default_root';

export const DEFAULT_VIEW = 'default_view';

export const DEFAULT_VIEW_PANELS = {
  HOME: 'home',
  PARAMS: 'params',
  PREDICIONS: 'predictions',
  INFO: 'info',
};

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DEFAULT_VIEW_PANELS.HOME, '/', []),
      createPanel(DEFAULT_VIEW_PANELS.INFO, `/${DEFAULT_VIEW_PANELS.INFO}`, []),
      createPanel(DEFAULT_VIEW_PANELS.PARAMS, `/${DEFAULT_VIEW_PANELS.PARAMS}`, []),
      createPanel(DEFAULT_VIEW_PANELS.PREDICIONS, `/${DEFAULT_VIEW_PANELS.PREDICIONS}`, []),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
