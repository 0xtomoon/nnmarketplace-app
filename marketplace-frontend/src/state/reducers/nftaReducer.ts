const initialState = {
  listData: [],
  collectionData: []
}

const nftaReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "getListedNft":
      return {
        ... state,
        listData: action.payload
      }

    case "getNftaCollection":
      return {
        ... state,
        collectionData: action.payload
      }
    
    case "listedNfta":
      let arr: any = state.collectionData;
      const index = arr.findIndex(((obj: any) => obj.id === action.payload.id));
      arr[index] = action.payload;
      return {
        ... state,
        collectionData: arr
      }

    case "purchasedNfta":
      const list = state.listData.filter((obj: any) => obj.id !== action.payload.id);
      
      return {
        ... state,
        listData: list,
        collectionData: [...state.collectionData, action.payload]
      }

    default:
      return state
  }
}

export default nftaReducer;