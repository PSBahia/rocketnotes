import { useState } from "react";

import { Container, Form, Avatar } from "./styles";
import { FiArrowLeft, FiLock, FiMail, FiUser, FiCamera } from "react-icons/fi";

import { Input } from "../../components/Input";
import { useAuth } from "../../hooks/auth";

import avatarPlaceholder from '../../assets/avatar.png'
import { api } from "../../services/api";

import { Button } from "../../components/Button";
import { Link } from "react-router-dom";

export function Profile(){
    const { user, updateProfile } = useAuth()

    const [ name, setName ] = useState(user.name)
    const [ email, setEmail ] = useState(user.email)
    const [ passwordOld, setPasswordOld ] = useState()
    const [ passwordNew, setPasswordNew ] = useState()

    const avatarURL = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder
    const [ avatar, setAvatar ] = useState(avatarURL)
    const [ avatarFile, setAvatarFile ] = useState(null)

    async function handleUpdate(){
        const updated = {
            name,
            email,
            password: passwordNew,
            old_password: passwordOld
        }

        const userUpdated = Object.assign(user, updated) 

        await updateProfile({user: userUpdated, avatarFile})
    }

    async function handleChangeAvatar(event){
        const file = event.target.files[0]
        setAvatarFile(file)

        const imagePreview = URL.createObjectURL(file)
        setAvatar(imagePreview)
    }
    
    return(
        <Container>
            <header>
                <Link to="/">
                    <FiArrowLeft/>
                </Link>
            </header>
            <Form>
                <Avatar>
                    <img 
                        src={avatar}
                        alt="Imagem do Usuário"
                    />

                    <label htmlFor="avatar">
                        <FiCamera/>
                        <input
                            id="avatar"
                            type="file"
                            onChange={handleChangeAvatar}
                        />
                    </label>
                </Avatar>
                
                <Input
                    placeholder="Nome"
                    type="text"
                    icon={FiUser}
                    value={name}
                    onChange={ e => setName(e.target.value)}
                />
                <Input
                    placeholder="E-mail"
                    type="text"
                    icon={FiMail}
                    value={email}
                    onChange={ e => setEmail(e.target.value)}
                />
                <Input
                    placeholder="Senha antiga"
                    type="password"
                    icon={FiLock}
                    onChange={ e => setPasswordOld(e.target.value)}
                />
                <Input
                    placeholder="Nova senha"
                    type="password"
                    icon={FiLock}
                    onChange={ e => setPasswordNew(e.target.value)}
                />

                <Button
                    onClick={handleUpdate}
                    title="Salvar"
                />
            </Form>
        </Container>
    )
}