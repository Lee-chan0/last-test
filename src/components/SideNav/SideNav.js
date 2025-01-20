import { NavigationSideBarContainer, SideNavMainContainer, AddButton } from './SideNaveStyle';
import logoImage from '../../assets/Group 1.png';
import pencilImage from '../../assets/mdi_pencil-outline.png';
import DropDown from '../DropDown/DropDown';
import { Link } from 'react-router-dom';



function SideNav() {

  return (
    <NavigationSideBarContainer>
      <SideNavMainContainer>
        <Link to='/truescope-administrator/editor-page'><img src={logoImage} alt="logo" width={'100%'} /></Link>
        <DropDown />
      </SideNavMainContainer>
      <AddButton as='a' href='create-article'>
        <img src={pencilImage} alt="pencil" />
        <div>
          기사작성
        </div>
      </AddButton>
    </NavigationSideBarContainer>
  )
}

export default SideNav;