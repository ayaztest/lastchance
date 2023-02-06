import { useState, Fragment } from 'react'
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react'

export default function Faq() {
  const [open, setOpen] = useState(0)

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value)
  }

  const customAnimation = {
    mount: { scale: 1 },
    unmount: { scale: 0.9 },
  }

  return (
    <Fragment>
      <Accordion open={open === 1} animate={customAnimation}>
        <AccordionHeader onClick={() => handleOpen(1)}>
          Why am I being asked to complete KYC & AML?
        </AccordionHeader>
        <AccordionBody>
          In order to comply with U.S. securities laws and Treasury regulations,
          all NFT purchasers must provide Know Your Customer (KYC) information
          and pass Anti-Money Laundering (AML) checks.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} animate={customAnimation}>
        <AccordionHeader onClick={() => handleOpen(2)}>
          What is the timeframe to complete my KYC & AML check?
        </AccordionHeader>
        <AccordionBody>30-days to start the process.</AccordionBody>
      </Accordion>
      <Accordion open={open === 3} animate={customAnimation}>
        <AccordionHeader onClick={() => handleOpen(3)}>
          What happens if I don't complete KYC & AML?
        </AccordionHeader>
        <AccordionBody>
          If you do not complete the KYC and AML process you will be prohibited
          from any form of ownership, rights, privileges, and associated
          interests in the project for which you hold the NFT(s).
        </AccordionBody>
      </Accordion>

      <Accordion open={open === 5} animate={customAnimation}>
        <AccordionHeader onClick={() => handleOpen(5)}>
          What is involved with an accredited investor check? Does it apply to
          me?
        </AccordionHeader>
        <AccordionBody>
          If you are an accredited investor, please email
          Jonathan@DunsmoorLaw.com to complete the accredited investor process.
          An accredited investor under U.S. law is found here: link
          (https://www.sec.gov/education/capitalraising/building-blocks/accredited-investor)
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 6} animate={customAnimation}>
        <AccordionHeader className='text-left' onClick={() => handleOpen(6)}>
          What are the countries of residence that are flagged during a KYC &
          AML check?
        </AccordionHeader>
        <AccordionBody>
          Afghanistan Balkan Peninsula Belarus Burma Central African Republic
          Cuba China (Specific to Hong Kong) Darfur Democratic Republic of the
          Congo Ethiopia Iran Iraq Lebanon Libya Mali Nicaragua North Korea
          Russia Somalia Sudan South Sudan Syria Ukraine Venezuela Yemen
          Zimbabwe
        </AccordionBody>
      </Accordion>
    </Fragment>
  )
}
