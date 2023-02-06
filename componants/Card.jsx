import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from '@material-tailwind/react'
import Faq from './Faq'
export default function Cardx() {
  return (
    <Card className='w-120 '>
      <CardHeader
        variant='gradient'
        color='green'
        className='mb-4 grid h-28 place-items-center py-5'
      >
        <Typography variant='h3' color='white'>
          FAQ
        </Typography>
      </CardHeader>
      <CardBody className='flex flex-col gap-4'>
        <Faq />
      </CardBody>
      <CardFooter className='pt-0 text-center'>
        Thank you for visiting
      </CardFooter>
    </Card>
  )
}
