import { Button, Form, InputNumber, Select } from 'antd';
import { PropertiesFormStepProps } from '.';
import { facingTypes, parkingTypes, furnishingTypes } from '@/constants';

const Amenities = ({
  currentStep,
  setCurrentStep,
  finalValues,
  setFinalValues,
}: PropertiesFormStepProps) => {
  const onFinish = (values: any) => {
    setFinalValues({ ...finalValues, amenities: values });
    setCurrentStep(currentStep + 1);
  };
  return (
    <Form
      onFinish={onFinish}
      layout="vertical"
      initialValues={finalValues.amenities}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Form.Item
          name="bedrooms"
          label="# of Bedrooms"
          rules={[
            { required: true, message: 'Please input number of bedrooms!' },
          ]}
        >
          <InputNumber className="w-full" placeholder="1" />
        </Form.Item>
        <Form.Item
          name="bathrooms"
          label="# of Bathrooms"
          rules={[
            { required: true, message: 'Please input number of bathrooms!' },
          ]}
        >
          <InputNumber className="w-full" placeholder="1" />
        </Form.Item>
        <Form.Item
          name="balconies"
          label="# of Balconies"
          rules={[
            { required: true, message: 'Please input number of balconies!' },
          ]}
        >
          <InputNumber className="w-full" placeholder="1" />
        </Form.Item>
        <Form.Item
          name="parking"
          label="Type of Parking"
          rules={[{ required: true, message: 'Please input a parking type!' }]}
        >
          <Select options={parkingTypes} />
        </Form.Item>
        <Form.Item
          name="furnishing"
          label="Type of Furnishing"
          rules={[
            { required: true, message: 'Please input a furnishing type!' },
          ]}
        >
          <Select options={furnishingTypes} />
        </Form.Item>
        <Form.Item
          name="area"
          label="Area (in meters)"
          rules={[{ required: true, message: 'Please input the area!' }]}
        >
          <InputNumber className="w-full" placeholder="50" />
        </Form.Item>
        <Form.Item
          name="total_floors"
          label="Total Floors"
          rules={[
            { required: true, message: 'Please input the number of floors!' },
          ]}
        >
          <InputNumber className="w-full" placeholder="1" />
        </Form.Item>
        <Form.Item
          name="facing"
          label="Cardinal Facing"
          rules={[{ required: true, message: 'Please input a direction!' }]}
        >
          <Select options={facingTypes} />
        </Form.Item>
        <Form.Item
          name="age"
          label="Age"
          rules={[{ required: true, message: 'Please input the age!' }]}
        >
          <InputNumber className="w-full" placeholder="1" />
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
};

export default Amenities;
