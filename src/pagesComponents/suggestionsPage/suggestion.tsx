import React from 'react';
import Leftpanel from './leftpanel';
import RightPanel from './rightPanel';
import styles from '@/styles/LeftPanel.module.css'

export default function Suggestion() {
  return (
    <div style={{ height: "100%",  flex : 1, justifyContent : 'center', display: 'flex', background: '#F7F8FD',gap:24, paddingTop : 24 }} className={`${styles.grid} ${styles.removePd}`} >
      <Leftpanel />
      <RightPanel />
    </div>
  )
}
