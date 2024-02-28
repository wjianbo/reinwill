import reinwillLogo from '/reinwill.svg'
import './App.css'
import CustomizedInputBase from './components/search'
import SpacingGrid from './components/spacing-grid'
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import React from 'react'

function App() {

  return (
    <>
    <div className='header'>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <Avatar alt="Remy Sharp" src={reinwillLogo} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText secondary={<React.Fragment>
          <p className='height-1'>帝禹江河湖海流，辛壬癸甲</p>
          <p className='height-1'>置身家国天下事，以吾知名</p>
        </React.Fragment>} />
      </ListItem>
    </div>
      <div className="card">
        <CustomizedInputBase />
      </div>
      <SpacingGrid />
      <p className="read-the-docs">
        促进共建共享 鼓励原生原创 惩戒坏人坏事 落实好人好报
      </p>
      <p className="read-the-docs">
        All rights reserved © REINWILL 沪ICP备2021036153号
      </p>
    </>
  )
}

export default App
