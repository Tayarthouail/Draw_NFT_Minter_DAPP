import styled from "styled-components";

// Used for wrapping a page component
export const Main = styled.div`
  background-color: #B9A49D;
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;



// Used for providing space between components
export const SpacerXSmall = styled.div`
  height: 8px;
  width: 8px;
`;

// Used for providing space between components
export const SpacerSmall = styled.div`
  height: 16px;
  width: 16px;
`;

// Used for providing space between components
export const SpacerMedium = styled.div`
  height: 24px;
  width: 24px;
`;

// Used for providing space between components
export const SpacerLarge = styled.div`
  height: 32px;
  width: 32px;
`;

// Used for providing a wrapper around a component
export const Container = styled.div`
  display: flex;
  flex: ${({ flex }) => (flex ? flex : 0)};
  flex-direction: ${({ fd }) => (fd ? fd : "column")};
  justify-content: ${({ jc }) => (jc ? jc : "flex-start")};
  align-items: ${({ ai }) => (ai ? ai : "flex-start")};
  background-color: ${({ test }) => (test ? "pink" : "none")};
  width: 100%;
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
`;


// Form styling
export const TextTitle = styled.p`
  color: #201817;
  font-size: ${props => props.bigTitle ? "90px" : "30px"};
  line-height: ${props => props.LineHight ? "50px" : "0px"}
  font-weight: 500;
  font-family: "Bai Jamjuree", sans-serif;
  text-align: center;
  margin-bottom: ${props => props.Margin ? "20px" : "0"};
`;

export const TextSubTitle = styled.p`
  color: #201817;
  font-size: 16px;
  font-weight: 500;
`;

export const TextDescription = styled.p`
  color: #201817;
  font-size: 14px;
  font-weight: 600;
`;

export const StyledClickable = styled.div`
  :active {
    opacity: 0.6;
  }
`;

export const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 700px;
`;

export const FromControl = styled.div`
    width: 100%;
    margin: 0px 0px 30px 0px;
`;

export const Input = styled.input`
    width: 100%;
    padding: 16px;
    font-weight: 400;
    color: #000;
    border: 2px solid teal;
    letter-spacing: 1px;
    font-size: 15px;
    font-weight: 500;
    margin-top: 10px;
    border:none;

}
`;

export const Label = styled.label`
    font-size: 18px;
    font-family: "poppins", sans-serif;
    color: #201817;
    letter-spacing: 1px;
`;

// button 
export const Button = styled.button`
    height: 50px;
    width: 175px;
    background-color: #fff;
    border: none;
    color: #000;
    letter-spacing: 1px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease-in-out;
    font-weight: 500;
    font-size: 16px;
    margin-top: 10px;

    &:hover {
      background-color: #dce7ff;
      letter-spacing: 2px;
    }

`;

export const mainGridContainer = styled.section`
    position: relative;
    margin-top: 60px;
    width: 100%;
`;


export const gridContainer = styled.div`
     display: grid;
     justify-content: center;
     grid-template-columns:repeat(auto-fill, 380px);
     grid-gap : 40px;
     margin: auto;
`;


export const nftCard = styled.div`
  font-family: "Bai Jamjuree", sans-serif;
  position: relative;
  width: 380px;
  margin-bottom: 2rem;
  cursor: pointer;
  background-color: #EDE9E2;
  color: #030303;
  text-align: center;
  cursor: pointer;
  letter-spacing: 0.5px;
  border-radius: 10px;

`;


export const NFtImage = styled.img`
    width: 100%;
    height: 300px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 10px;

`;

export const NFtTitle = styled.h3`
  margin-top: 20px;
  font-size: ${props => props.itSized ? "18px" : "26px"};
  font-weight: ${props => props.itWeight ? "700" : "600"};
`;

export const NFtDesc = styled.p`
    padding-top : 16px;
    font-size: 16px;
    letter-spacing: 1px;
    line-height: 20px;  
`;

export const bodyCard = styled.div`
   padding: 10px 20px 20px 20px;
`;


export const NFtPrice = styled.span`
    font-weight:500;
`;
