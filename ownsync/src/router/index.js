import Login from '@/components/Login'
import Home from '@/components/Main'
import Settings from '@/components/Settings'
import AddUser from '@/components/AddUser'
import Medias from '@/components/Medias'

export default [
  {
    path: '/',
    name: 'Main',
    component: Home
  },
  {
    path: '/media',
    name: 'Medias',
    component: Medias
  },
  {
    path: '/add',
    name: 'AddUser',
    component: AddUser
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]
