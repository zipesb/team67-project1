/*
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
*/



const puppeteer = require("puppeteer");

test("Confirm landing page and buttons", async () => {
    const browser = await puppeteer.launch();
    try {
      const page = await browser.newPage();
  
      await page.goto("http://localhost:3000");
  
      //check expected text on landing page
      let landingpageText = await page.$("#landingpageText");
      let landingpageTextValue = await landingpageText.evaluate((el) => el.textContent);
      expect(landingpageTextValue).toContain("ClassHubJoin the learning revolution today");
  
      //check that login button navigates to login screen
      const navLoginPromise = page.waitForNavigation();
      await page.click("#loginButton");
      await navLoginPromise;

      let loginBelow = await page.$("#loginBelow");
      let loginBelowValue = await loginBelow.evaluate((el) => el.textContent);
      expect(loginBelowValue).toContain("Login below");

      //go back to landing page
      await page.goto("http://localhost:3000");
  
      //check that register button navigates to register screen
      const navRegisterPromise = page.waitForNavigation();
      await page.click("#registerButton");
      await navRegisterPromise;

      let registerBelow = await page.$("#registerBelow");
      let registerBelowValue = await registerBelow.evaluate((el) => el.textContent);
      expect(registerBelowValue).toContain("Register below");
    } finally {
      await browser.close();
    }
  }, 120000);



test("Confirm login page", async () => {
    const browser = await puppeteer.launch();
    try {
      const page = await browser.newPage();
  
      await page.goto("http://localhost:3000/login");
  
      //check that email validation works
      await page.waitForSelector("#email");
      await page.type("#email", "");
      await page.type("#password", "");
      await page.click("#submitButton");
      await page.waitForSelector("#errorMessages");
      let errorMessages1 = await page.$("#errorMessages");
      let errorMessagesValue1 = await errorMessages1.evaluate((el) => el.textContent);
      expect(errorMessagesValue1).toContain("ERRORS:{\"email\":\"Email field is required\",\"password\":\"Password field is required\"}");

      await page.type("#email", "bademailfield");
      await page.type("#password", "badpasswordfield");
      await page.click("#submitButton");
      await page.waitForSelector("#errorMessages");
      let errorMessages2 = await page.$("#errorMessages");
      let errorMessagesValue2 = await errorMessages2.evaluate((el) => el.textContent);
      expect(errorMessagesValue2).toContain("ERRORS:{\"email\":\"Email is invalid\"}");
      await page.reload();

      //check that password validation works
      await page.type("#email", "test@testnotreal.com");
      await page.type("#password", "badpasswordfield");
      await page.click("#submitButton");
      await page.waitForSelector("#errorMessages");
      let errorMessages3 = await page.$("#errorMessages");
      let errorMessagesValue3 = await errorMessages3.evaluate((el) => el.textContent);
      expect(errorMessagesValue3).toContain("ERRORS:{\"passwordincorrect\":\"Password incorrect\"}");
      await page.reload();

      //check that login with real account then navigates to user dashboard
      await page.waitForSelector("#email");
      await page.type("#email", "test@testnotreal.com");
      await page.type("#password", "password123");
      
      const navigationPromise = page.waitForNavigation();
      await page.click("#submitButton");
      await navigationPromise;
  
      await page.waitForSelector("#welcomeMessage");
      let welcomeMessage = await page.$("#welcomeMessage");
      let welcomeMessageValue = await welcomeMessage.evaluate((el) => el.textContent);
      expect(welcomeMessageValue).toContain("You're logged in, nice to see you test");
      
    } finally {
      await browser.close();
    }
  }, 120000);



