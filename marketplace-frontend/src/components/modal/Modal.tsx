import React, { ReactNode, useState } from "react";

interface ModalButton {
  role: string;
  onClick?: () => void;
  toClose: boolean;
  classes?: string;
  label: string;
}

interface ModalProps {
  id: number;
  title: string;
  content?: string;
  buttons: ModalButton[];
  classes?: string;
  onDiscard: () => void;
  onConfirm: (id: number, price: number) => void;
  onClose: () => void;
  children?: ReactNode;
  isOpen: boolean;
}

export default function Modal(props: ModalProps) {
  const [price, setPrice] = useState(1)
  
  const onClose = () => {
    setPrice(0)
    props.onClose()
  }
  return <>
    {props.isOpen ? (
      <>
        <div style={{ zIndex: '1' }} onClick={() => onClose()} className="w-full h-full left-0 top-0 bg-black/50 fixed" />
        <div style={{ zIndex: '2' }} className="flex justify-center items-center h-full w-full fixed">
          <div className={`max-w-[28rem] w-full ${props.classes ? props.classes : 'p-4 bg-white rounded-lg'}`}>
            <div className="w-full flex justify-between items-center mb-6">
              <p className="font-medium text-lg">{props.title}</p>
              <div onClick={() => onClose()} className="w-8 h-8 flex justify-center items-center rounded-lg transition-all duration-200 cursor-pointer hover:bg-zinc-500/20">
                <svg width="24px" height="24px" viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <path className="clr-i-outline clr-i-outline-path-1" d="M19.41,18l8.29-8.29a1,1,0,0,0-1.41-1.41L18,16.59,9.71,8.29A1,1,0,0,0,8.29,9.71L16.59,18,8.29,26.29a1,1,0,1,0,1.41,1.41L18,19.41l8.29,8.29a1,1,0,0,0,1.41-1.41Z" />
                    <rect x={0} y={0} width={36} height={36} fillOpacity={0} />
                </svg>
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price (MKP)</label>
              <input 
                type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
                value={price? price: ""}
                onChange={e => setPrice(parseInt(e.target.value))}
              />
            </div>
            <div className="mt-6 flex justify-end items-center gap-2">
              {props.buttons.map((button, index) => (
                <button 
                  onClick={() => {
                      if(button.role === "discard") {
                        props.onDiscard();
                      }
                      if(button.role === "confirm") {
                        props.onConfirm(props.id, price);
                      }
                      if(button.toClose) {
                        onClose();
                      }
                  }}
                  key={index} 
                  className={button.classes}
                >
                  {button.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </>
    ): null}
  </>
}
