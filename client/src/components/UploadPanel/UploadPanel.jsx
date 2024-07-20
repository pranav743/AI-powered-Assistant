// import React, { useContext, useState } from 'react';
// import './Main.css';
// import { Context } from '../../context/Context';
// import axios from 'axios';

// const UploadPanel = () => {
//     const { showPanel, setShowPanel } = useContext(Context);
//     const [files, setFiles] = useState([]);

//     const handleFileChange = (e) => {
//         const selectedFiles = Array.from(e.target.files);
//         setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
//     };

//     const removeFile = (filename) => {
//         setFiles((prevFiles) => prevFiles.filter(file => file.name !== filename));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         files.forEach(file => {
//             formData.append('files', file);
//         });
//         formData.append('data', JSON.stringify({message: "Hello, this is a Trial Message"}));

//         try {
//             const response = await axios.post('http://localhost:5000/upload-many/', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             console.log(response.data);
//         } catch (error) {
//             console.error('Error uploading files:', error);
//         }
//     };

//     return (
//         <div>
//             <div className={`panel ${showPanel ? 'open' : ''}`}>
//                 <button className="close-button" onClick={() => setShowPanel(false)}>✖</button>
//                 <div className="panel-content">
//                     <h2 style={{ marginBottom: '20px' }}>Upload Documents</h2>

//                     <label className="file-label">
//                         <span className="custom-file-input">Select Files</span>
//                         <input
//                             type="file"
//                             multiple
//                             onChange={handleFileChange}
//                             className="file-input"
//                         />
//                     </label>


//                     <div className="file-list">
//                         {files.map((file, index) => (
//                             <div key={index} className="file-item">
//                                 <span className="file-name">{file.name}</span>
//                                 <button className="delete-button" onClick={() => removeFile(file.name)}>❌</button>
//                             </div>
//                         ))}
//                     </div>
                        
//                     <button className='upload-button-final' onClick={handleSubmit}>Upload Files</button>

//                 </div>
//             </div>
//         </div>
//     );
// }

// export default UploadPanel;

import React, { useContext, useState } from 'react';
import './Main.css';
import { Context } from '../../context/Context';
import axios from 'axios';

const UploadPanel = () => {
    const { showPanel, setShowPanel } = useContext(Context);
    const [files, setFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadCompleted, setUploadCompleted] = useState(false);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    };

    const removeFile = (filename) => {
        setFiles((prevFiles) => prevFiles.filter(file => file.name !== filename));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file);
        });
        formData.append('data', JSON.stringify({ message: "Hello, this is a Trial Message" }));

        try {
            const response = await axios.post('http://localhost:5000/upload-many/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    const percentage = Math.floor((loaded * 100) / total);
                    setUploadProgress(percentage);
                },
            });
            console.log(response.data);
            setUploadCompleted(true);
            setUploadProgress(0);
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    };

    return (
        <div>
            <div className={`panel ${showPanel ? 'open' : ''}`}>
                <button className="close-button" onClick={() => setShowPanel(false)}>✖</button>
                <div className="panel-content">
                    <h2 style={{ marginBottom: '20px' }}>Upload Documents</h2>

                    <label className="file-label">
                        <span className="custom-file-input">Select Files</span>
                        <input
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            className="file-input"
                        />
                    </label>

                    <div className="file-list">
                        {files.map((file, index) => (
                            <div key={index} className="file-item">
                                <span className="file-name">{file.name}</span>
                                <button className="delete-button" onClick={() => removeFile(file.name)}>
                                    {uploadCompleted ? '✔' : '❌'}
                                </button>
                            </div>
                        ))}
                    </div>

                    {uploadProgress > 0 && (
                        <div className="progress-bar">
                            <div className="progress" style={{ width: `${uploadProgress}%` }}>
                                {uploadProgress}%
                            </div>
                        </div>
                    )}

                    <button className='upload-button-final' onClick={handleSubmit}>Upload Files</button>

                </div>
            </div>
        </div>
    );
}

export default UploadPanel;

