import {
  test,
  chromium,
  Browser,
  BrowserContext,
  Page,
} from "@playwright/test";
import fs from "fs";

const year = new Date().getFullYear(); // Change this to get data from a different year

function ensureReportsDir(year: number) {
  const dirName = `./bowlsnetReports/${year}`;
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, { recursive: true });
  }
}

test.beforeAll(() => {
  ensureReportsDir(year);
});

const leagues = [
  {
    day: "Leeds Monday Combined",
    url: "/Leeds-MonComb",
  },
  {
    day: "Leeds Tuesday Vets",
    url: "/Leeds-TueVets",
  },
  {
    day: "Leeds Tuesday",
    url: "/Leeds-Tue",
  },
  {
    day: "Leeds Half Holiday",
    url: "/Leeds-Wed",
  },
  {
    day: "Leeds Thursday Vets",
    url: "/Leeds-ThuVets",
  },
  {
    day: "Leeds Saturday",
    url: "/Leeds-Sat",
  },
  {
    day: "Leeds Ladies",
    url: "/LeedsLadies",
  },
  {
    day: "Mirfield",
    url: "/Mirfield",
  },
  {
    day: "Spen Valley",
    url: "/WestRiding",
  },
  {
    day: "Ossett and Horbury",
    url: "/Ossett",
  },
  {
    day: "AireWharfe Monday",
    url: "/AW-Mon",
  },
  {
    day: "AireWharfe Tuesday Pairs",
    url: "/AW-TuePairs",
  },
  {
    day: "AireWharfe Wednesday Pairs",
    url: "/AW-WedPairs",
  },
  {
    day: "AireWharfe Vets",
    url: "/AW-Vets",
  },
  {
    day: "AireWharfe Wednesday",
    url: "/AW-WedSingles",
  },
  {
    day: "AireWharfe Saturday",
    url: "/AW-Sat",
  },
  {
    day: "Bradford Monday",
    url: "/Bradford-Mon",
  },
  {
    day: "Bradford Half Holiday",
    url: "/Bradford-HalfHol",
  },
  {
    day: "Bradford Vets",
    url: "/Bradford-Vets",
  },
  {
    day: "Bradford Pairs",
    url: "/Bradford-Pairs",
  },
  {
    day: "Bradford Saturday",
    url: "/Bradford-Sat",
  },
  {
    day: "Bradford Ladies",
    url: "/BradfordLadies",
  },
  {
    day: "Tadcaster",
    url: "/Tadcaster",
  },
  {
    day: "Tadcaster Vets",
    url: "/TadcasterVets",
  },
  {
    day: "North East Leeds Vets",
    url: "/NELeedsVets",
  },
  {
    day: "Barkston Ash",
    url: "/BarkstonAsh",
  },
  {
    day: "Heavy Woolen Afternoon",
    url: "/HeavyWoollenAfternoon",
  },
  {
    day: "Heavy Woolen Evening",
    url: "/HeavyWoollenEvening",
  },
  {
    day: "Harrogate",
    url: "/Harrogate",
  },
  {
    day: "Harrogate Vets",
    url: "/HarrogateVets",
  },
  {
    day: "Crossgates",
    url: "/Crossgates",
  },
  {
    day: "Elland",
    url: "/Halifax-Elland",
  },
  {
    day: "Halifax Tuesday Afternoon",
    url: "/Halifax-TueAfternoon",
  },
  {
    day: "Halifax Tuesday Evening",
    url: "/Halifax-TueEvening",
  },
  {
    day: "Halifax Wednesday",
    url: "/Halifax-WedEvening",
  },
  {
    day: "Halifax Thursday Afternoon",
    url: "/Halifax-ThuAfternoon",
  },
  {
    day: "Halifax Ladies Vets",
    url: "/Halifax-LadiesO55",
  },
  {
    day: "Hebden Royd Friday",
    url: "/Halifax-HRFridays",
  },
  {
    day: "Hebden Royd Evening",
    url: "/Halifax-HREvening",
  },
  {
    day: "Hebden Royd Vets",
    url: "/Halifax-HRVets",
  },
  {
    day: "Huddersfield",
    url: "/Huddersfield",
  },
  {
    day: "Huddersfield Works",
    url: "/HuddWorks",
  },
  {
    day: "Huddersfield Ladies Works",
    url: "/HuddLWorks",
  },
  {
    day: "Huddersfield Ladies",
    url: "/HuddLadies",
  },
  {
    day: "Huddersfield Ladies Afternoon",
    url: "/HuddLadiesA",
  },
  {
    day: "Huddersfield Libs",
    url: "/HuddLibs",
  },
  {
    day: "Huddersfield Vets 10",
    url: "/HuddVets-10Man",
  },
  {
    day: "Huddersfield Vets 6",
    url: "/HuddVets-6Man",
  },
  {
    day: "Huddersfield Junior",
    url: "/HuddJunior",
  },
  {
    day: "Brighouse Ladies",
    url: "/Brighouse-Ladies",
  },
  {
    day: "Brighouse Vets",
    url: "/Brighouse-Vets",
  },
  {
    day: "Brighouse Ladies Vets",
    url: "/Brighouse-LVets",
  },
  {
    day: "Castleford Wednesday",
    url: "/Castleford-Evening",
  },
  {
    day: "Castleford Evening",
    url: "/Castleford-Evening",
  },
  {
    day: "Castleford Pairs",
    url: "/Castleford-Pairs",
  },
  {
    day: "Castleford Vets Pairs",
    url: "/CastlefordVets-Pairs",
  },
  {
    day: "Castleford Vets Singles",
    url: "/CastlefordVets-Singles",
  },
  {
    day: "Wakefield Saturday",
    url: "/WakefieldSat",
  },
  {
    day: "Wakefield Vets",
    url: "/WakefieldVets",
  },
  {
    day: "Wakefield Workshops",
    url: "/WakefieldWorkshops",
  },
  {
    day: "Dewsbury Vets",
    url: "/DewsburyVets",
  },
  {
    day: "North Kirklees Vets",
    url: "/NKirklees-Vets",
  },
  {
    day: "North Kirklees Pairs",
    url: "/NKirklees-Pairs",
  },
  {
    day: "Spen Vets",
    url: "/SpenVets",
  },
  {
    day: "Skipton 54321",
    url: "/Skipton-54321",
  },
  {
    day: "Skipton Merit",
    url: "/Skipton-Merit",
  },
  {
    day: "Yorkshire Vets",
    url: "/YorkshireVets",
  },
  {
    day: "Yorkshire Ladies",
    url: "/YorkshireLP",
  },
];

