
import { Container, Card } from 'react-bootstrap';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

const Uploads = (props) => {
    // specify upload params and url for your files
    const getUploadParams = ({ meta }) => { return { url: '/api/upload', headers: { 'Authorization': 'Bearer ' + props.token } } }

    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => {
        console.log(status, meta, file)
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
