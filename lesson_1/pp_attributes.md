# Practice Problems: Traversing and Accessing Attributes

1. Starting with the document node, use the lastChild and childNodes properties to change the text color to red on the On the River heading and set its font size 48 pixels.

    + `document.childNodes[1].lastChild.childNodes[1].style.color = "red";`
    + `document.childNodes[1].lastChild.childNodes[1].style.fontSize = "48px";`

    + Alternative solution:
      ```
        let html = document.childNodes[1]; // skip doctype
        let body = html.lastChild;         // skip head and text nodes
        let heading = body.childNodes[1];  // skip text node
        heading.style.color = 'red';
        heading.style.fontSize = '48px';
      ```

2. Count the paragraphs on the page, and then log the result.

    + ```js
        function walk(node, callback) {
          callback(node);

          for (let index = 0; index < node.childNodes.length; index += 1) {
            walk(node.childNodes[index], callback);
          }
        }

        let count = 0;
        walk(document, node => {
          if (node.nodeName === 'P') {
            count++;
          }
        });

        console.log(count);                              // 5
      ```

3. Retrieve the first word from each paragraph on the page and log the entire list.

    + ```js
      function walk(node, callback) {
        callback(node);

        for (let index = 0; index < node.childNodes.length; index += 1) {
           walk(node.childNodes[index], callback);
        }
      }

      let words = [];
      walk(document, node => {
        if (node.nodeName === 'P') {
          let text = node.firstChild.data.trim();
          let firstWord = text.split(' ')[0];
          words.push(firstWord);
        }
      });
      ```

4. Add the class `stanza` to each paragraph except the first.

  + ```js
      function walk(node, callback) {
        callback(node);

        for (let index = 0; index < node.childNodes.length; index += 1) {
           walk(node.childNodes[index], callback);
        }
      }

      let first = true;
      walk(document, node => {
        if (node.nodeName === 'P') {
          if (first) {
            first = false;
          } else {
            node.classList.add('stanza');
          }
        }
      });
    ```

5. Count the images on the page, then count the PNG images. Log both results.

    + solution 1:
       ```js

       function walk(node, callback) {
        callback(node);

        for (let index = 0; index < node.childNodes.length; index += 1) {
           walk(node.childNodes[index], callback);
        }
      }
        let images = [];
        walk(document, node => {
          if (node.nodeName === 'IMG') {
            images.push(node);
          }
        });

        console.log(images.length);                      // 48 total images

        let pngCount = images.filter(img => img.getAttribute('src').match(/png$/)).length;

        console.log(pngCount);                           // 23 images in png format
      ```

6. Change the link color to red for every link on the page.

    + ```js

      function walk(node, callback) {
        callback(node);

        for (let index = 0; index < node.childNodes.length; index += 1) {
           walk(node.childNodes[index], callback);
        }
      }

      walk(document, node => {
        if (node.nodeName === 'A') {
          node.style.color = "red";
        }
      });
      ```