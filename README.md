# Why does this exist?

For some strange reason, having an HTML table where the content is scrollable but the headers stay fixed is really hard. There are many solutions out there but they all seem to have nasty side-effects and/or compromises.

This is a CSS-only solution that combines Flexbox and `table-layout: fixed` to provide fixed headers and scrollable content.

## Features:

* Fixed headers
* scrollable table content
* dynamic height and width (can be set to fill the container)
* Dynamic content, like content loaded from AJAX, won't screw up the alignment (thanks to `table-layout: fixed`)
* Resizing the container works as expected because the widths are percentage-based
* fixed footer support (thanks to Flexbox)
* Layout is 100% CSS-based so no crazy polling or JS event handling
* user-resizable columns! (with the supplied jQuery plugin)

## Browser Compatibility:

Tested on newest versions of Chrome, Safari, and Firefox for Mac. I have no idea if this works in IE.

## Caveats:

Of course this solution isn't a silver bullet.  There are a few things to keep in mind:

* This solution is not appropriate for wide tables where horizontal scrolling is required because the combination of `table-layout: fixed` and percentage-based widths means that the columns will always fit inside their container.
* Requires some additional markup. You can't just add a class to an existing `<table>` and call it a day.
* The number of `<th>` tags must match the number of `<td>` tags or the alignment won't work.
* Columns will not resize based on the content (`table-layout: fixed`).
* If you set widths for your `<th>` tags you must set the same widths for your first row `<td>` tags because the header and body are actually in 2 different tables! (This doesn't apply to the jQuery plugin because it will automatically set the widths of the `<td>` tags.)

## The Markup

For this to work you have to wrap your tables in some extra markup. You'll notice that your header and your table body are split and are actually in different tables.

```
<div class="fixed-header-table">
    <div class="table-header">
        <!-- Your header <table> goes here -->
    </div>
    <div class="table-body">
        <!-- Your body <table goes here. This content will be scrollable -->
    </div>
    <div class="table-footer">
        <!-- This is an optional fixed footer.  You can use it for pagination or whatever. -->
    </div>
</div>
```

## TODO

1. Angular Directive
2. REACT Component
