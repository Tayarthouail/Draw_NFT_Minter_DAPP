import styled from "styled-components";

// Used for wrapping a page component
export const Screen = styled.div`
  background-color: var(--dark-grey);
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
  color: var(--white);
  font-size: 20px;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
`;

export const TextSubTitle = styled.p`
  color: var(--white);
  font-size: 16px;
  font-weight: 500;
`;

export const TextDescription = styled.p`
  color: var(--white);
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
    color: #fff;
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
    font-size: 19px;

    &:hover {
      background-color: #dce7ff;
      letter-spacing: 2px;
    }

`;
