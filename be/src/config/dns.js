// src/config/dns.js
const dns = require('dns');

// Configure Node's default resolver to use Google DNS for SRV/TXT lookups (needed for mongodb+srv://)
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (e) {
  console.warn('⚠️ Failed to set global DNS servers, falling back to system defaults:', e.message);
}

// Monkeypatch dns.lookup for TCP/TLS host connections (used by net.connect)
const originalLookup = dns.lookup;
dns.lookup = function (hostname, options, callback) {
  let actualOptions = options;
  let actualCallback = callback;

  if (typeof options === 'function') {
    actualCallback = options;
    actualOptions = {};
  }

  // Only intercept MongoDB Atlas hostnames to prevent affecting local development services (like Redis/localhost)
  if (hostname && hostname.endsWith('mongodb.net')) {
    const resolver = new dns.Resolver();
    resolver.setServers(['8.8.8.8', '8.8.4.4']);
    resolver.resolve4(hostname, (err, addresses) => {
      if (err || !addresses || addresses.length === 0) {
        // Fallback to the default system DNS lookup if Google DNS fails
        return originalLookup(hostname, actualOptions, actualCallback);
      }
      
      // Node's dns.lookup expects an array of objects if options.all is true
      if (actualOptions.all) {
        const addrList = addresses.map(addr => ({ address: addr, family: 4 }));
        actualCallback(null, addrList);
      } else {
        actualCallback(null, addresses[0], 4);
      }
    });
  } else {
    originalLookup(hostname, actualOptions, actualCallback);
  }
};
