const indexCrl = {}

indexCrl.renderIndex = (req, res) => {
    res.render('index')
};

indexCrl.renderAbout = (req, res) => {
    res.render('about');
};

module.exports = indexCrl;