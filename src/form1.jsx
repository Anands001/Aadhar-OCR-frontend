import { useState } from 'react';
import { Button, Input, Page, setOptions } from '@mobiscroll/react';
import axios from 'axios';

setOptions({
    theme: 'ios',
    themeVariant: 'light'
});

// axios.defaults.baseURL = 'http://localhost:5000';
function App() {
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [aadhar, setAadhar] = useState('');
    const [dob, setDob] = useState('');
    const [sex, setSex] = useState('');
    const [so, setSo] = useState('');
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const [address, setAddress] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
            await axios.post('https://aadhar-card-ocr-system-1.onrender.com/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            }).then((response) => {
                // this.response = response
                console.log(response);
                // Update state with the returned values
                setName(response.data.name || '');
                setAadhar(response.data.adhaar || '');
                setDob(response.data.dob || '');
                setSex(response.data.sex || '');
                if(response.data.address != null){
                    setPincode(response.data.address.pincode);
                    setState(response.data.address.state);
                    setDistrict(response.data.address.district);
                    setSo(response.data.address.so);
                    setAddress(response.data.address.addr);
                }
                console.log('API Response:', response.data);
                }).catch((error) => {
                    console.log(error);
                })
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <Page>
            <div className="mbsc-form-group">
                <div className="mbsc-row mbsc-justify-content-center">
                    <div className="mbsc-col-md-10 mbsc-col-xl-8 mbsc-form-grid">
                        <div className="mbsc-form-group-title">AADHAR DATA EXTRACTION</div>
                        <div className="mbsc-row">
                            <div className="mbsc-col-12">
                                <Input type="file" label="Select file" inputStyle="box" labelStyle="floating" onChange={handleFileChange} />
                            </div>
                        </div>
                        <Button onClick={handleUpload}>Upload</Button>
                    </div>
                </div>
            </div>
            <div className="mbsc-form-group">
                <div className="mbsc-row mbsc-justify-content-center">
                    <div className="mbsc-col-sm-9 mbsc-col-md-7 mbsc-col-xl-5">
                        <div className="mbsc-form-group">
                            <div className="mbsc-form-group-title">EXTRACTED AADHAR DATA</div>
                            <Input label="Name" placeholder="Name" value={name} />
                            <Input label="Aadhar number" placeholder="#### #### ####" value={aadhar} />
                            <Input label="DOB" placeholder="dob" value={dob} />
                            <Input label="Sex" placeholder="MALE/Female" value={sex} />
                        </div>

                        <div className="mbsc-form-group">
                            <div className="mbsc-form-group-title">ADDRESS</div>
                            <Input label="S/0" placeholder="Father Name" value={so} />
                            <Input label="District" placeholder="district" value={district} />
                            <Input label="State" placeholder="state" value={state} />
                            <Input label="pincode" placeholder="000000" value={pincode} />
                            <Input label="Address" placeholder="" value={address} />
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}

export default App;