test("Confirm register page", async () => {
    const browser = await puppeteer.launch();
    try {
      const page = await browser.newPage();
  
      await page.goto("http://localhost:3000/register");
  
      //check that empty validation works
      await page.waitForSelector("#email");
      await page.type("#name", "");
      await page.type("#username", "");
      await page.type("#email", "");
      await page.type("#password", "");
      await page.type("#password2", "");
      await page.click("#submitButton");
      await page.waitForSelector("#errorMessages");
      let errorMessages1 = await page.$("#errorMessages");
      let errorMessagesValue1 = await errorMessages1.evaluate((el) => el.textContent);
      expect(errorMessagesValue1).toContain("ERRORS:{\"name\":\"Name field is required\",\"username\":\"Username field is required\",\"email\":\"Email field is required\",\"password\":\"Password must be at least 6 characters\",\"password2\":\"Confirm password field is required\"}");
      await page.reload();

      //check that username validation works
      await page.waitForSelector("#email");
      await page.type("#name", "test user");
      await page.type("#username", "test");
      await page.type("#email", "validemailthatisnotinuseindatabase@validemail.com");
      await page.type("#password", "password123");
      await page.type("#password2", "password123");
      await page.click("#submitButton");
      await page.waitForSelector("#errorMessages");
      let errorMessages2 = await page.$("#errorMessages");
      let errorMessagesValue2 = await errorMessages2.evaluate((el) => el.textContent);
      expect(errorMessagesValue2).toContain("ERRORS:{\"username\":\"Username already exists\"}");
      await page.reload();

      //check that email validation works
      await page.waitForSelector("#email");
      await page.type("#name", "test user");
      await page.type("#username", "testusernamethatisnotinuseindatabase");
      await page.type("#email", "bademail");
      await page.type("#password", "password123");
      await page.type("#password2", "password123");
      await page.click("#submitButton");
      await page.waitForSelector("#errorMessages");
      let errorMessages3 = await page.$("#errorMessages");
      let errorMessagesValue3 = await errorMessages3.evaluate((el) => el.textContent);
      expect(errorMessagesValue3).toContain("ERRORS:{\"email\":\"Email is invalid\"}");
      await page.reload();

      await page.waitForSelector("#email");
      await page.type("#name", "test user");
      await page.type("#username", "testusernamethatisnotinuseindatabase");
      await page.type("#email", "test@testnotreal.com");
      await page.type("#password", "password123");
      await page.type("#password2", "password123");
      await page.click("#submitButton");
      await page.waitForSelector("#errorMessages");
      let errorMessages4 = await page.$("#errorMessages");
      let errorMessagesValue4 = await errorMessages4.evaluate((el) => el.textContent);
      expect(errorMessagesValue4).toContain("ERRORS:{\"email\":\"Email already exists\"}");
      await page.reload();

      //check that password validation works
      await page.waitForSelector("#email");
      await page.type("#name", "test user");
      await page.type("#username", "testusernamethatisnotinuseindatabase");
      await page.type("#email", "testuser@emailthatisnotinthedatabase.com");
      await page.type("#password", "short");
      await page.type("#password2", "short");
      await page.click("#submitButton");
      await page.waitForSelector("#errorMessages");
      let errorMessages5 = await page.$("#errorMessages");
      let errorMessagesValue5 = await errorMessages5.evaluate((el) => el.textContent);
      expect(errorMessagesValue5).toContain("ERRORS:{\"password\":\"Password must be at least 6 characters\"}");
      await page.reload();

      await page.waitForSelector("#email");
      await page.type("#name", "test user");
      await page.type("#username", "testusernamethatisnotinuseindatabase");
      await page.type("#email", "testuser@emailthatisnotinthedatabase.com");
      await page.type("#password", "thesepasswords");
      await page.type("#password2", "donotmatcheachother");
      await page.click("#submitButton");
      await page.waitForSelector("#errorMessages");
      let errorMessages6 = await page.$("#errorMessages");
      let errorMessagesValue6 = await errorMessages6.evaluate((el) => el.textContent);
      expect(errorMessagesValue6).toContain("ERRORS:{\"password2\":\"Passwords must match\"}");
      await page.reload();

      //check that login with real account then navigates to user dashboard
      
    } finally {
      await browser.close();
    }
  }, 120000);