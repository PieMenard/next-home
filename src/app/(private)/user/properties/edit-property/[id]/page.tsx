import PageTitle from '@/components/page-title';
import React from 'react';
import PropertiesForm from '../../_components/properties-form';

const EditPropertyPage = () => {
  return (
    <div>
      <PageTitle title="Edit Property" />
      <PropertiesForm />
    </div>
  );
};

export default EditPropertyPage;
