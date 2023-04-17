import React from 'react'
import Head from 'next/head'
import { Heading, Box, SimpleGrid } from '@chakra-ui/react'

export default function Home() {
  const nestedColors: string[] = []
  const flattenedColors: string[] = []
  for (let color of ['Primary', 'Neutral', 'Success', 'Error', 'Warning']) {
    for (let number of [20, 30, 40, 50, 60, 70, 80, 90]) {
      nestedColors.push(`Palette.${color}.${number}`)
      flattenedColors.push(`Palette/${color}/${number}`)
    }
  }
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Heading>Change theme.ts to switch between nested and flattened colors</Heading>
        <Box bgColor="red.100">I am red.100 (Chakra default)</Box>
        <Box bgColor="Palette.Primary.50">I am Palette.Primary.50 (nested color names)</Box>
        <Box bgColor="Palette/Primary/50">I am Palette/Primary/50 (flattened color names)</Box>
        <Box bgColor="Color.Container.Primary.Medium">Color.Container.Primary.Medium (nested color names)</Box>
        <Box bgColor="Color/Container/Primary/Medium">Color/Container/Primary/Medium (flattened color names)</Box>

        <br /><br />
        <Heading>Nested colors:</Heading>
        <SimpleGrid w="700px" columns={8} spacing="8px">
          {
            nestedColors.map(name => {
              return <Box key={name} fontSize="12px" bgColor={name} h="80px" w="80px" >{name}</Box>
            })
          }
        </SimpleGrid>

        <br /><br />
        <Heading>Flattened colors:</Heading>
        <SimpleGrid w="700px" columns={8} spacing="8px">
          {
            flattenedColors.map(name => {
              return <Box key={name} fontSize="12px" bgColor={name} h="80px" w="80px" >{name}</Box>
            })
          }
        </SimpleGrid>
      </main>
    </>
  )
}
