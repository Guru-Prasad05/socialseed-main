const { PrismaClient } = require ("@prisma/client");

const client = new PrismaClient();
console.log(client)
module.exports= client;
