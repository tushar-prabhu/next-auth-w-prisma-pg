const crypto = require('crypto');

// Generate a random 32-byte (256-bit) secret
const secret = crypto.randomBytes(32).toString('hex');

console.log('Generated NEXTAUTH_SECRET:');
console.log(secret);
console.log('\nAdd this to your .env file:');
console.log(`NEXTAUTH_SECRET=${secret}`);
