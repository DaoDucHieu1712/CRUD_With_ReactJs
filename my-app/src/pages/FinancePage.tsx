import React, { Fragment } from 'react'
import AddFinace from '../features/product/components/Vinh/AddFinace'
import FinanceList from '../features/product/components/Vinh/FinanceList'

const FinancePage = () => {
  return (
    <Fragment>
      <h1>Manage Finance</h1>
      <AddFinace />
      <FinanceList />
    </Fragment>
  )
}

export default FinancePage
