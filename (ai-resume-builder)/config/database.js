module.exports = ({ env }) => ({
  connection: {
    client: env('DATABASE_CLIENT', 'postgres'), // ডেটাবেস ক্লায়েন্টকে postgres সেট করছি
    connection: {
      connectionString: env('DATABASE_URL'),    // .env ফাইল থেকে DATABASE_URL নিয়ে আসছি
      ssl: {                                     // SSL কনফিগারেশন
        rejectUnauthorized: false,               // সিকিউর কানেকশনের জন্য এটি false রাখছি
      },
    },
  },
});
