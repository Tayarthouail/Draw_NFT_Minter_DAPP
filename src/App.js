/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import { create } from "ipfs-http-client";
import SignatureCanvas from "react-signature-canvas";
import Loading from "./Loading/Loading";
import Web3 from "web3";
import NFTCardList from "../src/components/NFTCardList";


/* config the desire network from truffle
after deploying the contract to the network I need to change the network ID
from the ethereum.window config */ 


const ipfsClient = create("https://ipfs.infura.io:5001/api/v0");

let web3 = new Web3(window.ethereum);

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const elementRef = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [NFTS, setNFTS] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const ipfsBaseUrl = "https://ipfs.infura.io/ipfs/";


  useEffect(() => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  }, [blockchain.smartContract, dispatch]);

  useEffect(()=> {
    fetchMetaDataForNFTS();
  },[data.allTokens])


  // set Alert message
  const showMessage = (msg) => {
    return setStatus(msg);
  }

  /*Function to mint the NFT */
  const mint = (_uri) =>  {
    blockchain.smartContract.methods
    .mint(blockchain.account, _uri)
    .send({from : blockchain.account})
    .once("error", (err)=> {
      console.log(err)
      setLoading(false);
      showMessage("MetaMask : transaction was rejected!");
    })
    .then((receipt)=> {
      console.log(receipt);
      setLoading(false);
      clearCanvas();
      showMessage("Successfully minting your NFT...!");
      setName("");
      setDescription("");
      setPrice("");
      dispatch(fetchData(blockchain.account));
    });
  }

  /*Create metadata and path*/
  const createMetaDataAndPath = async (_name, _desc, _price, _imgBuffer) => {
      try { 
      if(!_name || !_desc|| !_price) {
        showMessage("Please enter a description to your NFT before Mint it ");
      }

      // to add the image to the IPFS with CID
      const addImage = await ipfsClient.add(_imgBuffer);
      console.log(ipfsBaseUrl + addImage.path);
      
      const MetaDataObj = {
        name: _name,
        description: _desc,
        price: web3.utils.toWei(_price, "ether"),
        image: ipfsBaseUrl + addImage.path,
      };

      // upload JSON metadata to IPFS
      const addedMetaData = await ipfsClient.add(JSON.stringify(MetaDataObj));
      console.log(ipfsBaseUrl + addedMetaData.path);
      mint(ipfsBaseUrl + addedMetaData.path);

      setLoading(true);
      showMessage("Minting your NFT is processing...!!");

      } catch(err) {
        console.log(err)
        setLoading(false);
        // showMessage("Something went wrong with the metadata...");
      }
  }

  /* Start minting process*/
  const startMintingProcess = () => {
    createMetaDataAndPath(name, description,price, getImageData());
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
    <s.Main>
      {blockchain.account === "" || blockchain.smartContract === null ? (
        <s.Container flex={1} ai={"center"} jc={"center"}>
          <s.TextTitle >Connect to Metamask</s.TextTitle>

          <s.SpacerSmall />

          <s.Button
            onClick={(e) => {
              e.preventDefault();
              dispatch(connect());
            }}>
          
            CONNECT
          </s.Button>

          <s.SpacerSmall />
          
          {blockchain.errorMsg !== "" ? (
            <s.TextDescription>{blockchain.errorMsg}</s.TextDescription>
          ) : null}
        </s.Container>
      ) : (
        <s.Container flex={1} ai={"center"} style={{ padding: 24 }}>
          <s.SpacerLarge/>
          <s.SpacerLarge/>
          <s.TextTitle bigTitle Margin>
            Draw and mint your own NFT !
          </s.TextTitle>
          <s.SpacerLarge/>

          <s.Form>
            <s.FromControl>
            <s.Label>Name</s.Label>
              <s.Input 
              type="text"
              value={name}
              placeholder="NFT's name"
              onChange={(e)=> setName(e.target.value)}/>
            </s.FromControl>

          <s.FromControl>
            <s.Label>Description</s.Label>
            <s.Input
              type="text"
              value={description}
              placeholder="NFT's description"
              onChange={(e)=> setDescription(e.target.value)}/>
          </s.FromControl>

          <s.FromControl>
          <s.Label>Price/ETH</s.Label>
          <s.Input
            type="text"
            value={price}
            placeholder="NFT's price"
            onChange={(e)=> setPrice(e.target.value)}/>
          </s.FromControl>  

          </s.Form>
          
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

          <s.Button
          onClick={(e)=> {
            e.preventDefault();
            startMintingProcess();
          }}>
            Mint
          </s.Button>

          <s.SpacerSmall/>

          <s.Button
          onClick={(e)=> {
            e.preventDefault();
            clearCanvas();
          }}>
            Clear
          </s.Button>

          </s.Container>
          

          <s.SpacerLarge/>

          <s.canvasContainer>
          <SignatureCanvas
          backgroundColor={"#EDE9E2"}
          canvasProps={{className: "canvasStyle"}}
          ref= {elementRef}
          />
          </s.canvasContainer>
         <s.SpacerLarge /> 
        
        {data.loading ? 
         <> <Loading/> <s.SpacerLarge/> </>
         :
         (
          <s.mainGridContainer>
          <s.gridContainer>
            <NFTCardList nfts={NFTS} />
          </s.gridContainer>
        </s.mainGridContainer>
         )
        }
      
           
        </s.Container>
      )}
    </s.Main>
  );
}

export default App;
