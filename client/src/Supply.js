import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json"
import "./supply.css";
function Supply() {
    const history = useHistory()
    useEffect(() => {
        loadWeb3();
        loadBlockchaindata();
    }, [])

    const [currentaccount, setCurrentaccount] = useState("");
    const [loader, setloader] = useState(true);
    const [SupplyChain, setSupplyChain] = useState();
    const [MED, setMED] = useState();
    const [MedStage, setMedStage] = useState();
    const [ID, setID] = useState();


    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert(
                "Non-Ethereum browser detected. You should consider trying MetaMask!"
            );
        }
    };
    const loadBlockchaindata = async () => {
        setloader(true);
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        setCurrentaccount(account);
        const networkId = await web3.eth.net.getId();
        const networkData = SupplyChainABI.networks[networkId];
        if (networkData) {
            const supplychain = new web3.eth.Contract(SupplyChainABI.abi, networkData.address);
            setSupplyChain(supplychain);
            var i;
            const medCtr = await supplychain.methods.medicineCtr().call();
            const med = {};
            const medStage = [];
            for (i = 0; i < medCtr; i++) {
                med[i] = await supplychain.methods.MedicineStock(i + 1).call();
                medStage[i] = await supplychain.methods.showStage(i + 1).call();
            }
            setMED(med);
            setMedStage(medStage);
            setloader(false);
        }
        else {
            window.alert('The smart contract is not deployed to current network')
        }
    }
    if (loader) {
        return (
            <div>
                <h1 className="wait">Loading...</h1>
            </div>
        )

    }
    const redirect_to_home = () => {
        history.push('/')
    }
    const handlerChangeID = (event) => {
        setID(event.target.value);
    }
    const handlerSubmitRMSsupply = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.RMSsupply(ID).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitManufacturing = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.Manufacturing(ID).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitDistribute = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.Distribute(ID).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitRetail = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.Retail(ID).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitSold = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.sold(ID).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    return (
        <div className="dashboard">
      {/* Address Section */}
      <div className="address">
        <span onClick={redirect_to_home} className="btn btn-secondary btn-sm m-2">HOME</span>
        <span><b>Current Account Address:</b> {currentaccount}</span>
      </div>

      {/* Supply Chain Flow */}
      <div className="flow">
        <h6><b>Supply Chain Flow:</b></h6>
        <p>Medicine Order -&gt; Raw Material Supplier -&gt; Manufacturer -&gt; Distributor -&gt; Retailer -&gt; Consumer</p>
      </div>

      {/* Medicine Table */}
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">Medicine ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Current Processing Stage</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(MED).map(function (key) {
            return (
              <tr key={key}>
                <td>{MED[key].id}</td>
                <td>{MED[key].name}</td>
                <td>{MED[key].description}</td>
                <td>{MedStage[key]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Step 1: Supply Raw Materials */}
      <div className="step-card">
        <div className="card">
          <h5 className="card-header">Step 1: Supply Raw Materials</h5>
          <div className="card-body">
            <form onSubmit={handlerSubmitRMSsupply}>
              <div className="form-group">
                <input className="form-control" type="text" onChange={handlerChangeID} placeholder="Enter Medicine ID" required />
              </div>
              <button className="btn btn-success btn-sm">Supply</button>
            </form>
          </div>
        </div>
      </div>

      {/* Step 2: Manufacture */}
      <div className="step-card">
        <div className="card">
          <h5 className="card-header">Step 2: Manufacture</h5>
          <div className="card-body">
            <form onSubmit={handlerSubmitManufacturing}>
              <div className="form-group">
                <input className="form-control" type="text" onChange={handlerChangeID} placeholder="Enter Medicine ID" required />
              </div>
              <button className="btn btn-success btn-sm">Manufacture</button>
            </form>
          </div>
        </div>
      </div>

      {/* Step 3: Distribute */}
      <div className="step-card">
        <div className="card">
          <h5 className="card-header">Step 3: Distribute</h5>
          <div className="card-body">
            <form onSubmit={handlerSubmitDistribute}>
              <div className="form-group">
                <input className="form-control" type="text" onChange={handlerChangeID} placeholder="Enter Medicine ID" required />
              </div>
              <button className="btn btn-success btn-sm">Distribute</button>
            </form>
</div>
</div>
</div>
  {/* Step 4: Retail */}
  <div className="step-card">
    <div className="card">
      <h5 className="card-header">Step 4: Retail</h5>
      <div className="card-body">
        <form onSubmit={handlerSubmitRetail}>
          <div className="form-group">
            <input className="form-control" type="text" onChange={handlerChangeID} placeholder="Enter Medicine ID" required />
          </div>
          <button className="btn btn-success btn-sm">Retail</button>
        </form>
      </div>
    </div>
  </div>

  {/* Step 5: Mark as sold */}
  <div className="step-card">
    <div className="card">
      <h5 className="card-header">Step 5: Mark as sold</h5>
      <div className="card-body">
        <form onSubmit={handlerSubmitSold}>
          <div className="form-group">
            <input className="form-control" type="text" onChange={handlerChangeID} placeholder="Enter Medicine ID" required />
          </div>
          <button className="btn btn-success btn-sm">Sold</button>
        </form>
      </div>
    </div>
  </div>
</div>
);
}

export default Supply;


