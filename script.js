import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


async function main() {
    const user =  await prisma.user.create({data: {name: "Jason", email: "jason@gmail.com", isAdmin: true}})
    console.log(user)
    const pref = await prisma.pref.create({data: {name: "Jason", userId: user.id}})
}
main().catch(e => {
    console.log(e.messagea)
}).finally(async () => {
    await prisma.$disconnect
})