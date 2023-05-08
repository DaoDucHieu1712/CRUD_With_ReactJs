import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Student } from '../../../models/Student'
import StudentApi from '../../../api/Hieu/StudentApi'

export default function useStudent() {
  const [student, setStudent] = useState<Student>()
  const [loading, setLoading] = useState<boolean>(true)
  const { id } = useParams()

  useEffect(() => {
    ApiHandler()
  }, [id])

  const ApiHandler = async () => {
    setLoading(true)
    await StudentApi.getStudent(id).then(res => {
      console.log(res)
      setStudent(res)
      setLoading(false)
    })
  }

  return {
    loading,
    student
  }
}
