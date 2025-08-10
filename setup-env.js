const fs = require('fs');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Setting up environment variables...\n');

const questions = [
  {
    name: 'DATABASE_URL',
    question: 'Enter your database URL (or press Enter to use default): ',
    default: 'postgresql://postgres:postgres@localhost:5432/nextauth?schema=public'
  },
  {
    name: 'NEXTAUTH_SECRET',
    question: 'Enter a secret for NextAuth (or press Enter to generate one): ',
    generateIfEmpty: true
  },
  {
    name: 'NEXTAUTH_URL',
    question: 'Enter your application URL (or press Enter to use default): ',
    default: 'http://localhost:3000'
  }
];

const envVars = {};

function askQuestion(index) {
  if (index >= questions.length) {
    saveEnvFile();
    return;
  }

  const { name, question, default: defaultValue, generateIfEmpty } = questions[index];
  
  readline.question(question, (answer) => {
    if (answer.trim() === '' && defaultValue) {
      envVars[name] = defaultValue;
    } else if (answer.trim() === '' && generateIfEmpty) {
      // Generate a random secret if none provided
      const crypto = require('crypto');
      envVars[name] = crypto.randomBytes(32).toString('hex');
      console.log(`Generated ${name}: ${envVars[name]}`);
    } else {
      envVars[name] = answer.trim();
    }
    
    askQuestion(index + 1);
  });
}

function saveEnvFile() {
  let envContent = '';
  for (const [key, value] of Object.entries(envVars)) {
    envContent += `${key}=${value}\n`;
  }

  fs.writeFileSync('.env', envContent);
  console.log('\n .env file created successfully!');
  readline.close();
}

// Start asking questions
askQuestion(0);