for (const league of leagues) {
  test(`${league.day} Stats`, async () => {
    // Browser set up
    const browser: Browser = await chromium.launch();
    const context: BrowserContext = await browser.newContext();
    let page: Page = await context.newPage();

    // Navigate to Bowlsnet and wait for page to load
    await page.goto(`${league.url}?DB=${year}`);
    await sleep();

    // Click pop up if present
    try {
      const noticePage = page
        .locator('iframe[title="BowlsNet Page"]')
        .contentFrame()
        .getByRole("button", { name: "Continue" });
      const popUpCount = await noticePage.count();
      if (popUpCount > 0) {
        await noticePage.click();
      }
    } catch (error) {
      console.log(`No popup to click for ${league.day}, continuing...`);
    }

    // Find league fixtures
    await page
      .frameLocator('iframe[title="BowlsNet Page"]')
      .getByText("Fixtures", { exact: true })
      .click();

    await page
      .frameLocator('iframe[title="BowlsNet Page"]')
      .getByText("League Fixtures")
      .click();

    await sleep(); // Wait for the page to load

    // Export MatchCards
    await page
      .frameLocator('iframe[title="BowlsNet Page"]')
      .locator("div")
      .filter({ hasText: /^\.\.\. ▼$/ })
      .click();

    await page
      .frameLocator('iframe[title="BowlsNet Page"]')
      .getByText("Export MatchCards...")
      .click();

    const newPagePromise = page.waitForEvent("popup");
    await page
      .frameLocator('iframe[title="BowlsNet Page"]')
      .frameLocator('iframe[title="BowlsNet Dlg"]')
      .getByRole("button", { name: "In Text Format" })
      .click();

    // View report in new tab
    const newPage = await newPagePromise;
    await newPage.bringToFront();
    await newPage.waitForLoadState("domcontentloaded");

    // Create text file
    const value = await newPage.evaluate(
      () => document.querySelector("body > pre")?.textContent
    );
    const filePath = `./bowlsnetReports/${year}/${league.day}.txt`;
    fs.writeFile(filePath, value as string, (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
}

function sleep() {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}
