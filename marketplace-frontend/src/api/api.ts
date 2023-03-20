import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function getListedNfts() {
  return axios.get(`${API_URL}/nfta/list`).then((response) => response.data);
}

export function getNFTACollections(address: string) {
  return axios.get(`${API_URL}/nfta/my_collection`, {
    params:{
      address: address
    }
  }).then((response) => response.data);
}

export function listNfta(id: number, price: number) {
  return axios.post(`${API_URL}/nfta/list`, {
    id: id,
    price: price
  });
}

export function purchaseNfta(id: number, address: string) {
  return axios.post(`${API_URL}/nfta/purchase`, {
    id: id,
    address: address
  });
}
