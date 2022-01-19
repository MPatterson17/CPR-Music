import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch } from 'react-redux';
import { uploadRoster } from '../../actions';

function UploadStudents() {
  const [file, setFile] = useState();
  const dispatch = useDispatch();

  const { data: session } = useSession();

  const router = useRouter();
  const { slug } = router.query;

  const uploadStudents = (ev) => {
    console.log('add student ev', ev);

    const formData = new FormData();

    // Update the formData object
    formData.append('file', file, file.name);

    // Details of the uploaded file
    console.log(file);

    // don't refresh the page
    ev.preventDefault();
    ev.stopPropagation();
    dispatch(
      uploadRoster({
        body: formData,
        djangoToken: session.djangoToken,
        courseSlug: slug,
      })
    );
  };
  return (
    <div className="my-5">
      <h2>Add Multiple Students</h2>
      <p>
        Create a <abbr title="Comma-Separated Value">CSV</abbr> file{' '}
      </p>
      <Form onSubmit={uploadStudents}>
        <Form.Group as={Row} className="mb-3" controlId="formRosterCSV">
          <Form.Label column sm={2}>
            Roster CSV
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="file"
              placeholder="Roster CSV"
              onChange={(ev) => {
                console.log('setFile', ev);
                setFile(ev.target.files[0]);
              }}
            />
          </Col>
        </Form.Group>
        <Button type="submit">Upload</Button>
      </Form>
    </div>
  );
}

export default UploadStudents;
