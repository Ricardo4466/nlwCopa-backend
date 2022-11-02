import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'John.doe@gmail.com',
      avatarUrl: 'https://github.com/Ricardo4466.png'
    }
  })

  const pool = await prisma.pool.create({
    data: {
      title: 'Exemple Pool',
      code: 'BOL123',
      ownerId: user.id,

      Participant: {
        create: {
          userId: user.id
        }
      }
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-02T12:00:00.852Z',
      firstTeamCountryCode: 'DE',
      SecondTeamCountryCode: 'BR'
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-03T12:00:00.852Z',
      firstTeamCountryCode: 'BR',
      SecondTeamCountryCode: 'AR',

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,
          
          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id
              }
            }
          }
        }
      }
    }
  })

}

main()