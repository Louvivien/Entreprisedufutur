// /Users/vivien/Documents/Entreprisedufutur/src/pages/Loginpage.jsx

import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaGoogle } from 'react-icons/fa'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Card } from '../components/Card'
import DividerWithText from '../components/DividerWithText'
import { Layout } from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import useMounted from '../hooks/useMounted'

export default function Loginpage() {
  const history = useHistory()
  const { signInWithGoogle, login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()
  // const mounted = useRef(false)
  const location = useLocation()

  // useEffect(() => {
  //   mounted.current = true
  //   return () => {
  //     mounted.current = false
  //   }
  // }, [])

  const mounted = useMounted()

  function handleRedirectToOrBack() {
    // console.log(location?.state)
    history.replace(location.state?.from ?? '/')
    // if (location.state) {
    //   history.replace(location.state?.from)
    // } else {
    //   history.replace('/profile')
    // }
  }

  return (
    <Layout>
      <Heading textAlign='center' my={12}>
        Connexion
      </Heading>
      <Card maxW='md' mx='auto' mt={4}>
        <chakra.form
          onSubmit={async e => {
            e.preventDefault()
            if (!email || !password) {
              toast({
                description: 'Mot de passe non valide.',
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
              return
            }
            // your login logic here
            setIsSubmitting(true)
            login(email, password)
              .then(res => {
                handleRedirectToOrBack()
              })
              .catch(error => {
                console.log(error.message)
                toast({
                  description: error.message,
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
                })
              })
              .finally(() => {
                // setTimeout(() => {
                //   mounted.current && setIsSubmitting(false)
                //   console.log(mounted.current)
                // }, 1000)
                mounted.current && setIsSubmitting(false)
              })
          }}
        >
          <Stack spacing='6'>
            <FormControl id='email'>
              <FormLabel>Email</FormLabel>
              <Input
                name='email'
                type='email'
                autoComplete='email'
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id='password'>
              <FormLabel>Mot de passe</FormLabel>
              <Input
                name='password'
                type='password'
                autoComplete='password'
                value={password}
                required
                onChange={e => setPassword(e.target.value)}
              />
            </FormControl>
            {/* <PasswordField /> */}
            <Button
              type='submit'
              colorScheme='pink'
              size='lg'
              fontSize='md'
              isLoading={isSubmitting}
            >
              Se connecter
            </Button>
          </Stack>
        </chakra.form>
        <HStack justifyContent='space-between' my={4}>
          
        <Link to='/forgot-password'>
          <Button variant='link'>
            Mot de passe oublié ?
          </Button>
        </Link>

          <Button variant='link' onClick={() => history.push('/register')}>
            S'inscrire
          </Button>
        </HStack>
        <DividerWithText my={6}>OU</DividerWithText>
        <Button
          variant='outline'
          isFullWidth
          colorScheme='red'
          leftIcon={<FaGoogle />}
          onClick={() =>
            signInWithGoogle()
              .then(user => {
                handleRedirectToOrBack()
                console.log(user)
              })
              .catch(e => console.log(e.message))
          }
        >
          Se connecter avec Google
        </Button>
      </Card>
    </Layout>
  )
}
