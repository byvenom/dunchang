import React from 'react'
import {Icon} from 'antd';
import logo from '../DFPage/img/RRRR.jpg'
import './all.css'

function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem'
        }}>
           <p><img src={logo} style={{width:'36px' ,height:'36px'}} className="App-logo" alt=""/> 엿장수  <Icon type="smile" /><img src={logo} style={{width:'36px' ,height:'36px'}} className="App-logo2" alt=""/></p>
        </div>
    )
}

export default Footer
