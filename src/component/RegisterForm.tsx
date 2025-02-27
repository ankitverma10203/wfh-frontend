import { ChangeEvent, useState } from 'react'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import { RoleOptions } from '../Constants'
import Button from '@mui/material/Button'
import { RegisterInput } from '../Types'
import { register } from '../service/RegistrationService'
import Typography from '@mui/material/Typography'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

function RegisterForm() {

    const defaultRegisterFormData: RegisterInput = {
        name: '',
        email: '',
        password: '',
        role: RoleOptions.EMPLOYEE
    }
    const [registerInput, setRegisterInput] = useState<RegisterInput>(defaultRegisterFormData);
    const navigate = useNavigate();
    const {getAccessTokenSilently} = useAuth0();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRegisterInput({ ...registerInput, [e.target.name]: e.target.value });
    }

    const handleRegistration = async () => {
        const token = await getAccessTokenSilently();
        var successFlag: boolean = await register(registerInput, token);
        setRegisterInput(defaultRegisterFormData);
        navigate("/login");
    }

    return (
        <>
            <Box
                my={4}
                display="flex"
                flexDirection={'column'}
                gap={2}
                p={4}
                sx={{ border: '2px solid grey', backgroundColor: "white", minWidth: '30vw', maxWidth: '60vw' }}
            >
                <Typography variant="h2" sx={{ color: 'black' }}>
                    Register
                </Typography>

                <TextField
                    required
                    id="name"
                    label="Employee Name"
                    placeholder="Name"
                    name='name'
                    value={registerInput.name}
                    onChange={handleChange}
                />

                <TextField
                    required
                    id="email"
                    label="Employee Email"
                    placeholder="Email"
                    name='email'
                    type="email"
                    value={registerInput.email}
                    onChange={handleChange}
                />

                <TextField
                    required
                    id="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    name='password'
                    value={registerInput.password}
                    onChange={handleChange}
                />

                <TextField
                    required
                    id="employee-role"
                    label="Employee Role:"
                    select
                    name='role'
                    value={registerInput.role}
                    onChange={handleChange}
                >
                    {Object.values(RoleOptions)
                        .map(roleOption => (
                            <MenuItem key={roleOption} value={roleOption}>{roleOption}</MenuItem>
                        ))}
                </TextField>

                <Button variant="outlined" type='submit' onClick={handleRegistration}>Register</Button>

                <Typography variant="body1" sx={{ color: 'black' }}>
                    Already Registered? Click here to <NavLink to="/Login">Login</NavLink>
                </Typography>
            </Box>

        </>
    )
}

export default RegisterForm
