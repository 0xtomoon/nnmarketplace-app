export const getListedNft = (data: any) => {
  return {
      type: "getListedNft",
      payload: data
  }
}

export const getNftaCollectionData = (nftaCollectionData: any) => {
  return {
      type: "getNftaCollection",
      payload: nftaCollectionData
  }
}

export const listedNfta = (data: any) => {
  return {
    type: "listedNfta",
    payload: data
  }
}

export const purchasedNfta = (data: any) => {
  return {
    type: "purchasedNfta",
    payload: data
  }
}
