export default {
  '/auth': {
    // target: 'https://game-api-dev.cubicup.io',
    target: 'https://api.juicyzzzz.xyz',
    changeOrigin: true,
    // secure:false,
    pathRewrite: {
      '^/auth': '/auth',
    },
  },
  '/chat': {
    target: 'https://ai-nft-bot-dev.cubicup.io',
    changeOrigin: true,
    // secure:false,
    pathRewrite: {
      '^/chat': '/chat',
    },
  },
  '/tasks': {
    target: 'https://api.juicyzzzz.xyz',
    changeOrigin: true,
    // secure:false,
    pathRewrite: {
      '^/tasks': '/tasks',
    },
  },
  '/api': {
    target: 'https://api-snsauth.juicyzzzz.xyz',
    changeOrigin: true,
    // secure:false,
    pathRewrite: {
      '^/api': '/api',
    },
  },
  '/users': {
    target: 'https://api.juicyzzzz.xyz',
    changeOrigin: true,
    // secure:false,
    pathRewrite: {
      '^/users': '/users',
    },
  },
  '/app.turbos.finance':{
    target: 'https://s3.amazonaws.com',
    changeOrigin: true,
    // secure:false,
    pathRewrite: {
      '^/app.turbos.finance': '/app.turbos.finance',
    },
  }
};
