import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Coffee, HeartIcon } from 'lucide-react'
import { Button } from '../ui/button'

const BuyCoffee = () => {
  return (
    <Card className='w-full h-fit flex flex-col'>
        <CardHeader className='flex flex-col gap-3'>
            <CardTitle className='text-lg sm:text-xl flex items-center'>
                <HeartIcon className='inline-block w-5 h-5 sm:w-6 sm:h-6 mr-2 text-orange-500 animate-pulse flex-shrink-0' />
                <span className='text-white font-bold text-[17px]'>Support Live Football Now</span>
            </CardTitle>
            <CardDescription className='text-sm sm:text-base text-gray-400 text-left'>
                Help us keep this service free for everyone
            </CardDescription>
        </CardHeader>
        <CardContent className='flex-grow'>
            <p className='text-sm sm:text-base text-gray-500 leading-relaxed text-left'>
                Live Football Now is completely free to use. If you find it helpful, consider buying us a coffee to support development and server costs.
            </p>
        </CardContent>
        <CardFooter className='pt-3'>
            <Button className='w-full font-medium py-3 px-4 text-sm sm:text-base text-black transition-colors duration-200 cursor-pointer' variant="default">
                <Coffee className='w-4 h-4 mr-2 flex-shrink-0' />
                Buy Me a Coffee
            </Button>
        </CardFooter>
    </Card>
  )
}

export default BuyCoffee