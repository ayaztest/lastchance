import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { FormEvent } from 'react'


import  { useEffect, useState } from "react";
  import { 
  ConnectWallet,
  useAddress,
  useContract,
  
} from "@thirdweb-dev/react";

import  Card from "../componants/Card"



const Home: NextPage = () => {

    const [isKycAsBusiness, setIsKycAsBusiness] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
    const [total, setTotal] = useState('')
  const [wallet, setWallet] = useState('')
  const [selectedOption, setSelectedOption] = useState('no');
const [option, setOption] = useState(selectedOption)
  const [streetAddress, setStreetAddress] = useState('')
  const [ownedNFTNamestwo, setOwnedNFTNamestwo] = useState<string[]>([]);
  const [ownedNFTNames, setOwnedNFTNames] = useState<string[]>([]);
const [totaltwo, setTotaltwo] = useState('')
 const address = useAddress();
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false)
  const [isClaiming, setIsClaiming] = useState(false)
  
const [showPopup, setShowPopup] = useState(false)
  
  
  const { contract: firstContract } = useContract(
        "0xCe8A6E03e6996f259191a18c4E2Aa398319b04E9", 
        "nft-drop"
    );

    
  useEffect(() => {
    if (!address) {
      return
    }

    const checkBalance = async () => {
      try {
        if ( firstContract) {
      const nfts = await  firstContract.getOwned(address);
          setHasClaimedNFT(nfts?.length > 0);
          
          setTotal(nfts.length.toString());
          
        }
             
      } catch (error) {
        setHasClaimedNFT(false)
        console.error("Failed to get NFTS", error)
      }
      }
    checkBalance()
  }, [address, firstContract])
 type NFT = {
  metadata: {
    name: string
  }
}

