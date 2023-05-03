import React, { Fragment } from 'react'
import AddFinace from '../features/product/components/Vinh/AddFinace'
import FinanceList from '../features/product/components/Vinh/FinanceList'

const FinancePage = () => {
  return (
    <Fragment>
      <h1 style={{ fontSize: 30, textAlign: 'center', padding: 16, textTransform: 'uppercase' }}>Manage Finance</h1>
      <AddFinace />
      <FinanceList />
    </Fragment>
  )
}

export default FinancePage
