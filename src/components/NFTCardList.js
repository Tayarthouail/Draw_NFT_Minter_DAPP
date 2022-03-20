import React from "react";
import Web3 from "web3";
import * as s from "../styles/globalStyles";

let web3 = new Web3(window.ethereum);

const NFTCardList = ({nfts}) => {
    return (
        nfts.map((nft) => {
            return (
                <s.nftCard key={nft.id}  style={{padding:16}}>
                <div>
                    <s.NFtImage 
                    alt={nft.metaData.name}
                    src={nft.metaData.image} 
                    />
                </div>
               <s.bodyCard>
                <s.NFtTitle>{nft.metaData.name}</s.NFtTitle>
                <s.NFtDesc>{nft.metaData.description}</s.NFtDesc>
                <s.NFtTitle itSized>Price : <s.NFtPrice>{web3.utils.fromWei(nft.metaData.price, "ether")}/Matic</s.NFtPrice></s.NFtTitle>
                </s.bodyCard>
                
            </s.nftCard>
            )
        })
    )
}

export default NFTCardList;