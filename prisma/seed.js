const prisma = require("../src/utils/db");
const randID = require("../src/utils/rand");

async function main() {
  const data = await prisma.url.create({
    data: {
      url: "https://github.com/ImKnoX",
      slug: randID(24)
    }
  })
  return data
}

main()
  .then(async () => {
    await prisma.$disconnect()
})
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})