const redis = require('redis');

// Usando a variável de ambiente REDIS_URL para conectar ao Redis
const client = redis.createClient({
  url: process.env.REDIS_URL,
});

client.on('error', (err) => {
  console.error('Redis Client Error', err);
});

(async () => {
  await client.connect();
})();

module.exports = client;
