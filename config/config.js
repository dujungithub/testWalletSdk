import { defineConfig } from '@umijs/max';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

// const { UMI_ENV } = process.env;
const { REACT_APP_ENV } = process.env;

console.log("env------------------------------** " + REACT_APP_ENV);

export default defineConfig({
  hash: true,
  routes,
  theme: {
    'root-entry-name': 'variable',
  },
  ignoreMomentLocale: true,
  proxy: proxy,
  fastRefresh: true,
  model: {},
  initialState: {},
  title: 'Cubic Game Center',
  layout: {
    locale: true,
    ...defaultSettings,
  },
  moment2dayjs: {
    preset: 'antd',
    plugins: ['duration'],
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: true,
  },
  antd: {},
  request: {},
  access: {},
  headScripts: [{ src: '/scripts/loading.js', async: true }],
  presets: ['umi-presets-pro'],
  openAPI: [
    {
      requestLibPath: "import { request } from '@umijs/max'",
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from '@umijs/max'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
  mfsu: {
    strategy: 'normal',
  },
  requestRecord: {},
  jsMinifierOptions: {
    target: ['chrome80', 'es2020']
  },
  define: {
    "process.env": {
      AuthApi: "https://game-api-dev.cubicup.io",
      ChatApi: "https://ai-nft-bot-dev.cubicup.io",
      TasksApi:'https://game-api-dev.cubicup.io',
      Api: 'https://sns-auth-dev.cubicup.io',
      UsersApi: 'https://game-api-dev.cubicup.io',
      GameLink: 'https://cubi-test.cubicgames.xyz',
    },
  }
});
