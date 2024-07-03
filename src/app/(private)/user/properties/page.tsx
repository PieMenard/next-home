import PageTitle from '@/components/page-title';
import React from 'react';
import PropertiesTable from './_components/properties-table';
import LinkButton from '@/components/link-button';

const Properties = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Properties" />
        <LinkButton
          title="Create property"
          path="/user/properties/create-property"
        />
      </div>
      <PropertiesTable />
    </div>
  );
};

export default Properties;
