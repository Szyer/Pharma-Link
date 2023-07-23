import React from 'react';
import { useHistory } from 'react-router-dom';

function Home() {
  const history = useHistory();

  const redirect_to_roles = () => {
    history.push('/roles');
  };

  const redirect_to_addmed = () => {
    history.push('/addmed');
  };

  const redirect_to_supply = () => {
    history.push('/supply');
  };

  const redirect_to_track = () => {
    history.push('/track');
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <h2 style={{ marginBottom: '30px', fontSize: '2rem', textAlign: 'center' }}>Pharma-Link: Pharmaceutical Supply Chain</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '70%' }}>
        <div style={{ width: '100%', marginBottom: '20px', backgroundColor: '#ffffff', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', borderRadius: '8px', padding: '20px' }}>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '10px', textAlign: 'center' }}>Step 1: Register Suppliers</h4>
          <p style={{ marginBottom: '20px', textAlign: 'center' }}>Owner should register raw material suppliers, manufacturers, distributors, and retailers</p>
          <button onClick={redirect_to_roles} style={{ width: '100%', backgroundColor: '#007bff', color: '#ffffff', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer' }}>
            Register
          </button>
        </div>
        <div style={{ width: '100%', marginBottom: '20px', backgroundColor: '#ffffff', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', borderRadius: '8px', padding: '20px' }}>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '10px', textAlign: 'center' }}>Step 2: Order Medicines</h4>
          <p style={{ marginBottom: '20px', textAlign: 'center' }}>Owner should order medicines</p>
          <button onClick={redirect_to_addmed} style={{ width: '100%', backgroundColor: '#dc3545', color: '#ffffff', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer' }}>
            Order Medicines
          </button>
        </div>
        <div style={{ width: '100%', marginBottom: '20px', backgroundColor: '#ffffff', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', borderRadius: '8px', padding: '20px' }}>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '10px', textAlign: 'center' }}>Step 3: Control Supply Chain</h4>
          <p style={{ marginBottom: '20px', textAlign: 'center' }}>Control the pharmaceutical supply chain</p>
          <button onClick={redirect_to_supply} style={{ width: '100%', backgroundColor: '#28a745', color: '#ffffff', border: 'none', padding: '10px', borderRadius:            '4px', cursor: 'pointer' }}>
            Control Supply Chain
          </button>
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ marginTop: '30px', fontSize: '1.2rem' }}>Track the Medicines:</h4>
        <button onClick={redirect_to_track} style={{ backgroundColor: '#007bff', color: '#ffffff', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer' }}>
          Track Medicines
        </button>
      </div>
    </div>
  );
}

export default Home;

