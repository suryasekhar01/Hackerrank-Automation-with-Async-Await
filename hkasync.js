const puppeteer = require('puppeteer')
const codeobj = require("./codes");

const loginLink = 'https://www.hackerrank.com/auth/login'
const email = 'uihfltu@gumaygo.com'
const password = 'userone';





let page;


(async function () {
    try {
        let browserOpen = puppeteer.launch({
            headless: false,

            args: ['--start-maximized'],

            defaultViewport: null
        })

        let browserObj = await browserOpen;
        console.log("Browser opened");
        page = await browserObj.newPage();
        console.log("page opened");
        await page.goto("https://www.hackerrank.com/auth/login");
        await page.type(".ui-tooltip-wrapper input[type='text']", "uihfltu@gumaygo.com");
        await page.type(".ui-tooltip-wrapper input[type='password']", "userone");
        await page.click(".auth-button span");
        console.log("algo clicked");
        await waitAndClick("div[data-automation='algorithms']", page);
        console.log("warmup clicked");
        await waitAndClick("input[value='warmup']", page);
        await page.waitFor(1000);

        console.log("challenge opened");
        let quesArr = await page.$$(".challenge-submit-btn", {
            delay: 100
        });
        console.log("no. of questions", quesArr.length);

        for (let i = 0; i < 2; i++) {
            quesArr = await page.$$(".challenge-submit-btn", {
                delay: 100
            });

            await questionSolver(page, quesArr[i], codeobj.answers[i]);

            console.log("question solved");
            await page.goBack();
            await page.waitFor(3000);
        }
    } catch (error) {
        console.log(err);
    }
})()

async function waitAndClick(selector, cPage) {
    await cPage.waitForSelector(selector)
    let selectorClicked = cPage.click(selector)
    return selectorClicked
}


function questionSolver(page, question, answer) {
    return new Promise(function (resolve, reject) {
        (async function fn() {
            try {
                await question.click();;
                await waitAndClick(".monaco-editor,no-user-select.vs", page);
                await waitAndClick(".checkbox-input", page);
                await page.waitForSelector("textarea.custominput", {
                    visible: true
                });
                await page.type("textarea.custominput", answer, {
                    deial: 10
                });
                await page.keyboard.down("Control");
                await page.keyboard.press("A", {
                    delay: 100
                });
                await page.keyboard.press("X", {
                    delay: 100
                });
                await page.keyboard.up("Control");
                await waitAndClick(".monaco-editor,no-user-select.vs", page);
                await page.keyboard.down("Control");
                await page.keyboard.press("A", {
                    delay: 100
                });
                await page.keyboard.press("V", {
                    delay: 100
                });
                await page.keyboard.up("Control");
                await page.click(".ui-btn-secondary.pull-right");
                await page.waitFor(10000);
                resolve();
            } catch (err) {
                reject(err);
            }
        })()

    })
}