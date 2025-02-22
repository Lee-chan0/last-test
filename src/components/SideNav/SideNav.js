import { NavigationSideBarContainer, SideNavMainContainer, AddButton } from './SideNaveStyle';
import logoImage from '../../assets/Group 1.png';
import pencilImage from '../../assets/mdi_pencil-outline.png';
import DropDown from '../DropDown/DropDown';
import { useNavigate } from 'react-router-dom';



function SideNav({ articlesArr, setFilterArticles, isUpdate, isCreate }) {
  const navigate = useNavigate();

  const clickLogo = () => {
    navigate('/truescope-administrator/editor-page');
    window.location.reload();
  }

  return (
    <NavigationSideBarContainer>
      <SideNavMainContainer>
        <img src={logoImage} alt="logo" width={'100%'} style={{ cursor: "pointer" }} onClick={clickLogo} />
        <DropDown articlesArr={articlesArr} setFilterArticles={setFilterArticles} isUpdate={isUpdate} isCreate={isCreate} />
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