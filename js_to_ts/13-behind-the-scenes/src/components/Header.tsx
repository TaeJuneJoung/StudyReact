import {FC} from 'react'
import logoImage from '../assets/logo.png'

const Header: FC = () => {
  return (
    <header id="main-header">
      <img src={logoImage} alt="Logo Image" />
      <h1>React - Behind The Scenes</h1>
    </header>
  )
}

export default Header
