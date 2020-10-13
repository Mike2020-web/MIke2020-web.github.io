/**
 * QPonController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    home: async function (req, res) {

        return res.view('QPon/home');
    },


    json: async function (req, res) {

        var qpon = await QPon.find();

        return res.json(qpon);
    },

    create: async function (req, res) {

        if (req.method == "GET") return res.view('QPon/create');

        var qpon = await QPon.create(req.body).fetch();

        return res.status(201).json({ id: qpon.id });
    },

    admin: async function (req, res) {
        var qpon = await QPon.find();

        return res.view('QPon/admin', { qpons: qpon });
    },

    update: async function (req, res) {

        if (req.method == "GET") {
    
            var thatQPon = await QPon.findOne(req.params.id);
    
            if (!thatQPon) return res.notFound();
    
            return res.view('QPon/update', { qpon: thatQPon });
            
        } else {
        
            var updatedQPon = await QPon.updateOne(req.params.id).set(req.body);
    
            if (!updatedQPon) return res.notFound();
    
            return res.ok();
        }
    },
};

