import './App.css'
import { Form, Button, ListGroup } from 'react-bootstrap'
import { useState } from 'react'
import http from 'superagent'

function App() {
  const [tags, setTags] = useState([])
  const [tag, setTag] = useState('')
  const [query, setQuery] = useState('')
  const [topic, setTopic] = useState('')
  const [searchText, setSearchText] = useState('')
  const [questions, setQuestions] = useState([])

  const handleSubmit = () => {
    //send post request
    http
      .post('/api/add-question')
      .send({
        query,
        topic,
        tags,
      })
      .end((err, res) => {
        if (err) {
          return console.log(err)
        }
        console.log(res.body)
      })

    setTag('')
    setTopic('')
    setQuery('')
    setTags([])
  }

  const handleSearch = () => {
    setQuestions([])
    http
      .post('/api/get-question')
      .send({
        searchText,
      })
      .end((err, res) => {
        if (err) {
          return console.log(err)
        }
        console.log(res.body.data.questions)
        setQuestions(res.body.data.questions)
      })
    setSearchText('')
  }

  return (
    <div className="App">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Query</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter query"
            value={query}
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Topic</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value.toLowerCase())}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tags</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter tag name"
            value={tag}
            onChange={(e) => setTag(e.target.value.toLowerCase())}
          />
          <Form.Text className="text-muted">
            <ListGroup>
              {tags.map((tag, index) => {
                return <ListGroup.Item eventKey={index}>{tag}</ListGroup.Item>
              })}
            </ListGroup>
          </Form.Text>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              console.log('tag', tag, 'tags', tags)
              if (tag !== '') {
                setTags([...tags, tag])
                setTag('')
              }
            }}
          >
            Add tag
          </button>
        </Form.Group>

        <button
          variant="primary"
          onClick={() => {
            handleSubmit()
          }}
        >
          Submit
        </button>
      </Form>
      <br />
      <br />
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Search</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter question or tag to search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value.toLowerCase())}
          />
          <Form.Text>
            <Button variant="primary" onClick={handleSearch}>
              Search
            </Button>
            <h3>Questions found</h3>
            <ul>
              {questions.map((question, index) => {
                return <li key={index}>{question}</li>
              })}
            </ul>
          </Form.Text>
        </Form.Group>
      </Form>
    </div>
  )
}

export default App
