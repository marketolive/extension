/**************************************************************************************
 *
 *  For whatever reason, Chrome does not allow the opening of links from inside
 *  popup.html. The workaround for this is contained below. We select all of the
 *  <a> tags, and then add a click listener that calls window.open() on the <a>
 *  tag's target URL. Jquery is also not allowed by Chrome in this context.
 *
 *  @Author Andy
 *
 *  @function
 *
 **************************************************************************************/
window.onload = function () {
   tags = document.getElementsByClassName("link");
   // getElementsByClassName() returns an array, so the click
   // listener needs to be added to each one individually.
   for (var ii = 0; ii < tags.length; ++ii) {
       tags[ii].onclick = function () {
           chrome.tabs.create({ url: this.href, selected : true });
           //window.open(this.href);
       }
   }
}