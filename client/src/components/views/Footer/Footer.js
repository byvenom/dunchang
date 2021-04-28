import React from 'react'
import {Icon} from 'antd';
import logo from '../DFPage/img/RRRR.jpg'
import neo from '../DFPage/img/neo_logo.png'
import './all.css'

function Footer() {
    return (
        <div>
          
            <div style={{
                height: '80px', display: 'flex', width: '100%',
                flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', fontSize:'1rem'
            }}>
            <p><img src={logo} style={{width:'36px' ,height:'36px'}} className="App-logo" alt=""/> 엿장수  <Icon type="smile" /><img src={logo} style={{width:'36px' ,height:'36px'}} className="App-logo2" alt=""/></p>
            </div>
            <div style={{width:'50%'}}><a href="http://developers.neople.co.kr" target="_blank">
            <img src={neo} alt="Neople 오픈 API" /> </a></div>
        </div>
    )
}

export default Footer
