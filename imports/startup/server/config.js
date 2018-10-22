const common = {
  WECHAT_APPID: 'wx08f0a1998c3b9afa',
  WECHAT_SECRET: '0172b9d5bd48b81c1404b27dd9e9e794'
};

const development = {
  DEV: true,
};

const production = {
  DEV: false
};

const env = 'development';

export default {
  development: { ...common, ...development },
  production: { ...common, ...production },
}[env];
