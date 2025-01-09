module.exports = {
  apps: [
    {
      name: 'nails-nha-y',
      script: './dist/server.js', // Path to the compiled JavaScript file
      instances: 'max', // Scales app to the number of CPU cores
      exec_mode: 'cluster', // Enables clustering mode
      watch: false, // Disable watching for production
      env: {
        NODE_ENV: 'production', // Set the environment
      },
    },
  ],
};
