module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: 'shizai.barcapp.cn',
      username: 'root',
      pem: '~/.ssh/id_rsa'
      // password: 'server-password'
      // or neither for authenticate from ssh-agent
    }
  },

  app: {
    // TODO: change app name and path
    name: 'shizai',
    path: './',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'https://shizai.barcapp.cn',
      MONGO_URL: 'mongodb://shizai:shizai2018@ds229918.mlab.com:29918/shizai',
    },

    ssl: { // (optional)
      // Enables let's encrypt (optional)
      autogenerate: {
        email: 'michael@hackhub.com',
        // comma separated list of domains
        domains: 'shizai.barcapp.cn'
      }
    },

    docker: {
      // change to 'abernix/meteord:base' if your app is using Meteor 1.4 - 1.5
      image: 'abernix/meteord:node-8.4.0-base',
    },

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

  // mongo: {
  //   version: '3.4.1',
  //   servers: {
  //     one: {}
  //   }
  // }
};
