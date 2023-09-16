'use client';
import React, { useState } from "react";
import { ConfigProvider, Card, Steps } from "antd";
import { Input, Space, Button } from "antd";
const { Search } = Input;
import { Col, Row } from 'antd';
import { CheckCircleFilled, SyncOutlined, AliwangwangOutlined }from '@ant-design/icons';


const onSearch = (value, _e, info) => console.log(info?.source, value);

const myObject = 
{
  Engage: {
    Kickoff: true,
    "Scoping call": true,
    "Sow Signed": true,
    "MSA Signed": true,
    "Request GA Creds": true
  },
  Containment: {
    "Disable Compromised User": true,
    "Reset Passwords": true,
    "Revoke Active Sessions": true,
    "Force MFA": true
  },
  Collection: {
    "GA Creds Operational": true,
    "Logs Collection": true,
    "Signin Logs": true,
    "Non interactive Signin logs": true,
    "Trace logs": false,
    "Tenant Info": false,
    UAL: false
  },
  Investigation: false,
  "Security Recommendation": false,
  Report: false
};

const steps = Object.entries(myObject).map(([key, value]) => {
  if (typeof value === "object" && value !== null) {
    const insidecontentoriginal = Object.entries(value).map(([innerKey, innerValue]) => ({
      title: innerKey,
      status: innerValue ? "finish" : "wait"
    }));

    const contentArray = Object.values(value);
    const trueCount = contentArray.reduce((acc, cur) => acc + cur, 0);
    const totalCount = contentArray.length;
    const progress = totalCount === 0 ? 0 : Math.round((trueCount / totalCount) * 100);
    const status = progress === 100 ? "finish" : trueCount === 0 ? "wait" : "process";

    return {
      title: key,
      content: value,
      status: status,
      subTitle: progress,
      inside: insidecontentoriginal
    };
  } else {
    return {
      title: key,
      content: value,
      status: value ? "finish" : "wait",
      subTitle: value ? 100 : 0,
      inside: value
    };
  }
});

const About = () => {
  const [current, setCurrent] = useState(0);

  const onChange = (value) => {
    setCurrent(value);
  };

  return (
    <>
      <Space.Compact block className="self-center flex justify-center p-4">
        <ConfigProvider
          theme={{
            token: {
              colorPrimaryHover: "black",
            },
          }}
        >
          <Input.Search allowClear enterButton className="text-white hover:text-white focus:text-white font-extralight w-96  rounded-md border bg-black hover:bg-gray-800 focus:bg-gray-700 border-black" placeholder="Order ID" onSearch={onSearch} />
        </ConfigProvider>
        {/* <Button type="primary" className="bg-blue-600">Submit</Button> */}
      </Space.Compact>
      <Row className="p-4 border-0 border-red-400 flex m-4">
        <Col className="border-0">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#48bb78",
                lineWidth:2,
                motionDurationSlow:"0.4s",
              },
            }}
          >
            <Steps
              direction="vertical"
              current={current}
              onChange={onChange}
              items={steps.map((item) => ({
                key: item.title,
                title: item.title,
                status: item.status,
                description: `${item.subTitle}%`
              }))}
              status={steps[current].status}
            />
          </ConfigProvider>

        </Col>
        <Col className="flex flex-col items-start border-0">


        {steps[current].subTitle === 100 ? (
        
        <span className="block text-lg border rounded-lg ml-4 mb-6 font-semibold p-2">
        Stage Complete
        <CheckCircleFilled className="ml-2 text-green-500"/>
        </span>
      ) : steps[current].subTitle > 0 && steps[current].subTitle < 100 ? (
        
        <span className="block text-lg border rounded-lg ml-4 mb-6 font-semibold p-2">
        In Progress
        <SyncOutlined spin className="ml-2 text-blue-500"/>
        </span>
      ) : (
        <span className="block text-lg border rounded-lg ml-4 mb-6 font-semibold p-2">
        Scheduled
        <AliwangwangOutlined style={{ fontSize: '32px' }} className="ml-2 text-red-500"/>
        </span>      
        )}


            {typeof steps[current].content === "object" && steps[current].content !== null ? (
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#48bb78",
                  },
                }}
              >
                <Steps className="border-0"
                  direction="horizontal"
                  progressDot
                  size="small"
                  current={current}
                  items={steps[current].inside}
                  status={steps[current].status}
                />
              </ConfigProvider>

            ) : (
              steps[current].content.toString()
            )}
        </Col>
      </Row>

    </>

  );
};

export default About;
