

import { FormEvent } from 'react'

import { useEffect, useState } from 'react'
import { ConnectWallet, useAddress, useContract } from '@thirdweb-dev/react'

const Second = () => {

  

    const [total, setTotal] = useState('')



const [ownedNFTNames, setOwnedNFTNames] = useState<string[]>([]);

 const address = useAddress();
 
  

  
  
 const { contract: firstContract } = useContract(
        "0x62A4270F8EB826428B6afD158d647e56558AAf30", 
        "signature-drop"
    );

    const { contract: secondContract } = useContract(
        "0xE62d775E3Cc91659034dFC3b09a46259D6942c2c", 
  "signature-drop"
    );
    
  useEffect(() => {
    if (!address) {
      return
    }

    const checkBalance = async () => {
      try {
        if (contract) {
      const nfts = await contract.getOwned(address);
          setHasClaimedNFT(nfts?.length > 0);
          
          setTotal(nfts.length.toString());
          
    }
      } catch (error) {
        setHasClaimedNFT(false)
        console.error("Failed to get NFTS", error)
      }
      }
    checkBalance()
  }, [address, contract])
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
  
  const mintNft = async () => {
    try {
      if (contract) {
        setIsClaiming(true)
        await contract.claim(1)
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
      nftNames: ownedNFTNames
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
  }
  useEffect(() => {
    if (!address) {
      return;
    }

    const getOwnedNFTNames = async () => {
      try {
        if (contract) {
          const nfts = await contract.getOwned(address);
          const ownedNFTNames = nfts.map((nft) => nft.metadata.name);
          const ownedNFTNamesFiltered = ownedNFTNames.filter((nft) => nft !== undefined) as string[];
setOwnedNFTNames(ownedNFTNamesFiltered);
          
        }
      } catch (error) {
        console.error("Failed to get owned NFT names", error);
      }
    };

    getOwnedNFTNames();
  }, [address, contract]);
  useEffect(() => {
    if (address) {
      setWallet(address);
    }
}, [address]);
    return ()
    export default Second