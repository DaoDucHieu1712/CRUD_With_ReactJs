import React, { Fragment, useEffect, useState } from 'react'
import { Card, Col, Row } from 'antd'
import FinanceApi from '../../../../api/Vinh/FinanceApi'
import { Finance } from '../../../../models/Finance'

const FinanceList = () => {
  const [financeList, setFinanceList] = useState<Finance[]>([])
  useEffect(() => {
    FinanceApi.getAll().then((response: Finance[]) => {
      setFinanceList(response)
      console.log(response)
    })
  }, [])

  return (
    <Fragment>
      {financeList.map((finance: Finance) => (
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Card title" bordered={false}>
              {finance.description}
            </Card>
          </Col>
        </Row>
      ))}
    </Fragment>
  )
}

export default FinanceList
