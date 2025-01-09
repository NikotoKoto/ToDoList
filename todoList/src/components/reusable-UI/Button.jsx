
import styled from 'styled-components'


export default function Button({text, className, ...props}) {


  return (
    <ButtonStyled className={className} {...props}>{text}</ButtonStyled>
  )
}

const ButtonStyled = styled.div`
    padding: 15px;
    text-transform: uppercase;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    background: #592cac;
    color: white;
    border: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);

    &:active {
      transform: scale(0.9);
    }

    &:hover {
      box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1);
    }
`