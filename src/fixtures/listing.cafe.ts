import {fixture} from "testcafe";
import {SelectSnapshot} from "../dom-snapshot";

fixture("This is a test suite").beforeEach(async t => {
  await t.navigateTo("https://review-web-gabbar-dev.apps.devtest.vxdqgl7u.kubeapp.cloud");
})

test("should list all reviews", async t => {
  const expected = {
     "reviews": [
        {
           "banner": {
              "url": "https://review-web-gabbar-dev.apps.devtest.vxdqgl7u.kubeapp.cloud/3bba74379deaf954beb755de357da03e.j"
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
              "url": "https://review-web-gabbar-dev.apps.devtest.vxdqgl7u.kubeapp.cloud/768473f4c2d067b7a046cbcee562ce41.j"
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
              "url": "https://review-web-gabbar-dev.apps.devtest.vxdqgl7u.kubeapp.cloud/d1256eed062389d6ea00c737a4d1475b.j"
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
              "url": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxEREBUTEhIWFhUTGBYWFRISEhUVFRISFxcWFhcRF"
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
              "url": "https://review-web-gabbar-dev.apps.devtest.vxdqgl7u.kubeapp.cloud/a7b6cc5cede091baeddca7bd4f48bd03.j"
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
              "url": "https://review-web-gabbar-dev.apps.devtest.vxdqgl7u.kubeapp.cloud/ecce27d320faedbc57f033ef5825cf47.j"
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
              "url": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgS"
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

  const reviewSnapshot = SelectSnapshot("div.MuiBox-root.jss3").match([{
    name: "reviews",
    cssSelector: ".MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-4"
  }, {
    name: "banner",
    cssSelector: "img",
    contentAttrs: {
      url: (img: HTMLImageElement) => img.src?.substring(0, 100)
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
