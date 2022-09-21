import {fixture} from "testcafe";
import {SelectSnapshot} from "../dom-snapshot";

fixture("This is a test suite").beforeEach(async t => {
  await t.navigateTo(process.env.TEST_URL);
})

test("should list all products", async t => {
  const expected = {
    "products": [
      {
        "banner": {
          "url": `${process.env.TEST_URL}/3bba74379deaf954beb755de357da03e.jpg`
        },
        "title": {
          "text": "Forge Laptop Sticker"
        },
        "description": [
          {
            "text": "JBoss Community Forge Project Sticker"
          }
        ]
      },
      {
        "banner": {
          "url": `${process.env.TEST_URL}/768473f4c2d067b7a046cbcee562ce41.jpg`
        },
        "title": {
          "text": "Solid Performance Polo"
        },
        "description": [
          {
            "text": "Moisture-wicking, antimicrobial 100% polyester design wicks for life of garment. No-curl, rib-knit collar..."
          }
        ],
      },
      {
        "banner": {
          "url": `${process.env.TEST_URL}/d1256eed062389d6ea00c737a4d1475b.jpg`
        },
        "title": {
          "text": "Ogio Caliber Polo"
        },
        "description": [
          {
            "text": "Moisture-wicking 100% polyester. Rib-knit collar and cuffs; Ogio jacquard tape insitem_ide neck; bar-tacked three-button placket with..."
          }
        ],
      },
      {
        "banner": {
          "url": `${process.env.TEST_URL}/d2eefe9e49d26d16de7f77308d9d9761.jpg`
        },
        "title": {
          "text": "16 oz. Vortex Tumbler"
        },
        "description": [
          {
            "text": "Double-wall insulated, BPA-free, acrylic cup. Push-on litem_id with thumb-slitem_ide closure; for hot and cold beverages. Holds 16 oz. Hand wash only. Imprint. Clear."
          }
        ],
      },
      {
        "banner": {
          "url": `${process.env.TEST_URL}/a7b6cc5cede091baeddca7bd4f48bd03.jpg`
        },
        "title": {
          "text": "Pebble Smart Watch"
        },
        "description": [
          {
            "text": "Smart glasses and smart watches are perhaps two of the most exciting developments in recent years. "
          }
        ],
      },
      {
        "banner": {
          "url": `${process.env.TEST_URL}/ecce27d320faedbc57f033ef5825cf47.jpg`
        },
        "title": {
          "text": "Oculus Rift"
        },
        "description": [
          {
            "text": "The world of gaming has a* Connection #0 to host localhost left intact also undergone some very unique and compelling tech advances in recent years. Virtual reality..."
          }
        ],
      },
      {
        "banner": {
          "url": `${process.env.TEST_URL}/91f8b568f7ebdbcfef887f301ae6456e.jpg`
        },
        "title": {
          "text": "Lytro Camera"
        },
        "description": [
          {
            "text": "Consumers who want to up their photography game are looking at newfangled cameras like the Lytro Field camera, designed to ..."
          }
        ],
      }
    ]
  };

  const reviewSnapshot = SelectSnapshot("#app > .MuiContainer-root > .MuiBox-root:nth-child(2)").match([{
    name: "products",
    cssSelector: "#app > div > div.MuiBox-root.jss3 > div"
  }, {
    name: "banner",
    cssSelector: "img",
    contentAttrs: {
      url: (img: HTMLImageElement) => img.src
    }
  }, {
    name: "title",
    cssSelector: ".MuiGrid-root.MuiGrid-item > .MuiBox-root h6",
    contentAttrs: {
      text: node => node.textContent
    }
  }, {
    name: "description",
    cssSelector: ".MuiGrid-root.MuiGrid-item > .MuiBox-root p",
    contentAttrs: {
      text: node => node.textContent
    }
  }], expected);

  await t.expect(reviewSnapshot).eql(true)
})

test("should show all reviews", async t => {
  const expected = {
    "products": [
      {
        "name": "Forge Laptop Sticker",
        "reviewers": [
          {
            "name": "Tolvan Tolvansson - Callum",
            "comment": "I think+this+sticker+is+ok",
            "rating": "3 Stars"
          },
          {
            "name": "Darth Vader",
            "comment": "Best ever!+I+always+use+on+the+walls+of+the+death+star",
            "rating": "5 Stars"
          },
          {
            "name": "Stormtrooper0032",
            "comment": "My boss+forced+me+to+put+5+stars",
            "rating": "5 Stars"
          },
        ]
      },
      {
        "name": "Solid Performance Polo",
        "reviewers": [
          {
            "name": "Frodo",
            "comment": "Cool enough+for+summer+warm+enough+for+winter",
            "rating": "4 Stars"
          },
          // {
          //   "name": "John Doe",
          //   "comment": "Very good stuff",
          //   "rating": "4 Stars"
          // },
        ]
      },
      {
        "name": "Ogio Caliber Polo",
        "reviewers": [
          {
            "name": "Dr Nykterstein",
            "comment": "i dont+like+it",
            "rating": "1 Star"
          },
          {
            "name": "Marko Polo",
            "comment": "Not what+I+was+looking+for",
            "rating": "2 Stars"
          },
        ]
      },
      {
        "name": "16 oz. Vortex Tumbler",
        "reviewers": [
          {
            "name": "Marko Polo",
            "comment": "Exactly what+I+was+looking+for!",
            "rating": "5 Stars"
          },
        ]
      },
      {
        "name": "Pebble Smart Watch",
        "reviewers": [
          {
            "name": "Earthman",
            "comment": "The watch+is+average+I+think",
            "rating": "3 Stars"
          },
        ]
      },
      {
        "name": "Oculus Rift",
        "reviewers": [
          {
            "name": "Luke Skywalker",
            "comment": "My goto+practice+gadget",
            "rating": "4 Stars"
          },
        ]
      },
      {
        "name": "Lytro Camera",
        "reviewers": {
        }
      }
    ]
  }

  const reviewSnapshot = SelectSnapshot("#app > .MuiContainer-root > .MuiBox-root:nth-child(2)").match([
    {
      name: "products",
      cssSelector: ".MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-4",
      contentAttrs: {
        name: node => node.querySelector("h6")?.textContent
      }
    },
    {
      name: "reviewers",
      cssSelector: ".MuiAccordionDetails-root > .MuiGrid-root > .MuiGrid-root > .MuiBox-root",
      contentAttrs: {
        name: node => node.querySelector("b")?.textContent,
        comment: node => node.querySelector("p:nth-child(2)")?.textContent,
        rating: node => node.querySelector(".MuiRating-root")?.getAttribute("aria-label")
      }
    }
  ], expected);

  await t.expect(reviewSnapshot).eql(true)
})
