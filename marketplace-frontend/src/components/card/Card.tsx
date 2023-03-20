import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import Modal from '../modal/Modal';

interface CardData {
  id: number;
  image: string;
  listed: boolean;
  price: number;
  owner: string;
}

interface CardProps {
  data: CardData;
  onBuy?: (id: number, price: number) => void;
  onList?: (id: number) => void;
  forList: boolean;
}

export default function Card(props: CardProps) {
  const { address, isConnected } = useAccount()
  const {data} = props;

  const onList = () => {
    
  }

  const onUpgrade = (id: number) => {
    
  }
  
  return (
    <div key={data.id} className="">
      <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 hover:opacity-75 lg:aspect-none lg:h-80">
        <img
          src={data.image}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <h3 className="text-sm text-gray-700">
          NFTA #{data.id}
        </h3>
        <h3 className="text-sm text-gray-700">
          Price: {data.price}MKP
        </h3>
      </div>
      {
        address ?
          <div className="mt-4">
            {
              props.forList ? 
              <div onClick={() => props.onBuy? props.onBuy(data.id, data.price) : onList()} className="rounded-md bg-blue-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white text-center hover:bg-blue-500 cursor-pointer">Purchase</div>
                :
                (data.listed) ? 
                  <div className="border-2 border-blue-600 rounded-md py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-blue-600 text-center hover:opacity-75">Listed</div>
                  :
                  <div className="flex justify-between">
                    <button onClick={() => props.onList? props.onList(data.id) : onList()} className="w-16 rounded-md bg-blue-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white text-center hover:bg-blue-500 cursor-pointer">List</button>
                    <button onClick={() => onUpgrade(data.id)} className="w-20 rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white text-center hover:bg-indigo-500 cursor-pointer">Upgrade</button>
                  </div>
            }
          </div>
          :
          <></>
        }
    </div>
  );
}