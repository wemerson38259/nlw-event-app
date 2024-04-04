import UnityIcon from '../assets/unityIcon.svg'
import NavLink from './nav-link'

export function Header() {
  return (
    <div className='flex items-center gap-5 py-2'>
        <img src={UnityIcon} alt="" />
        <nav className='flex items-center gap-5'>
            <NavLink href='./eventos'>Evento</NavLink>
            <NavLink href='./participantes'>Participantes</NavLink>
        </nav>
    </div>
  )
}
