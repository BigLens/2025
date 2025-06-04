import { headerLogo } from '../assets/images';
import {hamburger} from '../assets/icons';

const Nav = () => {
  return (
    <section>
        <nav>
            <a href="/">
                <img 
                src={headerLogo}
                alt="Logo"
                width={130}
                height={29}

                />
            </a>
        </nav>
    </section>
  )
}

export default Nav