import { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Box, Typography, TextField, Button, Link } from '@mui/material';
import { customTextField } from '../styles/CustomTextField';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../config/backendUrl';
import { urlEncodedHeader } from '../config/Headers';

export const SignUp = () => {
    const [message, setMessage] = useState('');
    const [cookies, setCookie] = useCookies(['access_token', 'refresh_token', 'id', 'password']);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const signUp = {
            login_id: data.get('id'),
            login_password: data.get('password'),
        };
        const signIn = {
            username: data.get('id'),
            password: data.get('password'),
        };

        // QRコード用
        setCookie('id', data.get('id'));
        setCookie('password', data.get('password'));

        try {
            await axios.post(`${backendUrl}/auth/account`, signUp)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                });
            setMessage('Account created successfully!');
        } catch (error) {
            setMessage('Account creation failed. Please try again.');
            console.error('Account creation failed:', error);
        }

        try {
            const result = await axios.post(`${backendUrl}/auth/token`, signIn, urlEncodedHeader);
            if (result != null) {
                setCookie('access_token', result.data.access_token);
                setCookie('refresh_token', result.data.refresh_token);
                setMessage('Login successful!');
                navigate('/home');
            }
        } catch (error) {
            setMessage('Login failed. Please try again.');
            console.error('Login failed:', error);
        }


    };

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography component="h1" variant="h5">
                アカウントを作成
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="id"
                    label="ID"
                    name="id"
                    autoComplete="id"
                    autoFocus
                    sx={customTextField}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    sx={customTextField}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    サインアップ
                </Button>
                {message && <p>{message}</p>}
                <Link href="/" variant="body2">
                    {"すでにアカウントを持っていますか？ サインイン"}
                </Link>
            </Box>
        </Box>
    );
}
