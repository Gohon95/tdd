import chai from "chai";
import chaiHttp from "chai-http";
import api from "../index.js";
import { uuid } from "uuidv4";

chai.use(chaiHttp);

// IMPORTANT : For Mocha working, always use function () {}
// (never () => {})
describe("Users", function () {
  it("GET /users should return a success response with all users", function (done) {
    chai
      .request(api)
      .get("/users")
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(200);
        chai.expect(res.body.data).to.be.an("array");
        chai.expect(res.body.data.length).to.equal(2);
        res.body.data.forEach((user) => {
          chai.expect(user).to.have.property("id");
          chai.expect(user).to.have.property("firstName");
          chai.expect(user).to.have.property("lastName");
          chai.expect(user).to.have.property("birthDate");
          chai.expect(user).to.have.property("address");
          chai.expect(user).to.have.property("phone");
          chai.expect(user).to.have.property("email");
        });
        done();
      });
  });

  // res.body.data

  it("POST /users should create the user and return a success response with the user", function (done) {
    const user = {
      id: 3,
      lastName: "Marcel",
      firstName: "Tonny",
      birthDate: "13/08/2004",
      address: "22 passage apple",
      phone: "+3378145685",
      email: "marcel.test@hotmail.fr",
    };
    chai
      .request(api)
      .post("/users")
      .send(user)
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(201);
        chai.expect(res.body).to.deep.equal({
          data: user,
        });
        done();
      });
  });
  it("POST /users should return a bad request if id malformed", function (done) {
    const user = {
      id: "11",
      lastName: "Marcel",
      firstName: "Tonny",
      birthDate: "13/08/2004",
      address: "22 passage apple",
      phone: "+3378145685",
      email: "marcel.test@hotmail.fr",
    };
    chai
      .request(api)
      .post("/users")
      .send(user)
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res.body).to.deep.equal({
          error: {
            message: `L'id est incorrect`,
          },
        });
        done();
      });
  });
  it("POST /users should return a bad request if address malformed");
  it("POST /users should return a bad request if phone malformed");
  describe("Users", function () {
    describe("GET /users/:id", function () {
      it("should return a success response with found user", function (done) {
        const expectedId = "a866f424-1c55-42e8-9441-40e22dda867b";
        chai
          .request(api)
          .get(`/users/${expectedId}`)
          .end((_, res) => {
            chai.expect(res.statusCode).to.equal(200);
            chai.expect(res.body).to.deep.equal({
              data: {
                lastName: "testPut",
                firstName: "TestPutFirst",
                birthDate: "13/08/2005",
                address: "22 passage microsoft",
                phone: "+3378145685",
                email: "marcel.test@hotmail.com",
              },
            });
            done();
          });
      });
    });
  });

  it("GET /users/:id should return not found response if the user does not exists", function (done) {
    chai
      .request(api)
      .get("/users/340")
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(404);
        chai.expect(res.body).to.deep.equal({
          error: "user 340 not found",
        });
        done();
      });
  });
  it("PUT /users/:id should return a success response with found user", function (done) {
    const user = {
      id: 1,
      lastName: "Paul",
      firstName: "Jean",
      birthDate: "13/08/2000",
      address: "24 passage poudlard",
      phone: "+3378145685",
      email: "paul.test@hotmail.fr",
    };
    chai
      .request(api)
      .put("/users/1")
      .send(user)
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(200);
        chai.expect(res.body).to.deep.equal({
          data: {
            id: 1,
            lastName: "testPut",
            firstName: "TestPutFirst",
            birthDate: "13/08/2005",
            address: "22 passage microsoft",
            phone: "+3378145685",
            email: "marcel.test@hotmail.com",
          },
        });
        done();
      });
  });
  it("PUT /users/:id should return not found response if the user does not exists", function (done) {
    const user = {
      id: 90,
      lastName: "testPutdddd",
      firstName: 3,
      birthDate: "13/08/2005",
      address: "22 passage microsoft",
      phone: "+3378145685",
      email: "marcel.test@hotmail.com",
    };
    chai
      .request(api)
      .put("/users/4")
      .send(user)
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(404);
        chai.expect(res.body).to.deep.equal({
          error: "user 4 not found",
        });
        done();
      });
  });
  it("PUT /users/:id : should return a bad request if firstName malformed", function (done) {
    const updateduser = {
      id: 8,
      lastName: "Paul",
      birthDate: "13/08/2000",
      address: "24 passage poudlard",
      phone: "+3378145685",
      email: "paul.test@hotmail.fr",
    };
    chai
      .request(api)
      .put("/users/8")
      .send(updateduser)
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(404);
        chai.expect(res.body).to.deep.equal({
          error: `user 8 not found`,
        });
        done();
      });
  });
  it("DELETE /users/:id should return a success response", function (done) {
    chai
      .request(api)
      .delete("/users/1")
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(200);
        chai.expect(res.body).to.deep.equal({
          meta: {
            _deleted: [{}],
          },
        });
        done();
      });
  });
  it("DELETE /users/:id should return not found response if the user does not exists", function (done) {
    chai
      .request(api)
      .delete("/users")
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(404);
        chai.expect(res.body).to.deep.equal({});
        done();
      });
  });
});
