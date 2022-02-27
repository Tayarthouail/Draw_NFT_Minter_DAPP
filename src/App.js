/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import { create } from "ipfs-http-client";
import SignatureCanvas from "react-signature-canvas";
import Loading from "./Loading/Loading"

export const StyledButton = styled.button`
  padding: 8px;
`;

const ipfsClient = create("https://ipfs.infura.io:5001/api/v0");

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  console.log(blockchain.account);
  const elementRef = useRef();

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [NFTS, setNFTS] = useState([]);

console.log(NFTS);
  // Input
  const name = "NFT DROP DROP";
  const description = "Mint your NFT before anyone else...";
  const ipfsBaseUrl = "https://ipfs.infura.io/ipfs/";


  useEffect(() => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  }, [blockchain.smartContract, dispatch]);

  useEffect(()=> {
    fetchMetaDataForNFTS();
  },[data.allTokens])


  /*Function to mint the NFT */
  const mint = (_uri) =>  {
    blockchain.smartContract.methods
    .mint(blockchain.account, _uri)
    .send({from : blockchain.account})
    .once("error", (err)=> {
      console.log(err)
    })
    .then((receipt)=> {
      console.log(receipt);
      setLoading(false);
      clearCanvas();
      setStatus("Successfully minting your NFT...!!");
      dispatch(fetchData(blockchain.account));
    });
  }

  /*Create metadata and path*/
  const createMetaDataAndPath = async (_name, _desc, _imgBuffer) => {
    setLoading(true);
    setStatus("Minting your NFT is processing...!!");
      try {
      // to add the image to the IPFS with CID
      const addImage = await ipfsClient.add(_imgBuffer);
      console.log(ipfsBaseUrl + addImage.path);

      const MetaDataObj = {
        name: _name,
        description: _desc,
        image: ipfsBaseUrl + addImage.path,
      };
      // upload JSON metadata to IPFS
      const addedMetaData = await ipfsClient.add(JSON.stringify(MetaDataObj));
      console.log(ipfsBaseUrl + addedMetaData.path);

      mint(ipfsBaseUrl + addedMetaData.path);

      } catch(err) {
        console.log(err)
        setLoading(false);
        setStatus("Something went wrong with the metadata...");
      }
  }

  /* Start minting process*/
  const startMintingProcess = () => {
    createMetaDataAndPath(name, description, getImageData());
  }


  /* Get the data form the painting */
  const getImageData = () => {
      const canvasEl = elementRef.current;
      const dataUrl = canvasEl.toDataURL("image/png");
      const buffer = Buffer(dataUrl.split(",")[1], "base64");
      console.log(buffer);
      return buffer;

  }


  /*Display all Minted NFT on the page */
  const fetchMetaDataForNFTS = () => {
    setNFTS([]);
      data.allTokens.forEach((nft)=> {
        fetch(nft.uri)
        .then((response)=> response.json())
        .then((metaData)=> {
          setNFTS((prevState)=> [
            ...prevState,
            {id: nft.id, metaData: metaData},
          ]);
        }).catch((err) => {
          console.log(err);
        });
      });
  }

  /* function to clear the canvas */
  const clearCanvas = () => {
    const canvasEl = elementRef.current;
    canvasEl.clear();
  } 


  return (
    <s.Screen>
      {blockchain.account === "" || blockchain.smartContract === null ? (
        <s.Container flex={1} ai={"center"} jc={"center"}>
          <s.TextTitle>Connect to the Blockchain</s.TextTitle>

          <s.SpacerSmall />

          <StyledButton
            onClick={(e) => {
              e.preventDefault();
              dispatch(connect());
            }}
          >
            CONNECT
          </StyledButton>

          <s.SpacerSmall />
          
          {blockchain.errorMsg !== "" ? (
            <s.TextDescription>{blockchain.errorMsg}</s.TextDescription>
          ) : null}
        </s.Container>
      ) : (
        <s.Container flex={1} ai={"center"} style={{ padding: 24 }}>
          <s.SpacerLarge/>
          <s.SpacerLarge/>
          <s.TextTitle style={{ textAlign: "center" }}>
            Draw and mint your NFT NOW !
          </s.TextTitle>
          <s.SpacerLarge/>
          
          {status !== "" ? (
          <>
          <s.TextTitle style={{ textAlign: "center" }}>
            {status}
          </s.TextTitle>
          <s.SpacerLarge/>
          </>
          ) : null}
          

          {loading ? (
          <>
          <Loading/>
          <s.SpacerLarge/>
          </>
          ) : null}
          
          <s.Container fd={"row"} jc={"center"}>

          <StyledButton
          onClick={(e)=> {
            e.preventDefault();
            startMintingProcess();
          }}>
            Mint
          </StyledButton>

          <s.SpacerSmall/>

          <StyledButton
          onClick={(e)=> {
            e.preventDefault();
            clearCanvas();
          }}>
            Clear
          </StyledButton>

          </s.Container>
          

          <s.SpacerLarge/>

          <SignatureCanvas
          backgroundColor={"#3271bf"}
          canvasProps={{width:400, height:350}}
          ref= {elementRef}
          />
         <s.SpacerLarge /> 

          
         {data.loading ?
         (<> <Loading/> <s.SpacerLarge/> </>)
          :
          (
          NFTS.map((nft, index)=> {
            return (
              <s.Container key={index}  style={{padding:16}}>
                <s.TextTitle>{nft.metaData.name}</s.TextTitle>
                <img 
                alt={nft.metaData.name}
                src={nft.metaData.image} 
                width={250}
                />
              </s.Container>
            )
           })
          )}    
        </s.Container>
      )}
    </s.Screen>
  );
}

export default App;
