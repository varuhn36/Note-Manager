import React, { useEffect } from 'react';
import MainScreen from '../../components/MainScreen';
import { Link, useNavigate } from 'react-router-dom';
import { Accordion, Badge, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNoteAction, listNotes } from '../../actions/noteAction';
import Loading from '../../components/Header/Loading';
import ErrorMessage from '../../components/Header/ErrorMessage';

const MyNotes = ({ search }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this note??")) {
      dispatch(deleteNoteAction(id));
    }
  };

  useEffect(() => {
    dispatch(listNotes());

    if (!userInfo) navigate('/');
  }, [dispatch, navigate, userInfo, successCreate, successUpdate, successDelete]);

  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.name}`}>
      <Link to="createnote">
        <Button variant="light" className="NewNote-Button">
          Create a new Note!
        </Button>
      </Link>

      {loadingDelete && <Loading />}
      {errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
      {error && <ErrorMessage variant="danger"> {error}</ErrorMessage>}
      {loading && <Loading />}
      {notes
        ?.reverse()
        .filter((filteredNote) => filteredNote.title.toLowerCase().includes(search.toLowerCase()))
        .map((note) => (
          <Accordion key={note._id}>
            <Card>
              <Card.Header style={{ display: 'flex' }}>
                <span
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    flex: 1,
                    cursor: 'pointer',
                    alignSelf: 'center',
                    fontSize: 18,
                  }}
                >
                  {note && (
                    <Accordion.Header as={Card.Text} eventKey="0" variant="Link">
                      {note.title}
                    </Accordion.Header>
                  )}
                </span>
                <div>
                  <Button className="mx-2" href={`/note/${note._id}`} variant="success">
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() => deleteHandler(note._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Header>

              <Accordion.Body eventKey="0">
                <Card.Body>
                  <h4>
                    <Badge>Category - {note.category}</Badge>
                  </h4>

                  <blockquote className="blockquote mb-0">
                    <p>{note.content}</p>
                    <footer className="blockquote-footer">
                      Created On {' '}
                      <cite title="Source Title">{note.createdAt.substring(0, 10)}</cite>
                    </footer>
                  </blockquote>
                </Card.Body>
              </Accordion.Body>
            </Card>
          </Accordion>
        ))}
    </MainScreen>
  );
};

export default MyNotes;
