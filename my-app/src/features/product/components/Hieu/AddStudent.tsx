import styled from "styled-components";
import { Form, Button, DatePicker, Input, Select } from "antd";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DepartmentApi from "../../../../api/Hieu/DepartmentApi";
import StudentApi from "../../../../api/Hieu/StudentApi";
import { Department } from "../../../../models/Department";

const AddStudentStyle = styled.div`
  width: 500px;
  margin: 0 auto;
  .form {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
`;

const AddStudent = () => {
  const [depts, setDepts] = useState<Department[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    apiHandler();
  }, []);

  const apiHandler = () => {
    DepartmentApi.getAll().then((res) => {
      console.log(res);
      setDepts(res);
    });
  };

  const onSubmitHandler = async (values: any) => {
    console.log(values);
    await StudentApi.create(values).then(() => {
      toast.success("Add Student successful !!");
      navigate("/student");
    });
  };

  return (
    <AddStudentStyle>
      <h2>Add Student</h2>
      <div className="form">
        <Form
          autoComplete="off"
          onFinish={onSubmitHandler}
          wrapperCol={{ span: 32 }}
        >
          <Form.Item
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please enter your first name",
              },
              { whitespace: true },
              { min: 1 },
            ]}
            hasFeedback
          >
            <Input size="large" placeholder="Type first name ..." />
          </Form.Item>

          <Form.Item
            name="middleName"
            rules={[
              {
                required: true,
                message: "Please enter your middle name",
              },
              { whitespace: true },
              { min: 3 },
            ]}
            hasFeedback
          >
            <Input size="large" placeholder="Type middle name ..." />
          </Form.Item>

          <Form.Item
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please enter your last name",
              },
              { whitespace: true },
              { min: 3 },
            ]}
            hasFeedback
          >
            <Input size="large" placeholder="Type last name ..." />
          </Form.Item>

          <Form.Item
            name="gender"
            rules={[{ required: true, message: "please select gender !!!" }]}
          >
            <Select placeholder="Select your gender">
              <Select.Option value={true}>Male</Select.Option>
              <Select.Option value={false}>Female</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="dayOfBirth"
            rules={[
              {
                required: true,
                message: "Please provide your date of birth",
              },
            ]}
            hasFeedback
          >
            <DatePicker
              size="large"
              style={{ width: "100%" }}
              picker="date"
              placeholder="Chose date of birth"
              format={"YYYY-MM-DD"}
            />
          </Form.Item>

          <Form.Item
            name="departmentId"
            rules={[{ required: true, message: "please select department !!" }]}
          >
            <Select size="large" placeholder="Select your department">
              {depts.map((item: Department) => {
                return (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button size="large" block type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    </AddStudentStyle>
  );
};

export default AddStudent;
