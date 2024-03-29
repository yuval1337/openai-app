import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useSignOut } from 'react-auth-kit'

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const signOut = useSignOut()
  const navigate = useNavigate()

  const logout = () => {
    signOut()
    navigate('/')
    setIsLoggedIn(false)
  }

  return (
    <Container
      variant='fluid'
      style={{
        'height': '8%',
        'backgroundColor': '#f6f6f6'
      }}>
      <Row>
        <Col className='d-flex'>
          <Link className='ms-0' to='/'>
            <Button variant='outline-primary'>Home</Button>
          </Link>
          <Link className='ms-1' to='/about'>
            <Button variant='outline-secondary'>About</Button>
          </Link>
          <Link className='ms-1' to='/admin'>
            <Button variant='outline-secondary'>Admin</Button>
          </Link>
          {
            isLoggedIn ?
              <Button onClick={logout}
                className='ms-auto me-0'
                variant='outline-danger'>Logout</Button>
              : null
          }
        </Col>
      </Row>
    </Container>
  )
}

export default Header