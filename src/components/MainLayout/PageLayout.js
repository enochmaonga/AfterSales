import React from 'react';
import CardSection from './CardSection';


const PageLayout = () => {
  return (
    <>
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '110vh',
        background: '#f0f0f0',
      }}
    >

        <CardSection />
      </div>
      </>
  );
};

export default PageLayout;