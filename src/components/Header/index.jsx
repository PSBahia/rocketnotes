import { Container, Profile, Logout } from "./styles";
import { RiShutDownLine } from "react-icons/ri";
import { useAuth } from "../../hooks/auth";

import avatarPlaceholder from '../../assets/avatar.png'

import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

export function Header(){

    const { signOut, user } = useAuth()
    const navigate = useNavigate()

    function handleSignout(){
        navigate("/")
        signOut()
    }

    const avatarURL = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder

    return(
        <Container>
            <Profile to="/profile">
                <img src={avatarURL} alt={user.name} />

                <div>
                    <span>Bem Vindo</span>
                    <span><strong>{user.name}</strong></span>
                </div>
            </Profile>
            <Logout onClick={handleSignout}>
                <RiShutDownLine/>
            </Logout>
        </Container>
    )
}