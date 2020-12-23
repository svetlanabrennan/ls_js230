Questions for this page: https://d3905n0khyu9wc.cloudfront.net/the_dom/polar_bear_wiki.html

1. Write some JavaScript code to retrieve a word count for each h2 heading on the page.

  ```js
    let h2s = document.querySelectorAll('h2');
    let h2Array = Array.prototype.slice.call(h2s);
    h2Array.map(element => element.textContent.split(' ').length);
    // [1, 3, 3, 3, 1, 2, 4, 1, 5, 2, 2, 1, 1, 2, 2, 2]
  ```

2. The page has a table of contents with the title "Contents" and links to the different content sections on "Naming and etymology," "Taxonomy and evolution," etc.

  + Use three different DOM methods to retrieve a reference to the div element that contains the table of contents.

  + 
    ```js
      document.getElementById('toc');
      document.querySelector('#toc');
      document.querySelectorAll('.toc')[0];
    ```

3. Write some JavaScript code to change the color for every odd indexed link in the table of contents to green.

    + 
      ```js
      let links = Array.prototype.slice.call(document.querySelectorAll(".toc a"));

      links.forEach((link, idx) => {
        if (idx % 2 !== 0) {
          link.style.color = "green";
        }
      });
      ```

4. Write some JavaScript code to retrieve the text of every thumbnail caption on the page.

    ```js
    let captions = [];
    let array = Array.prototype.slice.call(document.querySelectorAll(".thumbcaption"));

    array.forEach(caption => captions.push(caption.textContent.trim()));
    ```

5. 

  ```js
  let keys = ['Kingdom', 'Phylum', 'Clade', 'Class', 'Order', 'Suborder', 'Family',
            'Genus', 'Species'];
  
  let classification = {}

  let tds = document.querySelectorAll('.infobox td');
  let cell;
  let link;

  for (index = 0; index < tds.length; index += 1) {
  cell = tds[index];

  keys.forEach(key => {
    if (cell.textContent.indexOf(key) !== -1) {
      link = cell.nextElementSibling.firstElementChild;
      classification[key] = link.textContent;
    }
  });
}

  ```