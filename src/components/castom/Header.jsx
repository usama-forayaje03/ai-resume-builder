import { Link } from 'react-router-dom'
import {Button} from '../ui/button'
import { UserButton, useUser } from '@clerk/clerk-react'

export default function Header() {
const {user, isSignedIn} = useUser()
  return (
    <div className='flex justify-between p-3 px-5 shadow-md'>
      <img src="./logo.svg" alt="Logo" width={50} height={50} />
      { isSignedIn ?
      <div className='flex gap-2 items-center '>
        <Link to={'/dashBoard'}>
        <Button variant='outline'>Dashboard</Button>
        </Link>
        <UserButton/>
      </div>
      :
      <Link to={'/auth/sign-in'}>
      <Button>Get Started</Button>
      </Link>
        
      }
      
    </div>
  )
}
