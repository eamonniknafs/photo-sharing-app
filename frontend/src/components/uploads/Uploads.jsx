
import { Container, Card, Button } from 'react-bootstrap';
// import { useDropzone } from 'react-dropzone';

// function Uploads(props) {
//     const {
//         acceptedFiles,
//         // fileRejections,
//         getRootProps,
//         getInputProps
//     } = useDropzone({
//         accept: 'image/*'
//     });

//     var formData = new FormData();

//     const handleSubmit = () => {
//         for (const file in acceptedFileItems){
//             console.log(acceptedFileItems[file])
//             formData.append('photo' + file, acceptedFileItems[file])
//         }
//         console.log(formData)
//         try {
//             fetch('/api/upload', {
//                 method: 'POST',
//                 headers: {
//                     'Authorization': 'Bearer ' + props.token,
//                     'Content-Length': acceptedFileItems.length
//                 },
//                 body: formData
//             })
//             console.log({
//                 method: 'POST',
//                 headers: {
//                     'Authorization': 'Bearer ' + props.token,
//                     'Content-Type': 'multipart/form-data',
//                     'Content-Length': acceptedFileItems.length
//                 },
//                 body: formData
//             });
//         } catch (error) {
//             console.error('Failed to submit files.');
//         }
//     };


//     const acceptedFileItems = acceptedFiles.map(file => (
//         <li key={file.path}>
//             {file.path} - {file.size} bytes
//         </li>
//     ));

//     // const fileRejectionItems = fileRejections.map(({ file, errors }) => (
//     //     <li key={file.path}>
//     //         {file.path} - {file.size} bytes
//     //         <ul>
//     //             {errors.map(e => (
//     //                 <li key={e.code}>{e.message}</li>
//     //             ))}
//     //         </ul>
//     //     </li>
//     // ));

//     return (
//         <Container className="center">
//             <Card className='inner'>
//                 <h1>Upload Photos</h1>

//                     <aside>
//                     {acceptedFileItems.length > 0 ? <h4>Your files:</h4> : null}
//                         <ul>{acceptedFileItems}</ul>
//                     </aside> 
//                 <Card bg="light"
//                     border="dark"
//                     {...getRootProps({ className: 'dropzone' })}>
//                     <input {...getInputProps()} />
//                     <p>Click or drop your photos here. </p>
//                 </Card>
//                 <Button variant="primary" size="lg" onClick={handleSubmit}>Submit</Button>            </Card>
//         </Container>
//     );
// }

import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

const Uploads = (props) => {
    var count = 0


    // specify upload params and url for your files
    const getUploadParams = ({ meta }) => { return { url: '/api/upload', headers: { 'Authorization': 'Bearer ' + props.token } } }

    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => {
        console.log(status, meta, file)
        if (status === 'ready') { count++ }
        if (status === 'removed') { count-- }
    }

    // receives array of files that are done uploading when submit button is clicked
    const handleSubmit = (files, allFiles) => {
        console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
    }

    return (
        <Container className='center'>
            <Card className='inner'>
                <h1>Upload Photos</h1>
                <p>Files will auto upload.</p>
                <Dropzone
                    getUploadParams={getUploadParams}
                    onChangeStatus={handleChangeStatus}
                    onSubmit={handleSubmit}
                    accept="image/*"
                />
            </Card>
        </Container>
    )
}

export default Uploads
