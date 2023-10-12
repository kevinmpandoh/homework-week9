const bcrypt = require('bcrypt');
const User = require('../models').Users;
const { signToken } = require('../utils/auth');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({
            status: "200",
            message: "berhasil",
            data: users
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal mengambil pengguna' });
    }
};

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body        
        const user = await User.findOne({
            where: {
                email,            
            }
        });

        // Jika pengguna tidak ditemukan, kirim pesan error
        if (!user) {
            return res.status(401).json({
                error: 'Email atau kata sandi salah.' 
            });
        }

        // Verifikasi kata sandi
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!user) {
            return res.status(404).json({
                message: "Email / passowrd salah!"
            })
        }

        if (passwordMatch) {
            // Kata sandi cocok, buat token JWT            
            const token = signToken(user.dataValues);

            res.json({ 
                status: '200',
                message: 'Login berhasil', 
                token 
            });
        } else {
            res.status(401).json({ error: 'Email atau kata sandi salah.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal login' });
    }
}

const userRegister = async (req, res) => {
    try {
        const {email, gender, password, role } = req.body;

        // Cek apakah email sudah terdaftar
        const existingUser = await User.findOne({ where: { email } })
        if (existingUser) {
            return res.status(400).json({
                message: "Email sudah terdaftar"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            gender,
            password: hashedPassword,
            role
        });

        res.status(200).json({
            status: "200",
            message: "Pendaftaran berhasil",
            data: user
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "500",
            message: "Gagal mendaftar"
        })
    }
}

module.exports = {
    getAllUsers,
    userLogin,
    userRegister
}