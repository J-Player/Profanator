import styled from "styled-components"
import { Color } from "../themes"

type Props = {
  className?: string
}

const Footer = ({className} : Props) => {
  return (
    <footer className={className}>
      <small>&copy; {new Date().getFullYear()} Profanator, All Rights Reserved. &reg;</small>
    </footer>
  )
}

const StyledFooter = styled(Footer)`
  background-color: ${Color.DARK_GRAY};
  color: ${Color.WHITE};
  min-height: 10vh;
  display: grid;
  place-items: center;
  width: 100%;
`

export default StyledFooter