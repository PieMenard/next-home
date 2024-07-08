import React from 'react';
import { PropertiesFormStepProps } from '.';
import { Button, Form, Input, InputNumber, Select } from 'antd';

function Contact({
  currentStep,
  setCurrentStep,
  finalValues,
  setFinalValues,
}: PropertiesFormStepProps) {
  const onFinish = (values: any) => {
    const tempFinalValues = { ...finalValues, contact: values };
  };
  return (
    <Form
      onFinish={onFinish}
      layout="vertical"
      initialValues={finalValues.contact}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Form.Item
          name="ownerName"
          label="Owner Name"
          rules={[{ required: true, message: 'Please input owner name!' }]}
        >
          <Input placeholder="Owner Name" />
        </Form.Item>
        <Form.Item
          name="ownerEmail"
          label="Owner Email"
          rules={[{ required: true, message: 'Please input owner email!' }]}
        >
          <Input placeholder="Owner Email" />
        </Form.Item>
        <Form.Item
          name="ownerPhone"
          label="Owner Phone"
          rules={[{ required: true, message: 'Please input owner phone!' }]}
        >
          <Input placeholder="Owner Phone" />
        </Form.Item>

        <Form.Item
          name="showOwnerContact"
          label="Show Owner Contact"
          rules={[
            {
              required: true,
              message: 'Please select if owner contact is private!',
            },
          ]}
        >
          <Select
            options={[
              { label: 'Yes', value: true },
              { label: 'No', value: false },
            ]}
          />
        </Form.Item>
      </div>

      <div className="flex justify-end gap-5 mt-7">
        <Button
          disabled={currentStep === 0}
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          Back
        </Button>
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </div>
    </Form>
  );
}

export default Contact;
