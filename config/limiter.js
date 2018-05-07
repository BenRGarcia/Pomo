module.exports = {
  path: '*',
  method: 'all',
  lookup: ['connection.remoteAddress'],
  total: 200, // 200 requests per hour
  expire: 1000 * 60 * 60,
  skipHeaders: true
}
