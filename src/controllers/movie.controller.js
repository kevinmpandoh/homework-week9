const models = require('../models');
const Movie = models.Movies;

const getAllMovies = async (req, res) => {
    try {        
        const size = parseInt(req.query.size);
        const page = parseInt(req.query.page);
        const limit = size ? size : null;
        const offset = limit ? (page - 1) * limit : null

        const movies = await Movie.findAll({
            limit,
            offset
        });
        if(!movies[0]) return res.status(404).json({
            status: "404",
            message: "Data belum ada",
        })
        res.status(200).json({
            status: "200",
            message: "berhasil",
            data: movies
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal mengambil data' });
    }
};

const getMovieById = async (req, res) => {
    try {
        const id = req.params.id;
        const movie = await Movie.findByPk(id)
    
        if(!movie) return res.status(404).json({
            status: "404",
            message: "Data tidak ditemukkan",
        })
    
        res.status(200).json({
            status: "200",
            message: "berhasil",
            data: movie
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal mengambil data' });
    }
}

const createMovie = async (req, res) => {
    try {
        const movie = await Movie.create(req.body)
        res.status(201).json({
            status: "201",
            message: "Data movie berhasil ditambahkan",
            data: movie
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal menambahkan data' });
    }
}

const updateMovieById = async (req, res) => {
    try {
        const id = req.params.id;
        const movie = await Movie.findByPk(id)
    
        if(!movie) return res.status(404).json({
            status: "404",
            message: "Data tidak ditemukkan",
        })
    
        await Movie.update(req.body, {
            where: {
                id
            }
        });
    
        res.status(200).json({
            status: "200",
            message: "Data movie berhasil diubah"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal mengubah data' });
    }
}

const deleteMovieById = async (req, res) => {
    try {
        const id = req.params.id;
        const movie = await Movie.findByPk(id)
    
        if(!movie) return res.status(404).json({
            status: "404",
            message: "Data tidak ditemukkan",
        })
    
        await movie.destroy();
    
        res.status(204).json({
            status: "204",
            message: "Data movie berhasil dihapus"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal menghapus data' });
    }
}

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovieById,
    deleteMovieById
}