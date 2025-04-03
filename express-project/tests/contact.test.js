const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server");
const jwt = require('jsonwebtoken')
const User = require("../models/userModel");
const Contact = require("../models/contactModel");
const bcrypt = require('bcrypt');
require("dotenv").config();

let token;
let userId;
let contactId;

beforeEach(async () => {
    await mongoose.connect(process.env.CONNECTION_STRING_TEST);
    const user = await User.create({
      username: "testuser",
      email: "test@example.com",
      password: await bcrypt.hash("password", 10),  
    });
  
    userId = user._id; 
  
    token = jwt.sign(
      { user: { id: userId } }, 
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    const contact = await Contact.create({
      user_id: userId,
      name: "Kontakt iz testa",
      email: "kon@mail.com",
      phone: "1357902468",
    });
  
    contactId = contact._id;
  });

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });
  

  describe("/api/contacts", () => {

    it("Should return all user contacts", async () => {
      const res = await request(app)
        .get("/api/contacts")
        .set("Cookie", `jwt=${token}`); 
  
      expect(res.statusCode).toBe(200);
      expect(res.body.contacts.length).toBeGreaterThan(0);
    });

    it("Should return a contact", async () => {
      const res = await request(app)
        .get(`/api/contacts/${contactId}`)
        .set("Cookie", `jwt=${token}`); 
  
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe("Kontakt iz testa");
    });

    it("Should create a contact", async () => {
      const res = await request(app)
        .post("/api/contacts")
        .set("Cookie", `jwt=${token}`)
        .send({
          name: "Kontakt iz testa create",
          email: "kon@mail.com",
          phone: "1357902468",
        }); 
  
      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe("Kontakt iz testa create");
    });

    it("Should not create contact with missing fields", async () => {
      try{
        const res = await request(app)
        .post("/api/contacts")
        .set("Cookie", `jwt=${token}`)
        .send({
          name: "Kontakt iz testa create",
          phone: "1357902468",
        });
      } catch (error) {
        expect(error.statusCode).toBe(400);
        expect(error.message).toBe('All fields are required!');
      }
    });

    it("Should update a contact", async () => {
      const res = await request(app)
        .put(`/api/contacts/${contactId}`)
        .set("Cookie", `jwt=${token}`)
        .send({
          name: "Kontakt iz testa updated",
          email: "kon@mail.com",
          phone: "1357902468",
        }); 
  
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe("Kontakt iz testa updated");
    });

    it("Should delete a contact", async () => {
      const res = await request(app)
        .delete(`/api/contacts/${contactId}`)
        .set("Cookie", `jwt=${token}`);
      expect(res.statusCode).toBe(204);
    });
  });

