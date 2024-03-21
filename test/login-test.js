let chai = require ('chai');
let chaiHttp = require ('chai-http');
let expect = chai.expect;

chai.use(chaiHttp);
const url = 'http://localhost:3000/api';
