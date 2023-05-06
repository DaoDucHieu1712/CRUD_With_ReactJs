import { useEffect, useState } from 'react'
import StudentApi from '../../../../api/Hieu/StudentApi'
import { Student } from '../../../../models/Student'
import { Button, Spin } from 'antd'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import DeleteStudentModal from './DeleteStudentModal'
const StudenListStyle = styled.div`
  .list {
    margin-top: 25px;
    display: flex;
    align-items: center;
    gap: 0 35px;
  }

  .student-table {
    margin-top: 15px;
    table {
      width: 100%;
      border-collapse: collapse;
    }

    table th,
    table td {
      padding: 15px 30px;
      text-align: left;
    }

    table thead {
      background-color: #f1f7fd;
    }

    table th {
      color: #1e2021;
      font-weight: 600;
      background-color: #f1f7fd;
    }

    table tbody tr {
      border-top: 1px solid #f0f4f8;
    }
  }

  .student-action {
    display: flex;
    align-items: center;
    gap: 0 15px;
  }
`

const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    apihandler()
  }, [])

  const apihandler = async () => {
    setLoading(true)
    await StudentApi.getAll().then(res => {
      setStudents(res)
      setLoading(false)
    })
  }

  return (
    <StudenListStyle>
      <NavLink to="/add-student">
        <Button type="primary">Add new Student</Button>
      </NavLink>
      {loading ? (
        <div>
          <Spin />
        </div>
      ) : (
        <div className="student-table">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Full Name</th>
                <th>Gender</th>
                <th>Day Of Birth</th>
                <th>Department</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map(item => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.firstName + ' ' + item.middleName + ' ' + item.lastName}</td>
                    <td>{item.gender ? 'Male' : 'Female'}</td>
                    <td>{item.dayOfBirth.toString().slice(0, 10)}</td>
                    <td>{item.department.name}</td>
                    <td className="student-action">
                      <NavLink to={`/update-student/${item.id}`}>
                        <Button type="primary">Update</Button>
                      </NavLink>
                      <DeleteStudentModal
                        id={item.id.toString()}
                        name={item.lastName}
                        onLoad={apihandler}
                      ></DeleteStudentModal>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </StudenListStyle>
  )
}

export default StudentList
