# marionette-js
Don't like to write javascript? I hate it. With Marionette-js you control your webpage from the server.

It makes your site feel like a single page application while it still works on old browsers.
(On old browsers or those without javascript it will work as a regular website)

By adding a few attributes to your html you can control which parts of the site are updated.

## Features
- Replace specific parts of a page with a different content

## Planned features
- Work inside forms (present, but incomplete and untested)
- Replace in location (Currently 2 levels are required)
- CSS transitions (Adding a css class to the element before removal)
- Option to add/replace parts of the head
- TBD...

## Usage
Just add the library to your html pages, and it will initialize itself.
Currently, no minimized version is provided nor is the library available on any CDN at this time.

```html
<script type="application/javascript" src="src/marionette.js"></script>
```

Identify the parts of the page that you want to be replaceable and add `data-mjs-target="main"`.
(main in this example can be replaced by any name you wish)

Add your content inside this tag with this attribute as usual.

To provide a piece of content that needs to be placed in a target that is present add `data-mjs-content="main"`.
This attribute points to the target where you want it placed.
The target needs to be present, if it is missing your content will not be added to the page.
Your new content may contain new targets or remove any old ones. Target names need to be unique.

Only links and forms with the class `internal` get modified to work withing the 'single page application'.

## Version
### 0.1 Initial version
Replace parts of the page in place as if a single page application.
