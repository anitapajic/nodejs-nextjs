const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server");
const jwt = require('jsonwebtoken')
const User = require("../models/userModel");
const bcrypt = require('bcrypt');
require("dotenv").config();

let token;
let userId;

beforeAll(async () => {
    await mongoose.connect(process.env.CONNECTION_STRING_TEST);

    const user = await User.create({
      username: "testuser",
      email: "testuser@example.com",
      password: await bcrypt.hash("123456", 10),  
    });
  
    userId = user._id; 

    token = jwt.sign(
          { user: { id: userId, email: user.email } }, 
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1h" }
        );
  });
  
  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  describe("User Controller", () => {
    it("Should register a user successfully", async () => {
      const res = await request(app).post("/api/users/register").send({
        username: "newuser",
        email: "newuser@example.com",
        password: "123456",
      });
  
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("_id");
      expect(res.body.username).toBe("newuser");
      expect(res.body.email).toBe("newuser@example.com");
    });
  
    it("Should not register a user with missing fields", async () => {
      try{
        const res = await request(app).post("/api/users/register").send({
            username: "failuser",
            email: "fail@example.com",
            });
      } catch (error) {
        expect(error.statusCode).toBe(400);
        expect(error.message).toBe('All fields are required!');
      }
    });
  
    it("Should not register a user with an invalid email", async () => {
        try {
            const res = await request(app).post("/api/users/register").send({
                username: "failuser",
                email: "invalid-email",
                password: "123456",
                });
        } catch (error){
            expect(error.statusCode).toBe(400);
            expect(error.message).toBe("Invalid email format!");
        }
    });
  
    it("Should not register a user if email is already in use", async () => {
        try {
            const res = await request(app).post("/api/users/register").send({
                username: "anotheruser",
                email: "testuser@example.com", 
                password: "123456",
              });
        } catch (error) {
            expect(error.statusCode).toBe(400);
            expect(error.message).toBe("User already registered!");
        }
    });
  
    it("Should log in a user successfully", async () => {
      const res = await request(app).post("/api/users/login").send({
        email: "testuser@example.com",
        password: "123456",
      });
  
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Successfully logged in");
      expect(res.headers["set-cookie"]).toBeDefined();
    });
  
    it("Should not log in with incorrect credentials", async () => {
        try {
            const res = await request(app).post("/api/users/login").send({
                email: "testuser@example.com",
                password: "WrongPassword!",
              });
        } catch (error) {
            expect(error.statusCode).toBe(401);
            expect(error.message).toBe("Invalid email or password!");
        }
    });
  
    it("Should get current user data", async () => {
      const res = await request(app)
      .get("/api/users/current")
      .set("Cookie", `jwt=${token}`)
      .send({
        email: "testuser@example.com",
        password: "123456",
      });
  
      expect(res.statusCode).toBe(200);
      expect(res.body.email).toBe("testuser@example.com");
    });
  
    it("Should log out a user", async () => {
      const res = await request(app)
      .post("/api/users/logout")
      .set("Cookie", `jwt=${token}`)
      .send({
        email: "testuser@example.com",
        password: "123456",
      });
  
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Successfully logged out");
    });
  });