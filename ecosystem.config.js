module.exports = {
    apps: [
      {
        name: 'Leon Cycle',
        script: 'server.js', // Assuming you have server.js
        instances: 'max', // Adjust based on your needs
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  