const getNFTNames = (nfts: NFT[]) => {
  const ownedNFTNames = nfts.map(nft => nft.metadata.name)
    .filter(name => typeof name === 'string') as string[];
  setOwnedNFTNames(ownedNFTNames);
};
  const getNFTNamestwo = (nfts: NFT[]) => {
  const ownedNFTNamestwo = nfts.map(nft => nft.metadata.name)
    .filter(name => typeof name === 'string') as string[];
  setOwnedNFTNamestwo(ownedNFTNamestwo);
};
  const mintNft = async () => {
    try {
      if (firstContract) {
        setIsClaiming(true)
        await firstContract.claim(1)
        setHasClaimedNFT(true)
      }
    } catch (error) {
      setHasClaimedNFT(false)
      console.error("failed to mint nft", error)
    }
    finally {
      setIsClaiming(false)
    }
}
 

 
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let form = {
      firstname,
      lastname,
      email,
      country,
      wallet,
      total,
      selectedOption,
      streetAddress,
      nftNames: ownedNFTNames,
      totaltwo,
      nftNamestwo: ownedNFTNamestwo,
      businessName
    
    }

    const rawResponse = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
    const content = await rawResponse.json()

    // print to screen
    setShowPopup(true)
    
    // Reset the form fields
    setWallet('')
    setCountry('')
    setFirstname('')
    setLastname('')
    setEmail('')
    setTotal('')
    setSelectedOption('')
    setStreetAddress('')
    setOwnedNFTNames([])
    setTotaltwo('')
    setBusinessName('')
    
  }
  useEffect(() => {
    if (!address) {
      return;
    }

    const getOwnedNFTNames = async () => {
      try {
        if (firstContract) {
          const nfts = await firstContract.getOwned(address);
          const ownedNFTNames = nfts.map((nft) => nft.metadata.name);
          const ownedNFTNamesFiltered = ownedNFTNames.filter((nft) => nft !== undefined) as string[];
setOwnedNFTNames(ownedNFTNamesFiltered);
          
        }
        
      } catch (error) {
        console.error("Failed to get owned NFT names", error);
      }
    };

    getOwnedNFTNames();
  }, [address, firstContract]);
  useEffect(() => {
    if (address) {
      setWallet(address);
    }
}, [address]);
 
  

  return (<div className='overflow-hidden'> 
        <div>
           
 
       
        </div>
    <div className='min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 bg-cover'
  style={{ backgroundImage: "url('https://unsplash.com/photos/Uj3S6JiXxaA')" }}>
    <div className='relative py-3 sm:max-w-xl sm:mx-auto mb-14'>
     <ConnectWallet />  {!hasClaimedNFT ? (
  <main className='relative mt-4 px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 bg-clip-padding bg-opacity-60 border border-gray-200' >
   <div>
          <img src="https://wolfer.finance/wp-content/uploads/2022/04/Logo-1.jpg" className="h-16 sm:h-24 rounded-md mx-auto" />
        </div>   <div className='max-w-5xl mx-auto py-2'>
        <form className='py-4 space-y-4' onSubmit={handleSubmit}>
          <div className='flex items-center justify-center'>
            <label htmlFor='firstname' className='sr-only'>
              First Name
            </label>
            <input
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              type='text'
              name='firstname'
              id='firstname'
              className='shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-md border-gray-300 rounded-md'
              placeholder='First Name' required
            />
          </div>
          <div className='flex items-center justify-center'>
            <label htmlFor='lastname' className='sr-only'>
              Last Name
            </label>
            <input
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              type='text'
              name='lastname'
              id='lastname'
              className='shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-md border-gray-300 rounded-md'
              placeholder='Last Name' required
            />
          </div>
          <div className='flex items-center justify-center'>
            <label htmlFor='email' className='sr-only'>
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              name='email'
              id='email'
              className='shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-md border-gray-300 rounded-md'
              placeholder='Your Email' required
            />
          </div>
          <div className='flex items-center justify-center'>
            <label htmlFor='streetAddress' className='sr-only'>
          Your Address (optional)
            </label>
            <input
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              type='text'
              name='streetAddress'
              id='streetAddress'
              className='shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-md border-gray-300 rounded-md'
              placeholder='Your Address (optional)' 
            />
                </div>
                <div className='flex items-center justify-center'>
            <label htmlFor='country' className='sr-only'>
              country
            </label>
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              type='text'
              name='country'
              id='country'
              className='shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-md border-gray-300 rounded-md'
              placeholder='Your Country' 
            />
                </div>
                   <div className="flex flex-col items-center justify-center">
                  <label htmlFor="nft-count" className="text-base font-medium text-left w-full mb-2">How many Wolfer Finance NFTs do you have in other wallets
                    that are different from the one you connected to the site?:</label>
      <input
        type="text"
        id="nft-count"
        name="nft-count"
        value={totaltwo}
        onChange={(e) => setTotaltwo(e.target.value)}
        className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-md border-gray-300 rounded-md"
        required
      />
    </div><div className="flex hidden flex-col items-center justify-center">
  <label htmlFor="nft-names" className="text-base font-medium text-left w-full mb-2">NFT Names:</label>
  <textarea
    id="nft-names"
    name="nft-names"
    value={ownedNFTNames.join(', ')}
    onChange={(e) => setOwnedNFTNames(e.target.value.split(','))}
    className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-96 sm:text-md border-gray-300 rounded-md"
    readOnly required
  />
</div>
          <div className="flex flex-col mt-5">
    <div className="flex-row pb-3 border-b border-dotted border-gray-500 ">
      <input
        type="radio"
        id="option1"
        name="options"
        value="yes"
        checked={selectedOption === 'yes'}
        onChange={(e) => setSelectedOption(e.target.value)}
      />
      <label htmlFor="option1" className="text-md cursor-pointer font-medium ml-5">
        Yes, I own both Wolfer Finance and PreSend NFTs.
      </label>
    </div>
    <div className="flex-row pt-3">
      <input
        type="radio"
        id="option2"
        name="options"
        value="no"
        checked={selectedOption === 'no'}
        onChange={(e) => setSelectedOption(e.target.value)}
      />
      <label htmlFor="option2" className="text-md font-medium cursor-pointer ml-5">
        No, I do not own both Wolfer Finance and PreSend NFTs.
      </label>
    </div>
  </div>  <div className='flex hidden items-center justify-center flex-col'>
          
                  
            <label htmlFor='wallet' className="text-base font-medium text-left w-full mb-2">Your Wallet Address:
            </label>
            <input
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              type='tel'
              name='wallet'
              id='wallet'
              className='shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-96 sm:text-md border-gray-300 rounded-md'
             placeholder='Your Wallet'  readOnly 
            />
               
                </div> <div className="flex flex-col items-center justify-center border-t  border-gray-500">
                  <label htmlFor="nft-count" className="pt-2 text-base font-semibold text-left w-full mb-2">Total NFTs Owned
                    <span className='text-sm font-normal'> (This is AUTO-POPULATED FIELD & NON-EDITABLE, You Can Add More NFTs in The Field Above This), Please Connect Your Other
                    Wolfer Finance NFT Wallets To Verify All Other TWF NFTs You Own:</span></label>
      <input
        type="text"
        id="nft-count"
        name="nft-count"
        value={total}
        onChange={(e) => setTotal(e.target.value)}
        className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-md border-gray-300 rounded-md"
        readOnly required
      />
    </div>  <div>
        <input
          type="checkbox"
          id="businessCheckbox"
          checked={isKycAsBusiness}
                    onChange={() => setIsKycAsBusiness(!isKycAsBusiness)}
                     className="form-checkbox mr-3"
        />
        <label htmlFor="businessCheckbox" className='text-base cursor-pointer'>
          Are you KYCing as a business? (NOTE: Every 20% OR LARGER owner of the business must still kyc as an individual, so you will still have to go through the individual - personal - kyc process)
        </label>
      </div>
      {isKycAsBusiness && (
        <div>
          <label htmlFor="businessNameInput">What is the legal name of your business?</label>
          <input
            type="text"
            id="businessNameInput"
            value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="shadow-sm focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-2 px-4 block w-full appearance-none leading-normal"
          />
        </div>
      )}
                
          <div className='flex items-center justify-center'>
            <button
              type='submit'
              className='flex items-center justify-center text-sm w-full rounded-md shadow py-3 px-2 text-white bg-indigo-600'
            >
              Submit
            </button>
                </div><div className='flex  '>
        <p className='text-xs text-red-600 font-semibold text-justify  pt-5'>   Please check the FAQ section that refers to countries of residency. If you live in any of those countries or regions, your kyc process will start on the 15th of February and you need to reach out directly to bryan.jorolan@tokenoftrust.com and indicate to him that you are in one of those affected countries, because that is a separate kyc
                process than all other regions and countries and is not supported until February 15th or after.</p>     
       </div> </form>
 
         
          
       
        {showPopup && (
          <div className='fixed z-50 bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center'>
  <div className='fixed inset-0 transition-opacity'>
    <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
  </div>
  <div className='bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-xl sm:w-full'>
    <div>
      <div className='mb-4'>
        <div className='text-2xl font-bold text-center text-cyan-900'>Success</div>
        <div className='mt-2 text-base leading-6 text-gray-500'>
                          <p className='text-center text-lg font-semibold text-cyan-800'>Thank you for submitting your questionnaire! Please click the green button below to finish your KYC process via the Token of Trust platform, and please also check/monitor the email you provided
                            in the form for any additional information that may
                            come in the next few days/weeks.</p>
        </div>
      </div>
      <div className='flex flex-col justify-around mt-5 sm:mt-6'>
        <a href='https://app.tokenoftrust.com/com/wolfer.finance' target='_blank' rel='noopener noreferrer'>
          <button
            type='button'
            className='inline-flex mb-4 justify-center w-full rounded-md border border-transparent px-4 py-2  bg-green-500 text-md leading-6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5'
          >
           Wolfer Finance KYC/AML Link
          </button>
        </a> 
  <span className='  rounded-md shadow-sm w-full'>
    <a href='https://app.tokenoftrust.com/com/kyc.wolfer.finance' target='_blank' rel='noopener noreferrer'>
      <button
        type='button'
        className='inline-flex justify-center items-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-md leading-6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5'
      >
        PreSend & Wolfer Finance Dual Holder KYC/AML Link
      </button>
    </a>
  </span>

      </div>
      <button
        type='button'
        className='absolute top-0 right-0 p-2 text-gray-500 hover:text-white focus:outline-none focus:text-white transition ease-in-out duration-150'
        onClick={() => setShowPopup(false)}
      >
        ×
      </button>
    </div>
  </div>
</div>

        )}
      </div>

     
    </main> ):(<p className='mt-5 font-semibold '>you dont have our membership sir/madam</p>)}</div>
    <div className='  flex object-center items-center'>
      <div className='max-w-4xl mx-auto  flex flex-col p-6'><Card /></div>  </div></div> </div> 
  )

}
export default Home
