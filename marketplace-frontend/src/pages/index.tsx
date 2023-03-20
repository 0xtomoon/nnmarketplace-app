import styles from '../styles/page.module.css'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import React, { useEffect, useState } from 'react';
import { getListedNfts, getNFTACollections, listNfta, purchaseNfta } from '@/api/api';
import { useAccount, useSigner } from 'wagmi';
import { useDispatch, useSelector } from 'react-redux';
import { parseUnits } from 'ethers/lib/utils.js';
import Card from '@/components/card/Card';
import Modal from '@/components/modal/Modal';
import { getMarketplaceProviderContract, getMkpProviderContract, getNftaProviderContract } from "@/utils/contract";
import { getListedNft, getNftaCollectionData, listedNfta, purchasedNfta } from "../state/actions/nftaActions";
import { MARKETPLACE_ADDRESS } from "@/utils/address";

export default function Home() {
  const { address, isConnected } = useAccount()
  const { data: signerWagmi } = useSigner()
  const { listData, collectionData } = useSelector((state: any) => state.nfta)
  const dispatch = useDispatch()
  const [ isOpen, setIsOpen ] = useState(false)
  const [ nftId, setNftId ] = useState(0)

  const fetchListedNfts = async() => {
    await getListedNfts()
      .then((res) => {
        dispatch(getListedNft(res))
      })
  }

  const fetchNFTACollections = async(addr: any) => {
    await getNFTACollections(addr)
      .then((res) => {
        dispatch(getNftaCollectionData(res))
      })
  }

  useEffect(() => {
    fetchListedNfts()
    fetchNFTACollections(address? address.toString(): "")
  }, [isConnected, address])

  const onList = (id: number) => {
    setNftId(id)
    setIsOpen(true)
  }

  const onClose = () => {
    setIsOpen(false)
  }

  const onListConfirm = async (id: number, price: number) => {
    const marketplaceContract = await getMarketplaceProviderContract(signerWagmi)
    const nftaContract = await getNftaProviderContract(signerWagmi)
    try {
      const tx = await marketplaceContract.listNFT(id, parseUnits(price.toString()))
      await tx.wait()

      const tx1 = await nftaContract.approve(MARKETPLACE_ADDRESS, id)
      await tx1.wait()
      listNfta(id, price).then((res) => {
        dispatch(listedNfta(res.data))
      })
    } catch (e) {}
    onClose();
  }

  const onBuy = async (id: number, price: number) => {
    const marketplaceContract = await getMarketplaceProviderContract(signerWagmi)
    const mkpContract = await getMkpProviderContract(signerWagmi)
    try {
      const tx = await mkpContract.approve(MARKETPLACE_ADDRESS, parseUnits(price.toString()))
      await tx.wait()

      const tx1 = await marketplaceContract.purchaseNFT(id)
      await tx1.wait()
      purchaseNfta(id, address? address.toString() : "").then((res) => {
        dispatch(purchasedNfta(res.data))
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <main className={styles.main}>
      <div>

        <div className="float-right">
            <ConnectButton/>
        </div>

        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Listed NFTs</h2>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {
              (listData) ?
                listData.map((item: any) => (
                  item.owner.toLowerCase() != address?.toString().toLowerCase() ?
                    <Card
                      key={item.id}
                      data={item}
                      onBuy={onBuy}
                      forList={true}
                    ></Card>
                    :
                    <div key={item.id}></div>
                  ))
                :
                <></>
            }
          </div>
        </div>

        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">My Collections</h2>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {
              (collectionData != undefined) ?
              collectionData.map((item: any) => (
                  <Card
                    key={item.id}
                    data={item}
                    onList={onList}
                    forList={false}
                  ></Card>
                ))
                :
                <></>
            }
          </div>
        </div>
      </div>
      <Modal
        id={nftId}
        title={"List"}
        onConfirm={onListConfirm}
        onDiscard={onClose}
        onClose={onClose}
        buttons={[
          { role: "confirm", toClose: false, classes: "bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-200", label: "List" },
          { role: "close", toClose: true, classes: "bg-zinc-500/20 px-4 py-2 rounded-lg hover:bg-zinc-500/30 transition-all duration-200", label: "Close" }
        ]}
        isOpen={isOpen}
      >
      </Modal>
    </main>
  )
} 
