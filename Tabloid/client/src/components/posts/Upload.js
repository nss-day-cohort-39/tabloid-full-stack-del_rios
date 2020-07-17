import React from 'react'
import { post } from 'axios';

class UploadForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 'get-id-from-somewhere',
            file: null,
        };
    }

    async submit(e) {
        e.preventDefault();

        const url = `http://target-url/api/${this.state.id}`;
        const formData = new FormData();
        formData.append('body', this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        return post(url, formData, config);
    }

    setFile(e) {
        this.setState({ file: e.target.files[0] });
    }

    render() {
        return (
            <form onSubmit={e => this.submit(e)}>
                <h1>File Upload</h1>
                <input type="file" onChange={e => this.setFile(e)} />
                <button type="submit">Upload</button>
            </form>
        );
    }
}
