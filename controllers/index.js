var IndexController = {
 getIndex: function (request, response) {
   var locals = {};
   response.render('../public/index.html', locals);
 }
};

module.exports = IndexController;
