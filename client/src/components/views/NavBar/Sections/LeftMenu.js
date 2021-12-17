import React from 'react';
import { Menu } from 'antd';

const SubMenu = Menu.SubMenu;
//const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  
  return (
    <Menu mode={props.mode}>
    <SubMenu title={<span><a href="/LandingPage" style={{textDecoration:'inherit' , color:'inherit'}}>영상</a></span>}>
    <Menu.Item key="home">
      <a href="/LandingPage">전체영상</a>
    </Menu.Item>
    <Menu.Item key="subscription">
      <a href="/video/subscription">구독영상</a>
    </Menu.Item>
    <Menu.Item key="upload">
      <a href="/video/upload">업로드</a>
    </Menu.Item>
    </SubMenu>
    <SubMenu title={<span><a href="/movie" style={{textDecoration:'inherit' , color:'inherit'}}>영화</a></span>}>
    <Menu.Item key="movie">
      <a href="/movie">영화정보</a>
    </Menu.Item>
    <Menu.Item key="favorite">
      <a href="/movie/favorite">담긴영화</a>
    </Menu.Item>
    </SubMenu>
    <SubMenu title={<span><a href="/chart" style={{textDecoration:'inherit' , color:'inherit'}}>차트</a></span>}>
    <Menu.Item key="chart">
      <a href="/chart">내차트</a>
    </Menu.Item>
    <Menu.Item key="chartupload">
      <a href="/chart/upload">차트업로드</a>
    </Menu.Item>
    </SubMenu>
    <SubMenu title={<span><a href="/dunfa" style={{textDecoration:'inherit' , color:'inherit'}}>DUNCHANG</a></span>}>
    <Menu.Item key="searchitem">
    <a href="/dunfa/itemsearch">아이템검색</a>
    </Menu.Item>
    </SubMenu>
    <SubMenu title={<span><a href="/chat" style={{textDecoration:'inherit' , color:'inherit'}}>실시간 채팅</a></span>}>
 
    </SubMenu>
   
  </Menu>
  )
}

export default LeftMenu