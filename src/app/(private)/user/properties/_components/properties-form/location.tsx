import { Button, Form, Input, InputNumber, Select } from 'antd';
import { PropertiesFormStepProps } from '.';
import { cities } from '@/constants';

const Location = ({
  currentStep,
  setCurrentStep,
  finalValues,
  setFinalValues,
}: PropertiesFormStepProps) => {
  const onFinish = (values: any) => {
    setFinalValues({ ...finalValues, location: values });
    setCurrentStep(currentStep + 1);
  };

  return (
    <Form
      onFinish={onFinish}
      layout="vertical"
      initialValues={finalValues.location}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Form.Item
          name="city"
          label="City"
          rules={[{ required: true, message: 'Please input a city!' }]}
        >
          <Select options={cities} />
        </Form.Item>
        <Form.Item
          name="zipcode"
          label="Zip code"
          rules={[{ required: true, message: 'Please input a zip code!' }]}
        >
          <InputNumber className="w-full" placeholder="Zip code" />
        </Form.Item>
        <Form.Item
          name="landmark"
          label="Landmark"
          rules={[{ required: true, message: 'Please input a landmark!' }]}
        >
          <Input placeholder="Landmark" />
        </Form.Item>
        <Form.Item
          className="col-span-1 lg:col-span-3"
          name="address"
          label="Address"
          rules={[{ required: true, message: 'Please input a address!' }]}
        >
          <Input.TextArea rows={5} placeholder="Address" />
        </Form.Item>
      </div>
      <div className="flex justify-end gap-5 mt-7">
        <Button
          disabled={currentStep === 0}
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          Back
        </Button>
        <Button htmlType="submit" type="primary">
          Next
        </Button>
      </div>
    </Form>
  );
};

export default Location;
