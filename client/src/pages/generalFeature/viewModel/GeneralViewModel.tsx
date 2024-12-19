import { Form } from 'antd';
import React, { useEffect, useState } from 'react'

const GeneralViewModel = () => {
    const [list, setList] = useState<Object>({});
    const [page, setPage] = useState<number>(0);
    const [form] = Form.useForm();

    const fetchInfo = async () => {
        setList({
            fullName: "Đặng Lê Khoa",
            code: "DTVT_0123",
            birthDay: "01/01/2024",
            placeOfOrigin: "Thành phố Hồ Chí Minh",
            sex: 0,
            identifyCard: "0909777788888",
            dateOfIssue: "01/01/2022",
            placeOfIssue: "Thành phố Hồ Chí Minh",
            religion: "Không"
        })
    };

    useEffect(() => {
        fetchInfo()
    }, []);

  return {
    list,
    page,
    form
  }
}

export default GeneralViewModel